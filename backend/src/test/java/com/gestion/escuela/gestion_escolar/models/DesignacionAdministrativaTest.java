package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

class DesignacionAdministrativaTest {

	private final LocalDate fecha = LocalDate.of(2026, 1, 15);
	private Escuela escuela;
	private DesignacionAdministrativa designacion;

	@BeforeEach
	void setUp() {
		escuela = mock(Escuela.class);
		designacion = new DesignacionAdministrativa(
				escuela,
				1234,
				RolEducativo.SECRETARIA
		);
	}

	/* =========================
	   CREACIÓN
	   ========================= */

	@Test
	void creaDesignacionValida() {
		assertThat(designacion).isNotNull();
		assertThat(designacion.getEscuela()).isSameAs(escuela);
		assertThat(designacion.getCupof()).isEqualTo(1234);
		assertThat(designacion.getRolEducativo()).isEqualTo(RolEducativo.SECRETARIA);
	}

	@Test
	void fallaSiEscuelaEsNull() {
		assertThatThrownBy(() ->
				new DesignacionAdministrativa(
						null,
						1234,
						RolEducativo.SECRETARIA
				)
		).isInstanceOf(IllegalArgumentException.class);
	}

	@Test
	void fallaSiCupofEsNull() {
		assertThatThrownBy(() ->
				new DesignacionAdministrativa(
						escuela,
						null,
						RolEducativo.SECRETARIA
				)
		).isInstanceOf(IllegalArgumentException.class);
	}

	/* =========================
	   AGREGAR ASIGNACIÓN
	   ========================= */

	@Test
	void agregaAsignacionValida() {
		Asignacion asignacion = mock(Asignacion.class);

		designacion.agregarAsignacion(asignacion);

		assertThat(designacion.getAsignaciones())
				.contains(asignacion);

		verify(asignacion).setDesignacion(designacion);
	}

	@Test
	void fallaSiAsignacionEsNull() {
		assertThatThrownBy(() ->
				designacion.agregarAsignacion(null)
		).isInstanceOf(IllegalArgumentException.class);
	}

	/* =========================
	   ASIGNACIÓN QUE EJERCE
	   ========================= */

	@Test
	void asignacionQueEjerceEnFechaNullDevuelveEmpty() {
		Optional<Asignacion> resultado =
				designacion.asignacionQueEjerceEn(null);

		assertThat(resultado).isEmpty();
	}

	@Test
	void sinAsignacionesDevuelveEmpty() {
		assertThat(designacion.asignacionQueEjerceEn(fecha))
				.isEmpty();
	}

	@Test
	void asignacionNoDisponibleNoEjerce() {
		Asignacion asignacion = mock(Asignacion.class);

		when(asignacion.estaDisponibleEn(fecha)).thenReturn(false);

		designacion.agregarAsignacion(asignacion);

		assertThat(designacion.asignacionQueEjerceEn(fecha))
				.isEmpty();
	}

	@Test
	void asignacionDisponiblePeroEmpleadoEnLicenciaNoEjerce() {
		Asignacion asignacion = mock(Asignacion.class);
		EmpleadoEducativo empleado = mock(EmpleadoEducativo.class);

		when(asignacion.estaDisponibleEn(fecha)).thenReturn(true);
		when(asignacion.getEmpleadoEducativo()).thenReturn(empleado);
		when(empleado.estaEnLicenciaEn(fecha)).thenReturn(true);

		designacion.agregarAsignacion(asignacion);

		assertThat(designacion.asignacionQueEjerceEn(fecha))
				.isEmpty();
	}

	@Test
	void unaAsignacionDisponibleYSinLicenciaEjerce() {
		Asignacion asignacion = mock(Asignacion.class);
		EmpleadoEducativo empleado = mock(EmpleadoEducativo.class);

		when(asignacion.estaDisponibleEn(fecha)).thenReturn(true);
		when(asignacion.getEmpleadoEducativo()).thenReturn(empleado);
		when(empleado.estaEnLicenciaEn(fecha)).thenReturn(false);

		designacion.agregarAsignacion(asignacion);

		Optional<Asignacion> resultado =
				designacion.asignacionQueEjerceEn(fecha);

		assertThat(resultado).contains(asignacion);
	}

	@Test
	void masDeUnaAsignacionValidaLanzaExcepcion() {
		Asignacion a1 = mock(Asignacion.class);
		Asignacion a2 = mock(Asignacion.class);

		EmpleadoEducativo e1 = mock(EmpleadoEducativo.class);
		EmpleadoEducativo e2 = mock(EmpleadoEducativo.class);

		when(a1.estaDisponibleEn(fecha)).thenReturn(true);
		when(a2.estaDisponibleEn(fecha)).thenReturn(true);

		when(a1.getEmpleadoEducativo()).thenReturn(e1);
		when(a2.getEmpleadoEducativo()).thenReturn(e2);

		when(e1.estaEnLicenciaEn(fecha)).thenReturn(false);
		when(e2.estaEnLicenciaEn(fecha)).thenReturn(false);

		designacion.agregarAsignacion(a1);
		designacion.agregarAsignacion(a2);

		assertThatThrownBy(() ->
				designacion.asignacionQueEjerceEn(fecha)
		).isInstanceOf(IllegalStateException.class)
				.hasMessageContaining("Más de una asignación ejerciendo");
	}

	/* =========================
	   CUBIERTA / PENDIENTE
	   ========================= */

	@Test
	void estaCubiertaCuandoHayAsignacionQueEjerce() {
		Asignacion asignacion = mock(Asignacion.class);
		EmpleadoEducativo empleado = mock(EmpleadoEducativo.class);

		when(asignacion.estaDisponibleEn(fecha)).thenReturn(true);
		when(asignacion.getEmpleadoEducativo()).thenReturn(empleado);
		when(empleado.estaEnLicenciaEn(fecha)).thenReturn(false);

		designacion.agregarAsignacion(asignacion);

		assertThat(designacion.estaCubiertaEn(fecha)).isTrue();
		assertThat(designacion.estaPendienteEn(fecha)).isFalse();
	}

	@Test
	void estaPendienteCuandoNoHayAsignacionQueEjerce() {
		assertThat(designacion.estaCubiertaEn(fecha)).isFalse();
		assertThat(designacion.estaPendienteEn(fecha)).isTrue();
	}

	@Test
	void cuandoEmpleadoTieneAsignacionYEstaEnLicencia_laDesignacionQuedaPendiente() {
		// fecha a evaluar
		LocalDate fecha = LocalDate.of(2026, 1, 15);

		// empleado real (SUT indirecto)
		EmpleadoEducativo empleado = mock(EmpleadoEducativo.class);

		// asignación mock
		Asignacion asignacion = mock(Asignacion.class);

		// comportamiento de la asignación
		when(asignacion.estaDisponibleEn(fecha)).thenReturn(true);
		when(asignacion.getEmpleadoEducativo()).thenReturn(empleado);

		// el empleado está en licencia
		when(empleado.estaEnLicenciaEn(fecha)).thenReturn(true);

		// agregamos la asignación a la designación
		designacion.agregarAsignacion(asignacion);

		// ASSERT: la designación queda pendiente
		assertThat(designacion.estaPendienteEn(fecha)).isTrue();

		// y no está cubierta
		assertThat(designacion.estaCubiertaEn(fecha)).isFalse();
	}
}
