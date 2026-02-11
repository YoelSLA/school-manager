package com.gestion.escuela.gestion_escolar.services;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class LicenciaServiceTest {

//	@Autowired
//	private LicenciaService licenciaService;
//
//	@Autowired
//	private EscuelaService escuelaService;
//
//	@Autowired
//	private EmpleadoEducativoService empleadoEducativoService;
//
//	private Escuela escuelaGuardada;
//	private EmpleadoEducativo juanPerez;
//
//	@BeforeEach
//	void setUp() {
//		escuelaGuardada = escuelaService.crear(
//				new Escuela(
//						"Escuela N°65",
//						"Bernal",
//						"Brown 5066",
//						"42573309"
//				));
//
//		juanPerez = empleadoEducativoService.crear(crearEmpleadoJuanPerez());
//	}
//
//	@Test
//	void obtieneLicenciaPorIdExistente() {
//		// Arrange
//
//		LocalDate fechaInicio = LocalDate.of(2020, 1, 10);
//		LocalDate fechaFin = LocalDate.of(2020, 1, 20);
//
//		Licencia licenciaGuardada = empleadoEducativoService.crearLicencia(
//				juanPerez.getId(),
//				TipoLicencia.L_A1,
//				fechaInicio,
//				fechaFin,
//				"Reposo medico");
//
//		// Act
//		Licencia resultado = licenciaService.obtenerPorId(licenciaGuardada.getId());
//
//		// Assert
//		assertNotNull(resultado);
//		assertEquals(licenciaGuardada.getId(), resultado.getId());
//		assertEquals(licenciaGuardada.getTipoLicencia(), resultado.getTipoLicencia());
//		assertEquals(escuelaGuardada.getId(), resultado.getEscuela().getId());
//	}
//
//	@Test
//	void lanzaExcepcionSiLaLicenciaNoExiste() {
//		// Arrange
//		Long idInexistente = 999L;
//
//		// Act + Assert
//		assertThrows(
//				RecursoNoEncontradoException.class,
//				() -> licenciaService.obtenerPorId(idInexistente)
//		);
//	}
//
//	@Test
//	void buscaLicenciasPorEscuela() {
//		// Arrange
//		Escuela otraEscuela = escuelaService.crear(
//				new Escuela(
//						"Escuela N°99",
//						"Quilmes",
//						"Mitre 123",
//						"42223333"
//				)
//		);
//
//		// Licencias en escuelaGuardada
//		Licencia licencia1 = empleadoEducativoService.crearLicencia(
//				juanPerez.getId(),
//				TipoLicencia.L_A1,
//				LocalDate.of(2020, 1, 1),
//				LocalDate.of(2020, 1, 10),
//				"Licencia 1"
//		);
//
//		Licencia licencia2 = empleadoEducativoService.crearLicencia(
//				juanPerez.getId(),
//				TipoLicencia.L_A1,
//				LocalDate.of(2020, 2, 1),
//				LocalDate.of(2020, 2, 10),
//				"Licencia 2"
//		);
//
//		// Licencia en otra escuela
//		EmpleadoEducativo otroEmpleado = empleadoEducativoService.crear(
//				new EmpleadoEducativo(
//						otraEscuela,
//						"20-99999999-9",
//						"Pedro",
//						"Gomez",
//						"Otra 456",
//						"1166778899",
//						LocalDate.of(1985, 5, 5),
//						LocalDate.of(2015, 3, 1),
//						"pedro@test.com"
//				)
//		);
//
//		empleadoEducativoService.crearLicencia(
//				otroEmpleado.getId(),
//				TipoLicencia.L_A1,
//				LocalDate.of(2020, 3, 1),
//				LocalDate.of(2020, 3, 10),
//				"Licencia otra escuela"
//		);
//
//		// Act
//		List<Licencia> resultado = licenciaService.buscarPorEscuela(escuelaGuardada);
//
//		// Assert
//		assertEquals(2, resultado.size());
//		assertTrue(resultado.contains(licencia1));
//		assertTrue(resultado.contains(licencia2));
//
//		// Seguridad extra: todas son de la escuela correcta
//		assertTrue(
//				resultado.stream()
//						.allMatch(l -> l.getEscuela().getId()
//								.equals(escuelaGuardada.getId()))
//		);
//	}
//
//	@Test
//	void devuelveListaVaciaSiLaEscuelaNoTieneLicencias() {
//		// Arrange
//		Escuela escuelaSinLicencias = escuelaService.crear(
//				new Escuela(
//						"Escuela N°123",
//						"Avellaneda",
//						"Belgrano 100",
//						"42000000"
//				)
//		);
//
//		// Act
//		List<Licencia> resultado = licenciaService.buscarPorEscuela(escuelaSinLicencias);
//
//		// Assert
//		assertNotNull(resultado);
//		assertTrue(resultado.isEmpty());
//	}
//
//	@Test
//	void renuevaLicenciaExistente() {
//		// Arrange
//		LocalDate fechaInicio = LocalDate.of(2020, 1, 1);
//		LocalDate fechaFin = LocalDate.of(2020, 1, 10);
//
//		Licencia licenciaOriginal =
//				empleadoEducativoService.crearLicencia(
//						juanPerez.getId(),
//						TipoLicencia.L_A1,
//						fechaInicio,
//						fechaFin,
//						"Licencia original"
//				);
//
//		LocalDate nuevoHasta = LocalDate.of(2020, 1, 20);
//
//		// Act
//		Licencia renovada =
//				licenciaService.renovarLicencia(
//						licenciaOriginal.getId(),
//						TipoLicencia.L_A1,
//						nuevoHasta,
//						"Renovación"
//				);
//
//		// Assert
//		assertNotNull(renovada);
//		assertNotNull(renovada.getId());
//
//		// no es la misma licencia
//		assertNotEquals(licenciaOriginal.getId(), renovada.getId());
//
//		// encadenamiento
//		assertEquals(licenciaOriginal, renovada.getLicenciaAnterior());
//		assertEquals(renovada, licenciaOriginal.getLicenciaSiguiente());
//
//		// fechas
//		assertEquals(
//				licenciaOriginal.getFechaHasta().plusDays(1),
//				renovada.getFechaDesde()
//		);
//		assertEquals(nuevoHasta, renovada.getFechaHasta());
//
//		// tipo
//		assertEquals(TipoLicencia.L_A1, renovada.getTipoLicencia());
//	}
//
//	@Test
//	void noSePuedeRenovarLicenciaInexistente() {
//		// Arrange
//		Long licenciaInexistenteId = 9999L;
//
//		// Act + Assert
//		assertThrows(
//				RecursoNoEncontradoException.class,
//				() -> licenciaService.renovarLicencia(
//						licenciaInexistenteId,
//						TipoLicencia.L_A1,
//						LocalDate.of(2020, 2, 1),
//						"Intento de renovación"
//				)
//		);
//	}
//
//	private EmpleadoEducativo crearEmpleadoJuanPerez() {
//		return new EmpleadoEducativo(
//				escuelaGuardada,
//				"20-34567891-2",
//				"Juan",
//				"Pérez",
//				"Mitre 1450",
//				"1162347890",
//				LocalDate.of(1982, 6, 18),
//				LocalDate.of(2008, 4, 1),
//				"juan.perez@test.com"
//		);
//	}
}
