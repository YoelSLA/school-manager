package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.exceptions.EscuelaObligatoriaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.FechaIngresoInvalidaException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class EmpleadoEducativoTest {

	private Escuela escuela;

	@BeforeEach
	void setUp() {
		escuela = new Escuela("Escuela N°65", "Bernal", "Av. Siempre Viva 123", "1145-6789");
	}

	@Test
	void crearEmpleadoConDatosValidos() {
		LocalDate nacimiento = LocalDate.of(1990, 5, 10);
		LocalDate ingreso = LocalDate.of(2020, 3, 1);

		EmpleadoEducativo empleado = new EmpleadoEducativo(
				escuela,
				"20-12345678-9",
				"Pérez",
				"Juan",
				"Calle Falsa 123",
				"11-1234-5678",
				nacimiento,
				ingreso,
				"juan.perez@mail.com"
		);

		assertNotNull(empleado);
		assertEquals(escuela, empleado.getEscuela());
		assertEquals("Pérez", empleado.getApellido());
		assertEquals("Juan", empleado.getNombre());
		assertEquals(nacimiento, empleado.getFechaDeNacimiento());
		assertEquals(ingreso, empleado.getFechaDeIngreso());
		assertTrue(empleado.getAsignaciones().isEmpty());
	}

	@Test
	void noSePuedeCrearEmpleadoSinEscuela() {
		LocalDate nacimiento = LocalDate.of(1990, 5, 10);
		LocalDate ingreso = LocalDate.of(2020, 3, 1);

		assertThrows(
				EscuelaObligatoriaException.class,
				() -> new EmpleadoEducativo(
						null,
						"20-12345678-9",
						"Pérez",
						"Juan",
						"Calle Falsa 123",
						"11-1234-5678",
						nacimiento,
						ingreso,
						"juan.perez@mail.com"
				)
		);
	}

	@Test
	void noSePuedeCrearEmpleadoConFechaIngresoAnteriorANacimiento() {
		LocalDate nacimiento = LocalDate.of(2000, 1, 1);
		LocalDate ingreso = LocalDate.of(1999, 12, 31);

		assertThrows(
				FechaIngresoInvalidaException.class,
				() -> new EmpleadoEducativo(
						escuela,
						"20-12345678-9",
						"Pérez",
						"Juan",
						"Calle Falsa 123",
						"11-1234-5678",
						nacimiento,
						ingreso,
						"juan.perez@mail.com"
				)
		);
	}


	@Test
	void empleadoRecienCreadoNoTieneAsignaciones() {
		EmpleadoEducativo empleado = empleadoValido();

		assertTrue(empleado.getAsignaciones().isEmpty());
	}


	private EmpleadoEducativo empleadoValido() {
		return new EmpleadoEducativo(
				escuela,
				"20-12345678-9",
				"Pérez",
				"Juan",
				"Calle Falsa 123",
				"11-1234-5678",
				LocalDate.of(1990, 5, 10),
				LocalDate.of(2020, 3, 1),
				"juan@mail.com"
		);
	}


}
