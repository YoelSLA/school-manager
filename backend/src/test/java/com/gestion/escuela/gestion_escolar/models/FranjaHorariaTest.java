package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.franjaHoraria.RangoHorarioInvalidoException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("Tests de FranjaHoraria")
class FranjaHorariaTest {

	@Nested
	@DisplayName("Creación de franja horaria")
	class Creacion {

		@Test
		@DisplayName("Debe crear una franja válida")
		void creaFranjaValida() {

			LocalTime desde = LocalTime.of(8, 0);
			LocalTime hasta = LocalTime.of(10, 0);

			FranjaHoraria franja = new FranjaHoraria(
					DiaDeSemana.LUNES,
					desde,
					hasta
			);

			assertEquals(DiaDeSemana.LUNES, franja.getDia());
			assertEquals(desde, franja.getHoraDesde());
			assertEquals(hasta, franja.getHoraHasta());
		}

		@Test
		@DisplayName("Debe lanzar excepción si dia es null")
		void fallaSiDiaEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new FranjaHoraria(
							null,
							LocalTime.of(8, 0),
							LocalTime.of(10, 0)
					)
			);
		}

		@Test
		@DisplayName("Debe lanzar excepción si horaDesde es null")
		void fallaSiHoraDesdeEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new FranjaHoraria(
							DiaDeSemana.LUNES,
							null,
							LocalTime.of(10, 0)
					)
			);
		}

		@Test
		@DisplayName("Debe lanzar excepción si horaHasta es null")
		void fallaSiHoraHastaEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new FranjaHoraria(
							DiaDeSemana.LUNES,
							LocalTime.of(8, 0),
							null
					)
			);
		}

		@Test
		@DisplayName("Debe lanzar RangoHorarioInvalidoException si horaDesde es igual a horaHasta")
		void fallaSiHorasIguales() {

			assertThrows(
					RangoHorarioInvalidoException.class,
					() -> new FranjaHoraria(
							DiaDeSemana.LUNES,
							LocalTime.of(8, 0),
							LocalTime.of(8, 0)
					)
			);
		}

		@Test
		@DisplayName("Debe lanzar RangoHorarioInvalidoException si horaDesde es posterior a horaHasta")
		void fallaSiRangoInvalido() {

			assertThrows(
					RangoHorarioInvalidoException.class,
					() -> new FranjaHoraria(
							DiaDeSemana.LUNES,
							LocalTime.of(10, 0),
							LocalTime.of(8, 0)
					)
			);
		}
	}

	@Nested
	@DisplayName("Representación textual de la franja")
	class ToStringTest {

		@Test
		@DisplayName("Debe mostrar día y rango horario")
		void muestraDiaYHorario() {

			FranjaHoraria franja = new FranjaHoraria(
					DiaDeSemana.LUNES,
					LocalTime.of(8, 0),
					LocalTime.of(10, 0)
			);

			assertEquals(
					"LUNES 08:00 → 10:00",
					franja.toString()
			);
		}
	}
}