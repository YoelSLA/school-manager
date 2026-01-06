package com.gestion.escuela.gestion_escolar.services;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class EmpleadoEducativoServiceTest {
//
//	@Autowired
//	private EmpleadoEducativoService empleadoEducativoService;
//
//	@Autowired
//	private EscuelaService escuelaService;
//
//	// =========================
//	// CREAR
//	// =========================
//
//	@Test
//	void crearEmpleadoEducativo_exitosamente() {
//
//		Escuela escuela = escuelaService.crear(new Escuela("Escuela N°65", "Brown 5066", "45674567"));
//
//		EmpleadoEducativo empleado = new EmpleadoEducativo(
//				escuela,
//				"20-12345678-3",
//				"Pérez",
//				"Juan",
//				"Calle Falsa 123",
//				"1144556677",
//				LocalDate.of(1990, 5, 10),
//				LocalDate.of(2020, 3, 1),
//				"juan.perez@mail.com"
//		);
//
//		EmpleadoEducativo empleadoEducativoPersistido = empleadoEducativoService.crear(empleado);
//
//		assertNotNull(empleadoEducativoPersistido.getId());
//		assertEquals("20-12345678-3", empleadoEducativoPersistido.getCuil());
//		assertEquals("Juan", empleadoEducativoPersistido.getNombre());
//		assertEquals("Pérez", empleadoEducativoPersistido.getApellido());
//		assertEquals("Escuela N°65", empleadoEducativoPersistido.getEscuela().getNombre());
//		assertTrue(empleadoEducativoPersistido.estaActivo());
//		assertTrue(empleadoEducativoPersistido.getDesignaciones().isEmpty());
//	}
//
//	@Test
//	void noPermiteCrearEmpleadoConMismoCuilEnMismaEscuela() {
//
//		Escuela escuela = escuelaService.crear(new Escuela("Escuela N°65", "Brown 5066", "45674567"));
//
//		EmpleadoEducativo primero = new EmpleadoEducativo(
//				escuela,
//				"20-12345678-3",
//				"Pérez",
//				"Juan",
//				"Calle Falsa 123",
//				"1144556677",
//				LocalDate.of(1990, 5, 10),
//				LocalDate.of(2020, 3, 1),
//				"juan.perez@mail.com"
//		);
//
//		EmpleadoEducativo duplicado = new EmpleadoEducativo(
//				escuela,
//				"20-12345678-3", // 👈 mismo CUIL
//				"Gómez",
//				"Ana",
//				"Otra Calle 456",
//				"1199887766",
//				LocalDate.of(1988, 8, 20),
//				LocalDate.of(2021, 4, 1),
//				"ana.gomez@mail.com"
//		);
//
//		empleadoEducativoService.crear(primero);
//
//		assertThrows(EmpleadoEducativoDuplicadoException.class,
//				() -> empleadoEducativoService.crear(duplicado)
//		);
//	}
//
//	@Test
//	void noPermiteCrearEmpleadoConMismoEmailEnMismaEscuela() {
//
//		Escuela escuela = escuelaService.crear(new Escuela("Escuela N°65", "Brown 5066", "45674567"));
//
//		EmpleadoEducativo primero = new EmpleadoEducativo(
//				escuela,
//				"20-12345678-3",
//				"Pérez",
//				"Juan",
//				"Calle Falsa 123",
//				"1144556677",
//				LocalDate.of(1990, 5, 10),
//				LocalDate.of(2020, 3, 1),
//				"empleado@mail.com" // 👈 email
//		);
//
//		EmpleadoEducativo duplicado = new EmpleadoEducativo(
//				escuela,
//				"27-87654321-4", // distinto CUIL
//				"Gómez",
//				"Ana",
//				"Otra Calle 456",
//				"1199887766",
//				LocalDate.of(1988, 8, 20),
//				LocalDate.of(2021, 4, 1),
//				"empleado@mail.com" // 👈 mismo email
//		);
//
//		empleadoEducativoService.crear(primero);
//
//		assertThrows(EmpleadoEducativoDuplicadoException.class, () -> empleadoEducativoService.crear(duplicado)
//		);
//
//	}
//
//	@Test
//	void permiteCrearEmpleadoConMismoCuilEnDistintaEscuela() {
//		Escuela escuela1 = escuelaService.crear(new Escuela("Escuela N°65", "Brown 5066", "45674567"));
//		Escuela escuela2 = escuelaService.crear(new Escuela("Escuela N°70", "Brown 5066", "45674567"));
//
//		EmpleadoEducativo e1 = empleadoValido(escuela1, "20-12345678-3", "a@mail.com");
//		EmpleadoEducativo e2 = empleadoValido(escuela2, "20-12345678-3", "b@mail.com");
//
//		empleadoEducativoService.crear(e1);
//
//		assertDoesNotThrow(() -> empleadoEducativoService.crear(e2));
//	}
//
//	@Test
//	void permiteCrearEmpleadoConMismoMailEnDistintaEscuela() {
//		Escuela escuela1 = escuelaService.crear(new Escuela("Escuela N°65", "Brown 5066", "45674567"));
//		Escuela escuela2 = escuelaService.crear(new Escuela("Escuela N°70", "Brown 5066", "45674567"));
//
//		EmpleadoEducativo e1 = empleadoValido(escuela1, "20-11111111-1", "mail@mail.com");
//		EmpleadoEducativo e2 = empleadoValido(escuela2, "20-22222222-2", "mail@mail.com");
//
//		empleadoEducativoService.crear(e1);
//
//		assertDoesNotThrow(() -> empleadoEducativoService.crear(e2));
//	}
//
//	// =========================
//	// LISTAR
//	// =========================
//
//	@Test
//	void listarTodosLosEmpleadosDeUnaEscuela() {
//		Escuela escuela = escuelaService.crear(new Escuela("Escuela N°65", "Brown 5066", "45674567"));
//
//		EmpleadoEducativo e1 = empleadoValido(escuela, "20-11111111-1", "a@mail.com");
//		EmpleadoEducativo e2 = empleadoValido(escuela, "20-22222222-2", "b@mail.com");
//
//		empleadoEducativoService.crear(e1);
//		empleadoEducativoService.crear(e2);
//
//		List<EmpleadoEducativo> empleados = empleadoEducativoService.listarTodos(escuela);
//
//		assertEquals(2, empleados.size());
//	}
//
//	@Test
//	void listarSoloEmpleadosActivos() {
//		Escuela escuela = escuelaService.crear(new Escuela("Escuela N°65", "Brown 5066", "45674567"));
//
//		EmpleadoEducativo activo = empleadoValido(
//				escuela, "20-11111111-1", "a@mail.com"
//		);
//		EmpleadoEducativo inactivo = empleadoValido(
//				escuela, "20-22222222-2", "b@mail.com"
//		);
//
//		empleadoEducativoService.crear(activo);
//		empleadoEducativoService.crear(inactivo);
//
//		inactivo.desactivar();
//
//		List<EmpleadoEducativo> activos =
//				empleadoEducativoService.listarActivos(escuela);
//
//		assertEquals(1, activos.size());
//		assertTrue(activos.get(0).estaActivo());
//	}
//
//	@Test
//	void listarSoloEmpleadosInactivos() {
//		Escuela escuela = escuelaService.crear(new Escuela("Escuela N°65", "Brown 5066", "45674567"));
//
//		EmpleadoEducativo activo = empleadoValido(
//				escuela, "20-11111111-1", "a@mail.com"
//		);
//		EmpleadoEducativo inactivo = empleadoValido(
//				escuela, "20-22222222-2", "b@mail.com"
//		);
//
//		empleadoEducativoService.crear(activo);
//		empleadoEducativoService.crear(inactivo);
//
//		inactivo.desactivar();
//
//		List<EmpleadoEducativo> inactivos =
//				empleadoEducativoService.listarInactivos(escuela);
//
//		assertEquals(1, inactivos.size());
//		assertFalse(inactivos.get(0).estaActivo());
//	}
//
//	@Test
//	void listarTodos_devuelveListaVacia_cuandoNoHayEmpleados() {
//		Escuela escuela = escuelaService.crear(new Escuela("Escuela N°65", "Brown 5066", "45674567"));
//
//		List<EmpleadoEducativo> empleados =
//				empleadoEducativoService.listarTodos(escuela);
//
//		assertNotNull(empleados);
//		assertTrue(empleados.isEmpty());
//	}
//
//	@Test
//	void listarActivos_devuelveListaVacia_cuandoNoHayEmpleados() {
//		Escuela escuela = escuelaService.crear(new Escuela("Escuela N°65", "Brown 5066", "45674567"));
//
//		List<EmpleadoEducativo> activos =
//				empleadoEducativoService.listarActivos(escuela);
//
//		assertNotNull(activos);
//		assertTrue(activos.isEmpty());
//	}
//
//	@Test
//	void listarInactivos_devuelveListaVacia_cuandoNoHayEmpleados() {
//		Escuela escuela = escuelaService.crear(new Escuela("Escuela N°65", "Brown 5066", "45674567"));
//
//		List<EmpleadoEducativo> inactivos =
//				empleadoEducativoService.listarInactivos(escuela);
//
//		assertNotNull(inactivos);
//		assertTrue(inactivos.isEmpty());
//	}
//
//
//	private EmpleadoEducativo empleadoValido(Escuela escuela, String cuil, String email) {
//		return new EmpleadoEducativo(
//				escuela,
//				cuil,
//				"Pérez",
//				"Juan",
//				"Calle Falsa 123",
//				"1144556677",
//				LocalDate.of(1990, 1, 1),
//				LocalDate.of(2020, 1, 1),
//				email
//		);
//	}


}
