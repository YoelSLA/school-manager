package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.EscuelaObligatoriaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.FechaIngresoInvalidaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.LicenciaSuperpuestaException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;

class EmpleadoEducativoTest {

	private Escuela escuela;
	private EmpleadoEducativo empleado;

	@BeforeEach
	void setUp() {
		escuela = mock(Escuela.class);

		empleado = new EmpleadoEducativo(
				escuela,
				"20-12345678-9",
				"Juan",
				"Pérez",
				"Calle Falsa 123",
				"123456",
				LocalDate.of(1990, 1, 1),
				LocalDate.of(2010, 1, 1),
				"juan@mail.com"
		);
	}

	/* =========================
	   CREACIÓN
	   ========================= */

	@Test
	void creaEmpleadoValido() {
		assertThat(empleado).isNotNull();
		assertThat(empleado.getEscuela()).isSameAs(escuela);
	}

	@Test
	void fallaSiEscuelaEsNull() {
		assertThatThrownBy(() ->
				new EmpleadoEducativo(
						null,
						"20",
						"Juan",
						"Pérez",
						null,
						null,
						LocalDate.of(1990, 1, 1),
						LocalDate.of(2010, 1, 1),
						"a@a.com"
				)
		).isInstanceOf(EscuelaObligatoriaException.class);
	}

	@Test
	void fallaSiFechaIngresoEsAnteriorANacimiento() {
		assertThatThrownBy(() ->
				new EmpleadoEducativo(
						escuela,
						"20",
						"Juan",
						"Pérez",
						null,
						null,
						LocalDate.of(2010, 1, 1),
						LocalDate.of(2000, 1, 1),
						"a@a.com"
				)
		).isInstanceOf(FechaIngresoInvalidaException.class);
	}

	/* =========================
	   LICENCIAS
	   ========================= */

	@Test
	void creaLicenciaValida() {
		Licencia licencia = empleado.crearLicencia(
				TipoLicencia.L_A1,
				LocalDate.of(2026, 1, 10),
				LocalDate.of(2026, 1, 20),
				"Médica"
		);

		assertThat(licencia).isNotNull();
		assertThat(empleado.getLicencias()).contains(licencia);
	}

	@Test
	void noPermiteLicenciaSuperpuesta() {
		empleado.crearLicencia(
				TipoLicencia.L_A1,
				LocalDate.of(2026, 1, 10),
				LocalDate.of(2026, 1, 20),
				null
		);

		assertThatThrownBy(() ->
				empleado.crearLicencia(
						TipoLicencia.L_A2,
						LocalDate.of(2026, 1, 15),
						LocalDate.of(2026, 1, 25),
						null
				)
		).isInstanceOf(LicenciaSuperpuestaException.class);
	}

	@Test
	void estaEnLicenciaEnFechaDentroDelRango() {
		empleado.crearLicencia(
				TipoLicencia.L_A1,
				LocalDate.of(2026, 1, 10),
				LocalDate.of(2026, 1, 20),
				null
		);

		assertThat(empleado.estaEnLicenciaEn(LocalDate.of(2026, 1, 15))).isTrue();
	}

	@Test
	void noEstaEnLicenciaFueraDelRango() {
		empleado.crearLicencia(
				TipoLicencia.L_A1,
				LocalDate.of(2026, 1, 10),
				LocalDate.of(2026, 1, 20),
				null
		);

		assertThat(empleado.estaEnLicenciaEn(LocalDate.of(2026, 1, 25))).isFalse();
	}

	@Test
	void fechaNullNoEstaEnLicencia() {
		assertThat(empleado.estaEnLicenciaEn(null)).isFalse();
	}

	/* =========================
   ASIGNACIONES
   ========================= */

	@Test
	void agregaAsignacionAlEmpleado() {
		Asignacion asignacion = mock(Asignacion.class);

		empleado.agregarAsignacion(asignacion);

		assertThat(empleado.getAsignaciones()).contains(asignacion);
	}

	@Test
	void noPermiteAgregarAsignacionNull() {
		assertThatThrownBy(() ->
				empleado.agregarAsignacion(null)
		).isInstanceOf(IllegalArgumentException.class);
	}
}
