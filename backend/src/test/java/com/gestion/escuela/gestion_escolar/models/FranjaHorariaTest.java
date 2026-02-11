package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class FranjaHorariaTest {

	@Test
	void seCreaCorrectamenteConDatosValidos() {
		// Arrange
		DiaDeSemana dia = DiaDeSemana.LUNES;
		LocalTime desde = LocalTime.of(8, 0);
		LocalTime hasta = LocalTime.of(10, 0);

		// Act
		FranjaHoraria franja = new FranjaHoraria(dia, desde, hasta);

		// Assert
		assertEquals(dia, franja.getDia());
		assertEquals(desde, franja.getHoraDesde());
		assertEquals(hasta, franja.getHoraHasta());
	}

	@Test
	void noSePuedeCrearSinDia() {
		// Act + Assert
		assertThrows(
				CampoObligatorioException.class,
				() -> new FranjaHoraria(null, LocalTime.of(8, 0), LocalTime.of(10, 0))
		);

	}

	@Test
	void noSePuedeCrearSinHoraDesde() {
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
	void noSePuedeCrearSinHoraHasta() {
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
	void noSePuedeCrearSiHoraDesdeEsIgualAHoraHasta() {
		assertThrows(
				CampoObligatorioException.class,
				() -> new FranjaHoraria(
						DiaDeSemana.LUNES,
						LocalTime.of(8, 0),
						LocalTime.of(8, 0)
				)
		);


	}

	@Test
	void noSePuedeCrearSiHoraDesdeEsPosteriorAHoraHasta() {
		assertThrows(
				CampoObligatorioException.class,
				() -> new FranjaHoraria(
						DiaDeSemana.LUNES,
						LocalTime.of(11, 0),
						LocalTime.of(10, 0)
				)
		);

	}
}
