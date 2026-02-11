package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.exceptions.EstadoInvalidoException;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class BajaAsignacionTest {

	@Test
	void seCreaCorrectamenteConFechaYCausa() {
		// Arrange
		LocalDate fecha = LocalDate.of(2026, 1, 10);
		CausaBaja causa = CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES;

		// Act
		BajaAsignacion baja = new BajaAsignacion(fecha, causa);

		// Assert
		assertEquals(fecha, baja.getFechaBaja());
		assertEquals(causa, baja.getCausa());
	}

	@Test
	void noSePuedeCrearSinFecha() {
		// Arrange
		CausaBaja causa = CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES;

		// Act
		assertThrows(EstadoInvalidoException.class, () -> new BajaAsignacion(null, causa));
	}

	@Test
	void noSePuedeCrearSinCausa() {
		// Arrange
		LocalDate fecha = LocalDate.of(2026, 1, 10);

		// Act
		assertThrows(EstadoInvalidoException.class, () -> new BajaAsignacion(fecha, null));

	}

	@Test
	void noSePuedeCrearSinFechaNiCausa() {
		// Act
		assertThrows(EstadoInvalidoException.class, () -> new BajaAsignacion(null, null));
	}
}
