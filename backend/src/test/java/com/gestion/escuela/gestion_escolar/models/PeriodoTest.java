package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.periodo.PeriodoAbiertoException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Tests de Periodo")
class PeriodoTest {

	@Test
	@DisplayName("No debe contener null")
	void noContieneNull() {
		Periodo periodo = new Periodo(
				LocalDate.of(2025, 3, 1),
				LocalDate.of(2025, 3, 10)
		);

		assertFalse(periodo.estaVigenteEn(null));
	}

	@Test
	@DisplayName("No debe superponerse con null")
	void noSeSuperponeConNull() {
		Periodo p1 = new Periodo(
				LocalDate.of(2025, 3, 1),
				LocalDate.of(2025, 3, 10)
		);

		assertFalse(p1.seSuperponeCon(null));
	}

	@Nested
	@DisplayName("Creación de período")
	class Creacion {

		@Test
		@DisplayName("Debe crear un período válido cerrado")
		void creaPeriodoValidoCerrado() {
			LocalDate desde = LocalDate.of(2025, 3, 1);
			LocalDate hasta = LocalDate.of(2025, 3, 31);

			Periodo periodo = new Periodo(desde, hasta);

			assertEquals(desde, periodo.getFechaDesde());
			assertEquals(hasta, periodo.getFechaHasta());
		}

		@Test
		@DisplayName("Debe crear un período abierto cuando fechaHasta es null")
		void creaPeriodoAbierto() {
			LocalDate desde = LocalDate.of(2025, 3, 1);

			Periodo periodo = new Periodo(desde, null);

			assertTrue(periodo.esAbierto());
			assertNull(periodo.getFechaHasta());
		}

		@Test
		@DisplayName("Debe lanzar CampoObligatorioException si fechaDesde es null")
		void fallaSiFechaDesdeEsNull() {
			assertThrows(
					CampoObligatorioException.class,
					() -> new Periodo(null, LocalDate.now())
			);
		}

		@Test
		@DisplayName("Debe lanzar RangoFechasInvalidoException si fechaDesde es posterior a fechaHasta")
		void fallaSiRangoInvalido() {
			LocalDate desde = LocalDate.of(2025, 4, 1);
			LocalDate hasta = LocalDate.of(2025, 3, 1);

			assertThrows(
					RangoFechasInvalidoException.class,
					() -> new Periodo(desde, hasta)
			);
		}
	}

	@Nested
	@DisplayName("Estado del período")
	class Estado {

		@Test
		@DisplayName("Debe ser cerrado cuando tiene fechaHasta")
		void esCerradoCuandoTieneFechaHasta() {
			Periodo periodo = new Periodo(
					LocalDate.now(),
					LocalDate.now().plusDays(1)
			);

			assertTrue(periodo.esCerrado());
			assertFalse(periodo.esAbierto());
		}

		@Test
		@DisplayName("Debe ser abierto cuando fechaHasta es null")
		void esAbiertoCuandoNoTieneFechaHasta() {
			Periodo periodo = new Periodo(
					LocalDate.now(),
					null
			);

			assertTrue(periodo.esAbierto());
			assertFalse(periodo.esCerrado());
		}
	}

	@Nested
	@DisplayName("Método estaVigenteEn")
	class EstaVigenteEn {

		@Test
		@DisplayName("Debe contener una fecha dentro del rango cerrado")
		void contieneFechaDentroDelRango() {
			Periodo periodo = new Periodo(
					LocalDate.of(2025, 3, 1),
					LocalDate.of(2025, 3, 10)
			);

			assertTrue(periodo.estaVigenteEn(LocalDate.of(2025, 3, 5)));
		}

		@Test
		@DisplayName("No debe contener una fecha fuera del rango cerrado")
		void noContieneFechaFueraDelRango() {
			Periodo periodo = new Periodo(
					LocalDate.of(2025, 3, 1),
					LocalDate.of(2025, 3, 10)
			);

			assertFalse(periodo.estaVigenteEn(LocalDate.of(2025, 3, 15)));
		}

		@Test
		@DisplayName("Debe contener fechas futuras si el período es abierto")
		void contieneEnPeriodoAbierto() {
			Periodo periodo = new Periodo(
					LocalDate.of(2025, 3, 1),
					null
			);

			assertTrue(periodo.estaVigenteEn(LocalDate.of(2030, 1, 1)));
		}

		@Test
		@DisplayName("No debe contener fecha anterior al inicio")
		void noContieneFechaAntesDelInicio() {
			Periodo periodo = new Periodo(
					LocalDate.of(2025, 3, 10),
					LocalDate.of(2025, 3, 20)
			);

			assertFalse(periodo.estaVigenteEn(LocalDate.of(2025, 3, 5)));
		}

		@Test
		@DisplayName("Debe contener fecha igual al inicio")
		void contieneFechaIgualAlInicio() {
			Periodo periodo = new Periodo(
					LocalDate.of(2025, 3, 1),
					LocalDate.of(2025, 3, 10)
			);

			assertTrue(periodo.estaVigenteEn(LocalDate.of(2025, 3, 1)));
		}

	}

	@Nested
	@DisplayName("Superposición de períodos")
	class Superposicion {

