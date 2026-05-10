package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.periodo.PeriodoAbiertoException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static java.time.Month.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("Tests de Periodo")
class PeriodoTest {

	private Periodo cerrado(LocalDate desde, LocalDate hasta) {
		return new Periodo(desde, hasta);
	}

	private Periodo abierto(LocalDate desde) {
		return new Periodo(desde, null);
	}

	@Nested
	@DisplayName("Creación de período")
	class Creacion {

		@Test
		@DisplayName("Se crea un período cerrado con fechas válidas.")
		void creaPeriodoCerrado() {
			// Arrange
			LocalDate fechaDesde = LocalDate.of(2025, MARCH, 1);
			LocalDate fechaHasta = LocalDate.of(2025, MARCH, 31);
			Periodo periodoCerrado = cerrado(fechaDesde, fechaHasta);

			// Act + Assert
			assertThat(periodoCerrado)
					.extracting(Periodo::getFechaDesde, Periodo::getFechaHasta)
					.containsExactly(fechaDesde, fechaHasta);
		}

		@Test
		@DisplayName("Se crea un período abierto sin fecha de fin.")
		void creaPeriodoAbierto() {
			// Arrange
			LocalDate fechaDesde = LocalDate.of(2025, MARCH, 1);
			Periodo periodoAbierto = abierto(fechaDesde);

			// Act + Assert
			assertThat(periodoAbierto.getFechaDesde()).isEqualTo(fechaDesde);
			assertThat(periodoAbierto.getFechaHasta()).isNull();
		}

		@Test
		@DisplayName("No se puede crear un período sin fecha de inicio.")
		void fallaSiFechaDesdeEsNull() {

			// Act + Assert
			assertThatThrownBy(() -> cerrado(null, LocalDate.of(2025, MARCH, 10)))
					.isInstanceOf(CampoObligatorioException.class)
					.hasMessageContaining("fechaDesde");
		}

		@Test
		@DisplayName("No se puede crear un período con fechas inválidas.")
		void fallaSiRangoInvalido() {
			LocalDate desde = LocalDate.of(2025, APRIL, 1);
			LocalDate hasta = LocalDate.of(2025, MARCH, 1);

			assertThatThrownBy(() -> cerrado(desde, hasta))
					.isInstanceOf(RangoFechasInvalidoException.class)
					.hasMessageContaining("fechaDesde")
					.hasMessageContaining("fechaHasta");
		}
	}

	@Nested
	@DisplayName("Estado del período")
	class Estado {

		@Test
		@DisplayName("El período es cerrado cuando tiene fecha de fin")
		void periodoCerrado() {
			// Arrange
			Periodo periodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 1),
					LocalDate.of(2025, MARCH, 3)
			);

