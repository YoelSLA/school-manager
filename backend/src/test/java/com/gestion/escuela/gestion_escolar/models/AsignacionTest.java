package com.gestion.escuela.gestion_escolar.models;

public class AsignacionTest {

//	Escuela escuela;
//
//	@BeforeEach
//	void setUp() {
//		escuela = new Escuela("Escuela N°65", "Bernal", "Av. Siempre Viva 123", "1145-6789");
//	}
//
//	@Test
//	void sePuedeCrearAsignacionActivaTitularValida() {
//
//		EmpleadoEducativo empleado = empleadoValido(escuela);
//
//		Asignacion asignacion = new Asignacion(
//				empleado,
//				LocalDate.of(2024, 3, 1),
//				LocalDate.of(2030, 12, 31),
//				SituacionDeRevista.TITULAR
//		);
//
//		assertNotNull(asignacion);
//		assertEquals(empleado, asignacion.getEmpleadoEducativo());
//		assertEquals(SituacionDeRevista.TITULAR, asignacion.getSituacionDeRevista());
//		assertEquals(EstadoAsignacion.ACTIVA, asignacion.getEstadoAsignacion());
//		assertTrue(asignacion.getLicencias().isEmpty());
//	}
//
//	@Test
//	void noSePuedeCrearAsignacionSinEmpleado() {
//		assertThrows(
//				EmpleadoEducativoObligatorioException.class,
//				() -> new Asignacion(
//						null,
//						LocalDate.of(2024, 3, 1),
//						LocalDate.of(2030, 12, 31),
//						SituacionDeRevista.TITULAR
//				)
//		);
//	}
//
//	@Test
//	void noSePuedeCrearAsignacionSinSituacionDeRevista() {
//
//		assertThrows(
//				SituacionDeRevistaObligatoriaException.class,
//				() -> new Asignacion(
//						empleadoValido(escuela),
//						LocalDate.of(2024, 3, 1),
//						LocalDate.of(2030, 12, 31),
//						null
//				)
//		);
//	}
//
//	@Test
//	void noSePuedeCrearAsignacionSinFechas() {
//
//		assertThrows(
//				FechasAsignacionObligatoriasException.class,
//				() -> new Asignacion(
//						empleadoValido(escuela),
//						null,
//						null,
//						SituacionDeRevista.TITULAR
//				)
//		);
//	}
//
//	@Test
//	void laFechaDeCeseNoPuedeSerAnteriorALaFechaDeTomaDePosesion() {
//
//		assertThrows(
//				PeriodoAsignacionInvalidoException.class,
//				() -> new Asignacion(
//						empleadoValido(escuela),
//						LocalDate.of(2024, 3, 10),
//						LocalDate.of(2024, 3, 1),
//						SituacionDeRevista.TITULAR
//				)
//		);
//	}
//
//	@Test
//	void asignacionActivaNoTieneLicenciasYEjerceElCargo() {
//
//		Asignacion asignacion = new Asignacion(
//				empleadoValido(escuela),
//				LocalDate.of(2024, 3, 1),
//				LocalDate.of(2030, 12, 31),
//				SituacionDeRevista.TITULAR
//		);
//
//		assertEquals(EstadoAsignacion.ACTIVA, asignacion.getEstadoAsignacion());
//		assertTrue(asignacion.getLicencias().isEmpty());
//		assertTrue(asignacion.estaEjerciendo());
//	}
//
//	@Test
//	void asignacionActivaNoPuedeRegistrarLicencia() {
//
//		Asignacion asignacion = new Asignacion(
//				empleadoValido(escuela),
//				LocalDate.of(2024, 3, 1),
//				LocalDate.of(2030, 12, 31),
//				SituacionDeRevista.TITULAR
//		);
//
//		assertThrows(
//				AsignacionActivaConLicenciaException.class,
//				() -> asignacion.registrarLicencia(
//						TipoLicencia.ENFERMEDAD,
//						LocalDate.of(2026, 1, 1),
//						LocalDate.of(2026, 1, 5)
//				)
//		);
//	}
//
//	@Test
//	void asignacionEnLicenciaNoEjerceYTieneLicencias() {
//
//		Asignacion asignacion = new Asignacion(
//				empleadoValido(escuela),
//				LocalDate.of(2024, 3, 1),
//				LocalDate.of(2030, 12, 31),
//				SituacionDeRevista.TITULAR
//		);
//		asignacion.pasarALicencia();
//
//		asignacion.registrarLicencia(
//				TipoLicencia.ENFERMEDAD,
//				LocalDate.of(2026, 1, 1),
//				LocalDate.of(2026, 1, 10)
//		);
//
//		assertEquals(EstadoAsignacion.LICENCIA, asignacion.getEstadoAsignacion());
//		assertFalse(asignacion.estaEjerciendo());
//		assertFalse(asignacion.getLicencias().isEmpty());
//	}
//
//	@Test
//	void cambioDeFuncionSoloPuedeSerTitular() {
//
//		Asignacion asignacion = new Asignacion(
//				empleadoValido(escuela),
//				LocalDate.of(2022, 3, 1),
//				LocalDate.of(2030, 12, 31),
//				SituacionDeRevista.TITULAR
//		);
//
//		asignacion.pasarACambioDeFuncion();
//
//		assertEquals(EstadoAsignacion.CAMBIO_DE_FUNCION, asignacion.getEstadoAsignacion());
//		assertFalse(asignacion.estaEjerciendo());
//	}
//
//	@Test
//	void cambioDeFuncionNoPuedeSerSuplente() {
//
//		Asignacion asignacion = new Asignacion(empleadoValido(escuela), LocalDate.of(2024, 3, 1), LocalDate.of(2030, 12, 31), SituacionDeRevista.SUPLENTE);
//
//		assertThrows(
//				CambioDeFuncionSoloTitularException.class,
//				asignacion::pasarACambioDeFuncion
//		);
//	}
//
//	@Test
//	void cambioDeFuncionNoPuedeSerProvisional() {
//
//		Asignacion asignacion = new Asignacion(empleadoValido(escuela), LocalDate.of(2024, 3, 1), LocalDate.of(2030, 12, 31), SituacionDeRevista.PROVISIONAL);
//
//		assertThrows(
//				CambioDeFuncionSoloTitularException.class,
//				asignacion::pasarACambioDeFuncion
//		);
//
//	}
//
//
//	private EmpleadoEducativo empleadoValido(Escuela escuela) {
//		return new EmpleadoEducativo(
//				escuela,
//				"20-12345678-9",
//				"Pérez",
//				"Juan",
//				"Calle Falsa 123",
//				"11-1234-5678",
//				LocalDate.of(1990, 5, 10),
//				LocalDate.of(2020, 3, 1),
//				"juan@mail.com"
//		);
//
//	}

}