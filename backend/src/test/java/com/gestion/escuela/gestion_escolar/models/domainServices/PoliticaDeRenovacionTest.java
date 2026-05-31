package com.gestion.escuela.gestion_escolar.models.domainServices;

import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.ReglaCicloLectivoException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class PoliticaDeRenovacionTest {

	@Nested
	@DisplayName("validarRenovarProvisionalManual")
	class ValidarRenovarProvisionalManualTest {

		@Test
		@DisplayName("debe lanzar excepción si la asignación anterior es null")
		void debeLanzarExcepcionSiAsignacionAnteriorEsNull() {

			Periodo nuevoPeriodo = mock(Periodo.class);

			assertThatThrownBy(() ->
					PoliticaDeRenovacion.validarRenovarProvisionalManual(null, nuevoPeriodo)
			)
					.isInstanceOf(CampoObligatorioException.class)
					.hasMessageContaining("asignación anterior");
		}

		@Test
		@DisplayName("debe lanzar excepción si el período es null")
		void debeLanzarExcepcionSiPeriodoEsNull() {

			AsignacionProvisional asignacion = mock(AsignacionProvisional.class);

			assertThatThrownBy(() ->
					PoliticaDeRenovacion.validarRenovarProvisionalManual(asignacion, null)
			)
					.isInstanceOf(CampoObligatorioException.class)
					.hasMessageContaining("periodo");
		}

		@Test
		@DisplayName("debe lanzar excepción si el nuevo período comienza antes del día permitido")
		void debeLanzarExcepcionSiNuevoPeriodoComienzaAntesDelDiaPermitido() {

			AsignacionProvisional anterior = mock(AsignacionProvisional.class);

			Periodo periodoAnterior = mock(Periodo.class);
			when(anterior.getPeriodo()).thenReturn(periodoAnterior);

			when(periodoAnterior.getFechaHasta())
					.thenReturn(LocalDate.of(2025, 2, 28));

			Periodo nuevoPeriodo = mock(Periodo.class);

			when(nuevoPeriodo.getFechaDesde())
					.thenReturn(LocalDate.of(2025, 2, 28));

			assertThatThrownBy(() ->
					PoliticaDeRenovacion.validarRenovarProvisionalManual(anterior, nuevoPeriodo)
			)
					.isInstanceOf(RangoFechasInvalidoException.class);
		}

		@Test
		@DisplayName("debe validar correctamente una renovación manual válida")
		void debeValidarCorrectamenteUnaRenovacionManualValida() {

			AsignacionProvisional anterior = mock(AsignacionProvisional.class);

			Periodo periodoAnterior = mock(Periodo.class);
			when(anterior.getPeriodo()).thenReturn(periodoAnterior);

			when(periodoAnterior.getFechaHasta())
					.thenReturn(LocalDate.of(2024, 2, 29));

			Periodo nuevoPeriodo = mock(Periodo.class);

			when(nuevoPeriodo.getFechaDesde())
					.thenReturn(LocalDate.of(2025, 3, 1));

			when(nuevoPeriodo.getFechaHasta())
					.thenReturn(LocalDate.of(2025, 12, 31));

			assertThatCode(() ->
					PoliticaDeRenovacion.validarRenovarProvisionalManual(anterior, nuevoPeriodo)
			)
					.doesNotThrowAnyException();
		}
	}

	@Nested
	@DisplayName("validarRenovarProvisionalDesdeMarzo")
	class ValidarRenovarProvisionalDesdeMarzoTest {

		@Test
		@DisplayName("debe lanzar excepción si la asignación es null")
		void debeLanzarExcepcionSiAsignacionEsNull() {

			assertThatThrownBy(() ->
					PoliticaDeRenovacion.validarRenovarProvisionalDesdeMarzo(
							null,
							LocalDate.of(2025, 12, 31)
					)
			)
					.isInstanceOf(CampoObligatorioException.class)
					.hasMessageContaining("asignación anterior");
		}

		@Test
		@DisplayName("debe lanzar excepción si la fecha hasta es null")
		void debeLanzarExcepcionSiFechaHastaEsNull() {

			Asignacion asignacion = mock(Asignacion.class);

			assertThatThrownBy(() ->
					PoliticaDeRenovacion.validarRenovarProvisionalDesdeMarzo(
							asignacion,
							null
					)
			)
					.isInstanceOf(CampoObligatorioException.class)
					.hasMessageContaining("fecha hasta");
		}

		@Test
		@DisplayName("no debe lanzar excepción con parámetros válidos")
		void noDebeLanzarExcepcionConParametrosValidos() {

			Asignacion asignacion = mock(Asignacion.class);

			assertThatCode(() ->
					PoliticaDeRenovacion.validarRenovarProvisionalDesdeMarzo(
							asignacion,
							LocalDate.of(2025, 12, 31)
					)
			)
					.doesNotThrowAnyException();
		}
	}

	@Nested
	@DisplayName("validarReglaCicloLectivo")
	class ValidarReglaCicloLectivoTest {

		@Test
		@DisplayName("debe lanzar excepción si el período es null")
		void debeLanzarExcepcionSiPeriodoEsNull() {

			assertThatThrownBy(() -> PoliticaDeRenovacion.validarReglaCicloLectivo(null))
					.isInstanceOf(CampoObligatorioException.class)
					.hasMessageContaining("periodo");
		}

		@Test
		@DisplayName("debe lanzar excepción si la fecha desde es null")
		void debeLanzarExcepcionSiFechaDesdeEsNull() {

			Periodo periodo = mock(Periodo.class);

			when(periodo.getFechaDesde()).thenReturn(null);
			when(periodo.getFechaHasta()).thenReturn(LocalDate.of(2025, 12, 31));

			assertThatThrownBy(() -> PoliticaDeRenovacion.validarReglaCicloLectivo(periodo))
					.isInstanceOf(CampoObligatorioException.class)
					.hasMessageContaining("fecha desde");
		}

		@Test
		@DisplayName("debe lanzar excepción si la fecha hasta es null")
		void debeLanzarExcepcionSiFechaHastaEsNull() {

			Periodo periodo = mock(Periodo.class);

			when(periodo.getFechaDesde()).thenReturn(LocalDate.of(2025, 3, 1));
			when(periodo.getFechaHasta()).thenReturn(null);

			assertThatThrownBy(() ->
					PoliticaDeRenovacion.validarReglaCicloLectivo(periodo)
			)
					.isInstanceOf(CampoObligatorioException.class)
					.hasMessageContaining("fecha hasta");
		}

		@Test
		@DisplayName("debe lanzar excepción si no inicia el 1 de marzo")
		void debeLanzarExcepcionSiNoIniciaElPrimeroDeMarzo() {

			Periodo periodo = mock(Periodo.class);

			when(periodo.getFechaDesde())
					.thenReturn(LocalDate.of(2025, 3, 2));

			when(periodo.getFechaHasta())
					.thenReturn(LocalDate.of(2025, 12, 31));

			assertThatThrownBy(() ->
					PoliticaDeRenovacion.validarReglaCicloLectivo(periodo)
			)
					.isInstanceOf(ReglaCicloLectivoException.class)
					.hasMessageContaining("1 de marzo");
		}

		@Test
		@DisplayName("debe lanzar excepción si la fecha hasta no es anterior al 1 de marzo del año siguiente")
		void debeLanzarExcepcionSiFechaHastaNoEsAnteriorAlPrimeroDeMarzoSiguiente() {

			Periodo periodo = mock(Periodo.class);

			when(periodo.getFechaDesde())
					.thenReturn(LocalDate.of(2025, 3, 1));

			when(periodo.getFechaHasta())
					.thenReturn(LocalDate.of(2026, 3, 1));

			assertThatThrownBy(() ->
					PoliticaDeRenovacion.validarReglaCicloLectivo(periodo)
			)
					.isInstanceOf(ReglaCicloLectivoException.class)
					.hasMessageContaining("fecha fin");
		}

		@Test
		@DisplayName("debe validar correctamente un período válido")
		void debeValidarCorrectamentePeriodoValido() {

			Periodo periodo = mock(Periodo.class);

			when(periodo.getFechaDesde())
					.thenReturn(LocalDate.of(2025, 3, 1));

			when(periodo.getFechaHasta())
					.thenReturn(LocalDate.of(2025, 12, 31));

			assertThatCode(() ->
					PoliticaDeRenovacion.validarReglaCicloLectivo(periodo)
			)
					.doesNotThrowAnyException();
		}
	}
}