			// Act + Assert
			assertThat(periodoCerrado.esCerrado()).isTrue();
			assertThat(periodoCerrado.esAbierto()).isFalse();
		}

		@Test
		@DisplayName("El período es abierto cuando no tiene fecha de fin")
		void periodoAbierto() {
			// Arrange
			Periodo periodoAbierto = abierto(LocalDate.of(2025, MARCH, 1));

			// Act + Assert
			assertThat(periodoAbierto.esAbierto()).isTrue();
			assertThat(periodoAbierto.esCerrado()).isFalse();
		}
	}

	@Nested
	@DisplayName("Vigencia del período")
	class EstaVigenteEn {

		@Test
		@DisplayName("La fecha está vigente dentro del período cerrado.")
		void fechaVigenteDentroDelPeriodo() {
			// Arrange
			Periodo periodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 1),
					LocalDate.of(2025, MARCH, 10));
			LocalDate fechaVigente = LocalDate.of(2025, MARCH, 5);

			// Act + Assert
			assertThat(periodoCerrado.estaVigenteEn(fechaVigente)).isTrue();
		}

		@Test
		@DisplayName("La fecha no esta vigente dentro del período")
		void fechaNoVigenteFueraDelPeriodo() {
			// Arrange
			Periodo periodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 1),
					LocalDate.of(2025, MARCH, 10)
			);
			LocalDate fechaVigente = LocalDate.of(2025, MARCH, 11);

			// Act + Assert
			assertThat(periodoCerrado.estaVigenteEn(fechaVigente)).isFalse();
		}

		@Test
		@DisplayName("Una fecha futura es vigente si el período está abierto.")
		void fechaFuturaVigenteEnPeriodoAbierto() {
			// Arrange
			Periodo periodoAbierto = abierto(LocalDate.of(2025, MARCH, 1));
			LocalDate fechaVigente = LocalDate.of(2030, JANUARY, 1);

			// Act + Assert
			assertThat(periodoAbierto.estaVigenteEn(fechaVigente)).isTrue();
		}

		@Test
		@DisplayName("Una fecha anterior al inicio no está vigente en un período cerrado.")
		void noContieneFechaAntesDelInicio() {
			// Arrange
			Periodo periodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 2),
					LocalDate.of(2025, MARCH, 10)
			);
			LocalDate fechaAnterior = LocalDate.of(2025, MARCH, 1);

			// Act + Assert
			assertThat(periodoCerrado.estaVigenteEn(fechaAnterior)).isFalse();
		}

		@Test
		@DisplayName("La fecha de inicio es considerada vigente")
		void fechaInicioEsVigente() {
			// Arrange
			LocalDate fechaDesde = LocalDate.of(2025, MARCH, 1);
			Periodo periodoCerrado = cerrado(fechaDesde, LocalDate.of(2025, MARCH, 10));

			// Act + Assert
			assertThat(periodoCerrado.estaVigenteEn(fechaDesde)).isTrue();
		}

		@Test
		@DisplayName("La fecha de fin es considerada vigente")
		void fechaFinEsVigente() {
			// Arrange
			LocalDate fechaHasta = LocalDate.of(2025, MARCH, 10);
			Periodo periodoCerrado = new Periodo(LocalDate.of(2025, MARCH, 1), fechaHasta);

			// Act + Assert
			assertThat(periodoCerrado.estaVigenteEn(fechaHasta)).isTrue();
		}

		@Test
		@DisplayName("Una fecha null no está vigente en el período")
		void fechaNullNoEsVigente() {
			// Arrange
			Periodo periodo = cerrado(
					LocalDate.of(2025, MARCH, 1),
					LocalDate.of(2025, MARCH, 10)
			);

			// Act + Assert
			assertThat(periodo.estaVigenteEn(null)).isFalse();
		}

	}

	@Nested
	@DisplayName("Superposición de períodos")
	class Superposicion {

		@Test
		@DisplayName("Los períodos se superponen cuando tienen fechas en común.")
		void seSuperponenCuandoTienenInterseccion() {
			// Arrange
			Periodo unPeriodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 1),
					LocalDate.of(2025, MARCH, 10)
			);
			Periodo otroPeriodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 5),
					LocalDate.of(2025, MARCH, 15)
			);

			// Act + Assert
			assertThat(unPeriodoCerrado.seSuperponeCon(otroPeriodoCerrado)).isTrue();
		}

		@Test
		@DisplayName("Los períodos no se superponen cuando no comparten fechas.")
		void noSeSuperponen() {
			// Arrange
			Periodo unPeriodoCerado = cerrado(
					LocalDate.of(2025, MARCH, 1),
					LocalDate.of(2025, MARCH, 10)
			);
			Periodo otroPeriodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 11),
					LocalDate.of(2025, MARCH, 20)
			);

			// Act + Assert
			assertThat(unPeriodoCerado.seSuperponeCon(otroPeriodoCerrado)).isFalse();
		}

		@Test
		@DisplayName("Los períodos no se superponen cuando uno comienza después del otro.")
		void noSeSuperponenCuandoUnoEmpiezaDespues() {
			// Arrange
			Periodo unPeriodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 20),
					LocalDate.of(2025, MARCH, 25)
			);
			Periodo otroPeriodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 1),
					LocalDate.of(2025, MARCH, 10)
			);

			// Act + Assert
			assertThat(unPeriodoCerrado.seSuperponeCon(otroPeriodoCerrado)).isFalse();
		}

		@Test
		@DisplayName("Un período no se superpone con null")
		void noSeSuperponeConNull() {
			// Arrange
			Periodo periodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 1),
					LocalDate.of(2025, MARCH, 10)
			);

			// Act + Assert
			assertThat(periodoCerrado.seSuperponeCon(null)).isFalse();
		}

		@Test
		@DisplayName("Los períodos se superponen cuando coinciden en el límite")
		void seSuperponenEnElLimite() {
			// Arrange
			Periodo unPeriodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 1),
					LocalDate.of(2025, MARCH, 10)
			);
			Periodo otroPeriodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 10),
					LocalDate.of(2025, MARCH, 20)
			);

			// Act + Assert
			assertThat(unPeriodoCerrado.seSuperponeCon(otroPeriodoCerrado)).isTrue();
		}

		@Test
		@DisplayName("Un período abierto se superpone con uno cerrado")
		void periodoAbiertoSeSuperponeConCerrado() {
			// Arrange
			Periodo periodoAbierto = abierto(LocalDate.of(2025, 3, 1));
			Periodo periodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 5),
					LocalDate.of(2025, MARCH, 10)
			);

			// Act + Assert
			assertThat(periodoAbierto.seSuperponeCon(periodoCerrado)).isTrue();
		}

		@Test
		@DisplayName("Un período cerrado se superpone con uno abierto")
		void periodoCerradoSeSuperponeConAbierto() {
			// Arrange
			Periodo periodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 5),
					LocalDate.of(2025, MARCH, 10)
			);
			Periodo periodoAbierto = abierto(LocalDate.of(2025, 3, 1));

			// Act + Assert
			assertThat(periodoCerrado.seSuperponeCon(periodoAbierto)).isTrue();
		}

		@Test
		@DisplayName("Dos períodos abiertos siempre se superponen")
		void periodosAbiertosSiempreSeSuperponen() {
			// Arrrange
			Periodo unPeriodoAbierto = abierto(LocalDate.of(2025, MARCH, 1));
			Periodo otroPeriodoAbierto = abierto(LocalDate.of(2025, MARCH, 10));

			// Act + Assert
			assertThat(unPeriodoAbierto.seSuperponeCon(otroPeriodoAbierto)).isTrue();
		}

	}

	@Nested
	@DisplayName("Cálculo de días")
	class Dias {

		@Test
		@DisplayName("El período cerrado cuenta los días incluyendo ambos extremos.")
		void calculaDiasIncluyendoExtremos() {
			// Arrange
			Periodo periodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 1),
					LocalDate.of(2025, MARCH, 3)
			);

			// Act + Assert
			assertThat(periodoCerrado.dias()).isEqualTo(3);
		}

		@Test
		@DisplayName("Un período cerrado de un solo día devuelve 1.")
		void periodoDeUnDia() {
			// Arrange
			Periodo periodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 1),
					LocalDate.of(2025, MARCH, 1)
			);

			// Act + Assert
			assertThat(periodoCerrado.dias()).isEqualTo(1);
		}

		@Test
		@DisplayName("No se pueden calcular días en un período abierto")
		void fallaSiEsPeriodoAbierto() {
			// Arrange
			Periodo periodoAbierto = abierto(LocalDate.of(2025, MARCH, 1));

			// Act + Assert
			assertThatThrownBy(periodoAbierto::dias)
					.isInstanceOf(PeriodoAbiertoException.class)
					.hasMessage("No se pueden calcular días de un período abierto");
		}
	}

	@Nested
	@DisplayName("Representación textual del período")
	class ToStringTest {

		@Test
		@DisplayName("Un período cerrado muestra ambas fechas")
		void periodoCerradoMuestraFechas() {
			// Arrange
			Periodo periodoCerrado = cerrado(
					LocalDate.of(2025, MARCH, 1),
					LocalDate.of(2025, MARCH, 31)
			);

			// Act + Assert
			assertThat(periodoCerrado.toString())
					.isEqualTo("2025-03-01 → 2025-03-31");
		}

		@Test
		@DisplayName("Un período abierto indica que no tiene fin")
		void periodoAbiertoMuestraAbierto() {
			// Arrange
			Periodo periodoAbierto = abierto(LocalDate.of(2025, MARCH, 1));

			// Act + Assert
			assertThat(periodoAbierto.toString())
					.isEqualTo("2025-03-01 → abierto");
		}
	}

	@Nested
	@DisplayName("Cierre del período")
	class Cierre {

		@Test
		@DisplayName("Un período abierto se puede cerrar con una fecha válida.")
		void cierraPeriodoCorrectamente() {
			// Arrange
			LocalDate desde = LocalDate.of(2025, MARCH, 1);
			LocalDate fechaCierre = LocalDate.of(2025, MARCH, 10);
			Periodo periodoAbierto = abierto(desde);

			// Act
			Periodo periodoCerrado = periodoAbierto.cerrarEn(fechaCierre);

			// Assert
			assertThat(periodoCerrado)
					.extracting(Periodo::getFechaDesde, Periodo::getFechaHasta)
					.containsExactly(desde, fechaCierre);
		}

		@Test
		@DisplayName("No se puede cerrar un período abierto sin fecha de cierre.")
		void fallaSiFechaCierreEsNull() {
			// Arrange
			Periodo periodoAbierto = abierto(LocalDate.of(2025, MARCH, 1));

			// Act + Assert
			assertThatThrownBy(() -> periodoAbierto.cerrarEn(null))
					.isInstanceOf(CampoObligatorioException.class)
					.hasMessageContaining("fechaCierre");
		}

		@Test
		@DisplayName("No se puede cerrar un período con una fecha anterior al inicio")
		void fallaSiFechaCierreEsAnteriorAlInicio() {
			// Arrange
			LocalDate desde = LocalDate.of(2025, MARCH, 10);
			LocalDate fechaCierre = LocalDate.of(2025, MARCH, 1);
			Periodo periodoAbierto = abierto(desde);

			// Act + Assert
			assertThatThrownBy(() -> periodoAbierto.cerrarEn(fechaCierre))
					.isInstanceOf(RangoFechasInvalidoException.class);
		}

		@Test
		@DisplayName("Cerrar un período no modifica el período original")
		void cerrarNoModificaElOriginal() {
			// Arrange
			LocalDate desde = LocalDate.of(2025, MARCH, 1);
			Periodo periodoAbierto = abierto(desde);

			// Act
			Periodo cerrado = periodoAbierto.cerrarEn(LocalDate.of(2025, MARCH, 10));

			// Assert
			assertThat(periodoAbierto.getFechaHasta()).isNull();
			assertThat(cerrado.getFechaHasta()).isNotNull();
		}

	}

}