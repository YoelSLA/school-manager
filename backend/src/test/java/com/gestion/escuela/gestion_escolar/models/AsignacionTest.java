package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.exceptions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;

@ExtendWith(MockitoExtension.class)
class AsignacionTest {

	private final LocalDate fechaToma = LocalDate.of(2026, 1, 1);
	private final LocalDate fechaCese = LocalDate.of(2026, 1, 31);
	private Designacion designacion;
	private EmpleadoEducativo empleado;

	@BeforeEach
	void setUp() {
		designacion = mock(Designacion.class);
		empleado = mock(EmpleadoEducativo.class);
	}

	/* =========================
	   CREACIÓN
	   ========================= */

	@Test
	void creaAsignacionValida() {
		Asignacion asignacion = crearAsignacion();

		assertThat(asignacion).isNotNull();
		assertThat(asignacion.getDesignacion()).isSameAs(designacion);
		assertThat(asignacion.getEmpleadoEducativo()).isSameAs(empleado);
		assertThat(asignacion.getSituacionDeRevista()).isEqualTo(SituacionDeRevista.TITULAR);
	}

	@Test
	void fallaSiDesignacionEsNull() {
		assertThatThrownBy(() ->
				new Asignacion(
						null,
						empleado,
						fechaToma,
						fechaCese,
						SituacionDeRevista.TITULAR
				) {
				}
		).isInstanceOf(DesignacionObligatoriaException.class);
	}

	@Test
	void fallaSiEmpleadoEsNull() {
		assertThatThrownBy(() ->
				new Asignacion(
						designacion,
						null,
						fechaToma,
						fechaCese,
						SituacionDeRevista.TITULAR
				) {
				}
		).isInstanceOf(EmpleadoEducativoObligatorioException.class);
	}

	@Test
	void fallaSiSituacionEsNull() {
		assertThatThrownBy(() ->
				new Asignacion(
						designacion,
						empleado,
						fechaToma,
						fechaCese,
						null
				) {
				}
		).isInstanceOf(SituacionDeRevistaObligatoriaException.class);
	}

	@Test
	void fallaSiFechasSonNull() {
		assertThatThrownBy(() ->
				new Asignacion(
						designacion,
						empleado,
						null,
						fechaCese,
						SituacionDeRevista.TITULAR
				) {
				}
		).isInstanceOf(FechasAsignacionObligatoriasException.class);
	}

	@Test
	void fallaSiPeriodoEsInvalido() {
		assertThatThrownBy(() ->
				new Asignacion(
						designacion,
						empleado,
						fechaCese,
						fechaToma,
						SituacionDeRevista.TITULAR
				) {
				}
		).isInstanceOf(PeriodoAsignacionInvalidoException.class);
	}

	/* =========================
	   DISPONIBILIDAD
	   ========================= */

	@Test
	void estaDisponibleEnFechaIntermedia() {
		Asignacion asignacion = crearAsignacion();

		assertThat(asignacion.estaDisponibleEn(LocalDate.of(2026, 1, 15)))
				.isTrue();
	}

	@Test
	void noEstaDisponibleAntesDeLaToma() {
		Asignacion asignacion = crearAsignacion();

		assertThat(asignacion.estaDisponibleEn(LocalDate.of(2025, 12, 31)))
				.isFalse();
	}

	@Test
	void noEstaDisponibleDespuesDelCese() {
		Asignacion asignacion = crearAsignacion();

		assertThat(asignacion.estaDisponibleEn(LocalDate.of(2026, 2, 1)))
				.isFalse();
	}

	@Test
	void noEstaDisponibleSiFechaEsNull() {
		Asignacion asignacion = crearAsignacion();

		assertThat(asignacion.estaDisponibleEn(null))
				.isFalse();
	}

	@Test
	void noEstaDisponibleSiFueDadaDeBaja() {
		Asignacion asignacion = crearAsignacion();

		asignacion.registrarBaja(CausaBaja.RENUNCIA);

		assertThat(asignacion.estaDisponibleEn(LocalDate.of(2026, 1, 15)))
				.isFalse();
	}

	/* =========================
	   BAJA
	   ========================= */

	@Test
	void registraBajaCorrectamente() {
		Asignacion asignacion = crearAsignacion();

		asignacion.registrarBaja(CausaBaja.RENUNCIA);

		assertThat(asignacion.getBajaAsignacion()).isNotNull();
	}

	@Test
	void noPermiteRegistrarBajaDosVeces() {
		Asignacion asignacion = crearAsignacion();
		asignacion.registrarBaja(CausaBaja.RENUNCIA);

		assertThatThrownBy(() ->
				asignacion.registrarBaja(CausaBaja.JUBILACION)
		).isInstanceOf(IllegalStateException.class);
	}

	@Test
	void noPermiteRegistrarBajaSinCausa() {
		Asignacion asignacion = crearAsignacion();

		assertThatThrownBy(() ->
				asignacion.registrarBaja(null)
		).isInstanceOf(IllegalArgumentException.class);
	}

	/* =========================
	   Helper
	   ========================= */

	private Asignacion crearAsignacion() {
		return new Asignacion(
				designacion,
				empleado,
				fechaToma,
				fechaCese,
				SituacionDeRevista.TITULAR
		) {
		};
	}
}