		@Test
		@DisplayName("Debe detectar superposición cuando los períodos se intersectan")
		void seSuperponenCuandoTienenInterseccion() {
			Periodo p1 = new Periodo(
					LocalDate.of(2025, 3, 1),
					LocalDate.of(2025, 3, 10)
			);

			Periodo p2 = new Periodo(
					LocalDate.of(2025, 3, 5),
					LocalDate.of(2025, 3, 15)
			);

			assertTrue(p1.seSuperponeCon(p2));
		}

		@Test
		@DisplayName("No debe detectar superposición cuando no hay intersección")
		void noSeSuperponenCuandoNoHayInterseccion() {
			Periodo p1 = new Periodo(
					LocalDate.of(2025, 3, 1),
					LocalDate.of(2025, 3, 10)
			);

			Periodo p2 = new Periodo(
					LocalDate.of(2025, 3, 11),
					LocalDate.of(2025, 3, 20)
			);

			assertFalse(p1.seSuperponeCon(p2));
		}

		@Test
		@DisplayName("No debe superponerse cuando este empieza después de que el otro termina")
		void noSeSuperponenCuandoEsteEmpiezaDespues() {
			Periodo p1 = new Periodo(
					LocalDate.of(2025, 3, 20),
					LocalDate.of(2025, 3, 25)
			);

			Periodo p2 = new Periodo(
					LocalDate.of(2025, 3, 1),
					LocalDate.of(2025, 3, 10)
			);

			assertFalse(p1.seSuperponeCon(p2));
		}

		@Test
		@DisplayName("No debe superponerse con null")
		void noSeSuperponeConNull() {
			Periodo p1 = new Periodo(
					LocalDate.of(2025, 3, 1),
					LocalDate.of(2025, 3, 10)
			);

			assertFalse(p1.seSuperponeCon(null));
		}

		@Test
		@DisplayName("Debe superponerse cuando se tocan en el límite")
		void seSuperponenCuandoSeTocanEnElLimite() {
			Periodo p1 = new Periodo(
					LocalDate.of(2025, 3, 1),
					LocalDate.of(2025, 3, 10)
			);

			Periodo p2 = new Periodo(
					LocalDate.of(2025, 3, 10),
					LocalDate.of(2025, 3, 20)
			);

			assertTrue(p1.seSuperponeCon(p2));
		}

		@Test
		@DisplayName("Debe superponerse cuando este período es abierto")
		void seSuperponeCuandoEsteEsAbierto() {
			Periodo p1 = new Periodo(
					LocalDate.of(2025, 3, 1),
					null
			);

			Periodo p2 = new Periodo(
					LocalDate.of(2025, 3, 5),
					LocalDate.of(2025, 3, 10)
			);

			assertTrue(p1.seSuperponeCon(p2));
		}

		@Test
		@DisplayName("Debe superponerse cuando el otro período es abierto")
		void seSuperponeCuandoOtroEsAbierto() {
			Periodo p1 = new Periodo(
					LocalDate.of(2025, 3, 5),
					LocalDate.of(2025, 3, 10)
			);

			Periodo p2 = new Periodo(
					LocalDate.of(2025, 3, 1),
					null
			);

			assertTrue(p1.seSuperponeCon(p2));
		}

		@Test
		@DisplayName("Debe superponerse cuando ambos períodos son abiertos")
		void seSuperponenCuandoAmbosSonAbiertos() {
			Periodo p1 = new Periodo(
					LocalDate.of(2025, 3, 1),
					null
			);

			Periodo p2 = new Periodo(
					LocalDate.of(2025, 3, 10),
					null
			);

			assertTrue(p1.seSuperponeCon(p2));
		}
	}

	@Nested
	@DisplayName("Cálculo de días")
	class Dias {

		@Test
		@DisplayName("Debe calcular los días incluyendo ambos extremos")
		void calculaDiasIncluyendoAmbosExtremos() {
			Periodo periodo = new Periodo(
					LocalDate.of(2025, 3, 1),
					LocalDate.of(2025, 3, 3)
			);

			assertEquals(3, periodo.dias());
		}

		@Test
		@DisplayName("Debe lanzar PeriodoAbiertoException si se intenta calcular días en período abierto")
		void fallaSiEsPeriodoAbierto() {
			Periodo periodo = new Periodo(
					LocalDate.of(2025, 3, 1),
					null
			);

			assertThrows(
					PeriodoAbiertoException.class,
					periodo::dias
			);
		}
	}

	@Nested
	@DisplayName("Representación textual del período")
	class ToStringTest {

		@Test
		@DisplayName("Debe mostrar ambas fechas cuando el período es cerrado")
		void muestraFechasCuandoEsCerrado() {

			Periodo periodo = new Periodo(
					LocalDate.of(2025, 3, 1),
					LocalDate.of(2025, 3, 31)
			);

			assertEquals(
					"2025-03-01 → 2025-03-31",
					periodo.toString()
			);
		}

		@Test
		@DisplayName("Debe mostrar 'abierto' cuando fechaHasta es null")
		void muestraAbiertoCuandoEsPeriodoAbierto() {

			Periodo periodo = new Periodo(
					LocalDate.of(2025, 3, 1),
					null
			);

			assertEquals(
					"2025-03-01 → abierto",
					periodo.toString()
			);
		}
	}

}