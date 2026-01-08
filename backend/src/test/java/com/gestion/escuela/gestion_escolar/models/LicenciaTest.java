package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmpleadoEducativoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.FechasLicenciaObligatoriasException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasLicenciaInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.TipoLicenciaObligatorioException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;

class LicenciaTest {

	private final LocalDate desde = LocalDate.of(2026, 1, 10);
	private final LocalDate hasta = LocalDate.of(2026, 1, 20);
	private EmpleadoEducativo empleado;

	@BeforeEach
	void setUp() {
		empleado = mock(EmpleadoEducativo.class);
	}

	/* =========================
	   CREACIÓN
	   ========================= */

	@Test
	void creaLicenciaValida() {
		Licencia licencia = new Licencia(
				empleado,
				TipoLicencia.L_A1,
				desde,
				hasta,
				"Licencia médica"
		);

		assertThat(licencia).isNotNull();
		assertThat(licencia.getEmpleado()).isSameAs(empleado);
		assertThat(licencia.getTipoLicencia()).isEqualTo(TipoLicencia.L_A1);
		assertThat(licencia.getFechaDesde()).isEqualTo(desde);
		assertThat(licencia.getFechaHasta()).isEqualTo(hasta);
	}

	@Test
	void fallaSiEmpleadoEsNull() {
		assertThatThrownBy(() ->
				new Licencia(
						null,
						TipoLicencia.L_A1,
						desde,
						hasta,
						null
				)
		).isInstanceOf(EmpleadoEducativoObligatorioException.class);
	}

	@Test
	void fallaSiTipoLicenciaEsNull() {
		assertThatThrownBy(() ->
				new Licencia(
						empleado,
						null,
						desde,
						hasta,
						null
				)
		).isInstanceOf(TipoLicenciaObligatorioException.class);
	}

	@Test
	void fallaSiFechasSonNull() {
		assertThatThrownBy(() ->
				new Licencia(
						empleado,
						TipoLicencia.L_A1,
						null,
						hasta,
						null
				)
		).isInstanceOf(FechasLicenciaObligatoriasException.class);
	}

	@Test
	void fallaSiRangoDeFechasEsInvalido() {
		assertThatThrownBy(() ->
				new Licencia(
						empleado,
						TipoLicencia.L_A1,
						hasta,
						desde,
						null
				)
		).isInstanceOf(RangoFechasLicenciaInvalidoException.class);
	}

	/* =========================
	   APLICA EN FECHA
	   ========================= */

	@Test
	void aplicaEnFechaIntermedia() {
		Licencia licencia = crearLicencia();

		assertThat(licencia.aplicaEn(LocalDate.of(2026, 1, 15)))
				.isTrue();
	}

	@Test
	void aplicaEnFechaDesde() {
		Licencia licencia = crearLicencia();

		assertThat(licencia.aplicaEn(desde))
				.isTrue();
	}

	@Test
	void aplicaEnFechaHasta() {
		Licencia licencia = crearLicencia();

		assertThat(licencia.aplicaEn(hasta))
				.isTrue();
	}

	@Test
	void noAplicaAntesDeDesde() {
		Licencia licencia = crearLicencia();

		assertThat(licencia.aplicaEn(LocalDate.of(2026, 1, 9)))
				.isFalse();
	}

	@Test
	void noAplicaDespuesDeHasta() {
		Licencia licencia = crearLicencia();

		assertThat(licencia.aplicaEn(LocalDate.of(2026, 1, 21)))
				.isFalse();
	}

	/* =========================
	   DÍAS
	   ========================= */

	@Test
	void calculaDiasCorridosIncluyendoExtremos() {
		Licencia licencia = crearLicencia();

		assertThat(licencia.dias())
				.isEqualTo(11); // del 10 al 20 inclusive
	}

	/* =========================
	   SUPERPOSICIÓN
	   ========================= */

	@Test
	void seSuperponeTotalmente() {
		Licencia licencia = crearLicencia();

		assertThat(
				licencia.seSuperponeCon(
						LocalDate.of(2026, 1, 10),
						LocalDate.of(2026, 1, 20)
				)
		).isTrue();
	}

	@Test
	void seSuperponeParcialmente() {
		Licencia licencia = crearLicencia();

		assertThat(
				licencia.seSuperponeCon(
						LocalDate.of(2026, 1, 15),
						LocalDate.of(2026, 1, 25)
				)
		).isTrue();
	}

	@Test
	void seSuperponeEnUnExtremo() {
		Licencia licencia = crearLicencia();

		assertThat(
				licencia.seSuperponeCon(
						LocalDate.of(2026, 1, 20),
						LocalDate.of(2026, 1, 30)
				)
		).isTrue();
	}

	@Test
	void noSeSuperponeSiEsAnterior() {
		Licencia licencia = crearLicencia();

		assertThat(
				licencia.seSuperponeCon(
						LocalDate.of(2026, 1, 1),
						LocalDate.of(2026, 1, 9)
				)
		).isFalse();
	}

	@Test
	void noSeSuperponeSiEsPosterior() {
		Licencia licencia = crearLicencia();

		assertThat(
				licencia.seSuperponeCon(
						LocalDate.of(2026, 1, 21),
						LocalDate.of(2026, 1, 30)
				)
		).isFalse();
	}

	/* =========================
	   Helper
	   ========================= */

	private Licencia crearLicencia() {
		return new Licencia(
				empleado,
				TipoLicencia.L_A1,
				desde,
				hasta,
				"Licencia médica"
		);
	}
}
