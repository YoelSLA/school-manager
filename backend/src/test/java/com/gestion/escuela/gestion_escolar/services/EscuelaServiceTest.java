package com.gestion.escuela.gestion_escolar.services;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class EscuelaServiceTest {

//	@Autowired
//	private EscuelaService escuelaService;
//
//	private Escuela escuelaACrear;
//	private ConversionService conversionService;
//
//	@BeforeEach
//	void setUp() {
//		escuelaACrear = new Escuela("Escuela N°65", "Brown 5066", "45674567");
//	}
//
//	// =========================
//	// CREAR
//	// =========================
//
//	@Test
//	void crearEscuela() {
//
//		Escuela escuelaPersistida = escuelaService.crear(escuelaACrear);
//
//		assertNotNull(escuelaPersistida.getId());
//		assertEquals("Escuela N°65", escuelaPersistida.getNombre());
//		assertEquals("Brown 5066", escuelaPersistida.getDireccion());
//		assertEquals("45674567", escuelaPersistida.getTelefono());
//	}
//
//	@Test
//	void noPermiteCrearEscuelaDuplicada() {
//
//		escuelaService.crear(escuelaACrear);
//
//		assertThrows(EscuelaDuplicadaException.class, () ->
//				escuelaService.crear(new Escuela("Escuela N°65", "Brown 5066", "45674567"))
//		);
//	}
//
//	@Test
//	void noPermiteCrearEscuelaConNombreDeEscuelaDesactivada() {
//
//		Escuela escuelaPersistida = escuelaService.crear(new Escuela("Escuela N°65", "Brown 5066", "45674567"));
//
//		escuelaService.desactivarPorNombre(escuelaPersistida.getNombre());
//
//		assertThrows(EscuelaDuplicadaException.class, () -> escuelaService.crear(new Escuela("Escuela N°65", "Otra", "9999")));
//	}
//
//	// =========================
//	// OBTENER
//	// =========================
//
//	@Test
//	void obtenerEscuelaPorNombre() {
//
//		Escuela escuelaPersistida = escuelaService.crear(escuelaACrear);
//
//		Escuela escuelaObtenida = escuelaService.obtenerPorNombre(escuelaPersistida.getNombre());
//
//		assertEquals("Escuela N°65", escuelaObtenida.getNombre());
//		assertEquals("Brown 5066", escuelaObtenida.getDireccion());
//		assertEquals("45674567", escuelaObtenida.getTelefono());
//
//	}
//
//	@Test
//	void buscarEscuelaNoExistente() {
//
//		assertThrows(EscuelaNoEncontradaException.class, () ->
//				escuelaService.obtenerPorNombre("Escuela Nº64"));
//
//	}
//
//	// =========================
//	// LISTAR
//	// =========================
//
//	@Test
//	void listarEscuelas() {
//
//		Escuela escuelaACrear2 = new Escuela("Escuela N°66", "San Martín 123", "44112233");
//
//		escuelaService.crear(escuelaACrear);
//		escuelaService.crear(escuelaACrear2);
//
//		List<Escuela> escuelasPersistidas = escuelaService.listarTodas();
//
//		assertEquals(2, escuelasPersistidas.size());
//
//		assertTrue(escuelasPersistidas.stream().anyMatch(e -> e.getNombre().equals("Escuela N°65")));
//		assertTrue(escuelasPersistidas.stream().anyMatch(e -> e.getNombre().equals("Escuela N°66")));
//	}
//
//	@Test
//	void listarTodasLasEscuelasVacio() {
//
//		List<Escuela> escuelasPersistidas = escuelaService.listarTodas();
//
//		assertNotNull(escuelasPersistidas);
//		assertTrue(escuelasPersistidas.isEmpty());
//	}
//
//	@Test
//	void listarSoloEscuelasActivas() {
//
//		escuelaService.crear(escuelaACrear);
//
//		List<Escuela> escuelasPersistidas = escuelaService.listarActivas();
//
//		assertNotNull(escuelasPersistidas);
//		assertTrue(escuelasPersistidas.stream().anyMatch(e -> e.getNombre().equals("Escuela N°65")));
//	}
//
//	@Test
//	void listarSoloEscuelasActivas_excluyeLasDesactivadas() {
//
//		escuelaService.crear(escuelaACrear);
//		Escuela escuelaADesactivar = escuelaService.crear(new Escuela("Escuela N°12", "San Martín 123", "44112233")
//		);
//
//		escuelaService.desactivarPorNombre(escuelaADesactivar.getNombre());
//
//		List<Escuela> escuelasActivas = escuelaService.listarActivas();
//
//		assertNotNull(escuelasActivas);
//		assertEquals(1, escuelasActivas.size());
//
//		assertTrue(escuelasActivas.stream().anyMatch(e -> e.getNombre().equals("Escuela N°65")));
//
//		assertFalse(escuelasActivas.stream().anyMatch(e -> e.getNombre().equals("Escuela N°12")));
//	}
//
//	@Test
//	void listarActivasVacio() {
//
//		List<Escuela> escuelasActivas = escuelaService.listarActivas();
//
//		assertNotNull(escuelasActivas);
//		assertTrue(escuelasActivas.isEmpty());
//	}
//
//	// =========================
//	// DESACTIVAR / ACTIVAR
//	// =========================
//
//	@Test
//	void desactivarEscuelaActiva() {
//
//		Escuela escuela = escuelaService.crear(escuelaACrear);
//
//		escuelaService.desactivarPorNombre(escuela.getNombre());
//
//		assertFalse(escuela.estaActiva());
//	}
//
//	@Test
//	void activarEscuelaDesactivada() {
//
//		// Given
//		Escuela escuela = escuelaService.crear(new Escuela("Escuela N°12", "San Martín 123", "44112233"));
//
//		escuelaService.desactivarPorNombre(escuela.getNombre());
//
//		escuelaService.activarPorNombre(escuela.getNombre());
//
//		Escuela escuelaActiva = escuelaService.obtenerPorNombre(escuela.getNombre());
//		assertTrue(escuelaActiva.estaActiva());
//	}
//
//	// =========================
//	// ACTUALIZAR
//	// =========================
//
//	@Test
//	void actualizarEscuelaActiva() {
//
//		// Given
//		Escuela escuelaPersistida = escuelaService.crear(escuelaACrear);
//
//		Escuela escuelaAActualizar = new Escuela(
//				"Escuela N°65 BIS",
//				"Av. Mitre 123",
//				"11112222"
//		);
//
//		Escuela escuelaActualizadaPersitida = escuelaService.actualizarPorNombre(escuelaPersistida.getNombre(), escuelaAActualizar);
//
//		assertEquals("Escuela N°65 BIS", escuelaActualizadaPersitida.getNombre());
//		assertEquals("Av. Mitre 123", escuelaActualizadaPersitida.getDireccion());
//		assertEquals("11112222", escuelaActualizadaPersitida.getTelefono());
//		assertTrue(escuelaActualizadaPersitida.estaActiva());
//	}
//
//	@Test
//	void actualizarEscuelaInexistente() {
//
//		Escuela escuelaAActualizar = new Escuela(
//				"Escuela Fantasma",
//				"Calle Falsa 123",
//				"99999999"
//		);
//
//		assertThrows(EscuelaNoEncontradaException.class, () ->
//				escuelaService.actualizarPorNombre("No Existe", escuelaAActualizar)
//		);
//	}
//
//	@Test
//	void noPermiteActualizarEscuelaDesactivada() {
//
//		// Given
//		Escuela escuelaPersistida = escuelaService.crear(
//				new Escuela("Escuela N°12", "San Martín 123", "44112233")
//		);
//
//		escuelaService.desactivarPorNombre(escuelaPersistida.getNombre());
//
//		Escuela datosActualizados = new Escuela(
//				"Escuela N°12 BIS",
//				"Otra Dirección",
//				"00000000"
//		);
//
//		assertThrows(EscuelaNoEncontradaException.class, () ->
//				escuelaService.actualizarPorNombre(
//						escuelaPersistida.getNombre(),
//						datosActualizados
//				)
//		);
//	}
//
//	@Test
//	void actualizarEscuelaNoPermiteNombreDuplicadoEntreActivas() {
//
//		escuelaService.crear(new Escuela("Escuela N°1", "A", "111"));
//
//		Escuela escuelaPersistida = escuelaService.crear(new Escuela("Escuela N°2", "B", "222"));
//
//		Escuela datosActualizados = new Escuela("Escuela N°1", "Otra", "333");
//
//		assertThrows(EscuelaDuplicadaException.class, () ->
//				escuelaService.actualizarPorNombre(
//						escuelaPersistida.getNombre(),
//						datosActualizados
//				)
//		);
//	}

}

