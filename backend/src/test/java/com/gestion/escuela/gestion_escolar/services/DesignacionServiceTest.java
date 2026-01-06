package com.gestion.escuela.gestion_escolar.services;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest()
@ActiveProfiles("test")
@Transactional
public class DesignacionServiceTest {

//	@Autowired
//	private DesignacionService designacionService;
//
//	@Autowired
//	private EscuelaService escuelaService;
//
//	@Autowired
//	private EmpleadoEducativoService empleadoEducativoService;
//
//	private Escuela escuela;
//
//	@BeforeEach
//	void setUp() {
//		escuela = crearEscuela();
//	}
//
//
//	@Test
//	void crearDesignacionAdministrativaConEmpleado() {
//
//		EmpleadoEducativo empleado = crearEmpleado(escuela);
//
//		DesignacionAdministrativa designacion =
//				crearDesignacionConEmpleado(
//						2467774,
//						escuela,
//						empleado,
//						SituacionDeRevista.TITULAR,
//						RolEducativo.DIRECCION
//				);
//
//		designacion.agregarFranja(DiaDeSemana.LUNES, LocalTime.of(8, 0), LocalTime.of(12, 0));
//
//		DesignacionAdministrativa guardada = designacionService.crearAdministrativa(designacion);
//
//		assertNotNull(guardada.getId());
//		assertFalse(guardada.isVacante());
//		assertEquals(empleado.getId(), guardada.getEmpleadoEducativo().getId());
//		assertEquals(1, guardada.getFranjasHorarias().size());
//	}
//
//
//	@Test
//	void crearDesignacionAdministrativaSinEmpleado() {
//
//		DesignacionAdministrativa designacion =
//				new DesignacionAdministrativa(
//						2467776,
//						escuela,
//						RolEducativo.DIRECCION
//				);
//
//		designacion.agregarFranja(DiaDeSemana.LUNES, LocalTime.of(8, 0), LocalTime.of(12, 0));
//
//		DesignacionAdministrativa guardada = designacionService.crearAdministrativa(designacion);
//
//		assertNotNull(guardada.getId());
//		assertTrue(guardada.isVacante());
//		assertNull(guardada.getEmpleadoEducativo());
//		assertNull(guardada.getSituacionDeRevista());
//		assertEquals(1, guardada.getFranjasHorarias().size());
//	}
//
//	@Test
//	void noSePuedeCrearDesignacionSinFranjas() {
//
//		DesignacionAdministrativa designacion =
//				new DesignacionAdministrativa(
//						3001,
//						escuela,
//						RolEducativo.DIRECCION
//				);
//
//		assertThrows(HorariosInvalidosException.class, () ->
//				designacionService.crearAdministrativa(designacion)
//		);
//	}
//
//	@Test
//	void noSePuedeCrearDesignacionConCupofDuplicadoEnLaMismaEscuela() {
//
//		DesignacionAdministrativa d1 =
//				new DesignacionAdministrativa(4001, escuela, RolEducativo.DIRECCION);
//		d1.agregarFranja(DiaDeSemana.LUNES, LocalTime.of(8, 0), LocalTime.of(12, 0));
//		designacionService.crearAdministrativa(d1);
//
//		DesignacionAdministrativa d2 =
//				new DesignacionAdministrativa(4001, escuela, RolEducativo.DIRECCION);
//		d2.agregarFranja(DiaDeSemana.MARTES, LocalTime.of(8, 0), LocalTime.of(12, 0));
//
//		assertThrows(CupofDuplicadoException.class, () ->
//				designacionService.crearAdministrativa(d2)
//		);
//	}
//
//	@Test
//	void noPermiteFranjasSolapadas() {
//
//		DesignacionAdministrativa designacion =
//				new DesignacionAdministrativa(5001, escuela, RolEducativo.DIRECCION);
//
//		designacion.agregarFranja(DiaDeSemana.LUNES, LocalTime.of(8, 0), LocalTime.of(12, 0));
//		designacion.agregarFranja(DiaDeSemana.LUNES, LocalTime.of(11, 0), LocalTime.of(13, 0));
//
//		assertThrows(HorariosInvalidosException.class, () ->
//				designacionService.crearAdministrativa(designacion)
//		);
//
//	}
//
//	@Test
//	void crearDesignacionConMultiplesFranjas() {
//
//		DesignacionAdministrativa designacion =
//				new DesignacionAdministrativa(6001, escuela, RolEducativo.DIRECCION);
//
//		designacion.agregarFranja(DiaDeSemana.LUNES, LocalTime.of(8, 0), LocalTime.of(10, 0));
//		designacion.agregarFranja(DiaDeSemana.MIERCOLES, LocalTime.of(10, 0), LocalTime.of(12, 0));
//
//		DesignacionAdministrativa guardada =
//				designacionService.crearAdministrativa(designacion);
//
//		assertEquals(2, guardada.getFranjasHorarias().size());
//	}
//
//	@Test
//	void noSePuedeCrearDesignacionConEmpleadoSinSituacion() {
//
//		EmpleadoEducativo empleado = crearEmpleado(escuela);
//		DesignacionAdministrativa designacion =
//				new DesignacionAdministrativa(
//						2467830,
//						escuela,
//						empleado,
//						null,
//						RolEducativo.DIRECCION
//				);
//
//		designacion.agregarFranja(DiaDeSemana.LUNES, LocalTime.of(8, 0), LocalTime.of(12, 0));
//
//		assertThrows(SituacionDeRevistaInvalidaException.class, () ->
//				designacionService.crearAdministrativa(designacion)
//		);
//	}
//
//	// -------------------------
//	// HELPERS PRIVADOS
//	// -------------------------
//
//	private Escuela crearEscuela() {
//		return escuelaService.crear(
//				new Escuela(
//						"Escuela Test " + UUID.randomUUID(),
//						"Calle Falsa",
//						"123"
//				)
//		);
//	}
//
//	private EmpleadoEducativo crearEmpleado(Escuela escuela) {
//		return empleadoEducativoService.crear(
//				new EmpleadoEducativo(
//						escuela,
//						"20-" + (10000000 + new Random().nextInt(89999999)) + "-1",
//						"Ventoso",
//						"Yoel",
//						"Brown 5066",
//						"1153419894",
//						LocalDate.of(2000, 2, 1),
//						LocalDate.now(),
//						"yoel" + UUID.randomUUID() + "@gmail.com"
//				)
//		);
//	}
//
//	private DesignacionAdministrativa crearDesignacionSinEmpleado(
//			Integer cupof,
//			Escuela escuela,
//			RolEducativo rol
//	) {
//		return new DesignacionAdministrativa(cupof, escuela, rol);
//	}
//
//	private DesignacionAdministrativa crearDesignacionConEmpleado(
//			Integer cupof,
//			Escuela escuela,
//			EmpleadoEducativo empleado,
//			SituacionDeRevista situacion,
//			RolEducativo rol
//	) {
//		return new DesignacionAdministrativa(
//				cupof,
//				escuela,
//				empleado,
//				situacion,
//				rol
//		);
//	}
//

}
