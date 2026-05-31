package com.gestion.escuela.gestion_escolar.controllers.services;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoDuplicadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.services.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import static com.gestion.escuela.gestion_escolar.models.Periodo.cerrado;
import static java.time.Month.JANUARY;
import static org.junit.jupiter.api.Assertions.*;

class EmpleadoEducativoServiceTest extends DomainServiceFixtureTest {

	@Autowired
	private EscuelaService escuelaService;

	@Autowired
	private DesignacionService designacionService;

	@Autowired
	private EmpleadoEducativoService empleadoEducativoService;

	@Autowired
	private CursoService cursoService;

	@Autowired
	private MateriaService materiaService;

	private Escuela p_escuelaN65;
	private EmpleadoEducativo p_giardinoNoraRosa;
	private EmpleadoEducativo p_billordoTomasa;
	private EmpleadoEducativo p_marchettiRoman;
	private DesignacionAdministrativa p_direccion2467830O;
	private DesignacionCurso p_plg2467775;


	@BeforeEach
	void setUp() {
		p_escuelaN65 = escuelaService.crear(m_escuelaN65);
		p_giardinoNoraRosa = empleadoEducativoService.crear(p_escuelaN65.getId(), m_giardinoNoraRosa);
		p_billordoTomasa = empleadoEducativoService.crear(p_escuelaN65.getId(), m_billordoTomasa);
		p_marchettiRoman = empleadoEducativoService.crear(p_escuelaN65.getId(), m_marchettiRoman);
		p_direccion2467830O = designacionService.crear(p_direccion2467830O);

		materiaService.crear(p_escuelaN65.getId(), m_practicasDelLenguaje);
		cursoService.crear(p_escuelaN65.getId(), m_a1g1);
		p_plg2467775 = designacionService.crear(m_plg2467775);
	}


	@Nested
	class Creacion {

		@Test
		void seCreaUnEmpleadoEducativoCorrectamente() {

			assertNotNull(p_giardinoNoraRosa.getId());
			assertEquals("Nora Rosa", p_giardinoNoraRosa.getNombre());
			assertEquals(p_escuelaN65.getId(), p_giardinoNoraRosa.getEscuela().getId());
		}

		@Test
		void noSePuedeCrearUnEmpleadoSiLaEscuelaNoExiste() {
			assertThrows(RecursoNoEncontradoException.class,
					() -> empleadoEducativoService.crear(
							999L,
							p_giardinoNoraRosa
					)
			);
		}

		@Test
		void noSePuedeCrearUnEmpleadoConCuilDuplicadoEnLaMismaEscuela() {
			EmpleadoEducativo duplicado = EmpleadoEducativo.builder()
					.escuela(p_escuelaN65)
					.cuil(p_giardinoNoraRosa.getCuil())
					.nombre("Otro")
					.apellido("Empleado")
					.fechaDeNacimiento(LocalDate.now())
					.fechaDeIngreso(LocalDate.now())
					.email("otro@gmail.com.ar")
					.build();

			assertThrows(
					RecursoDuplicadoException.class,
					() -> empleadoEducativoService.crear(
							p_escuelaN65.getId(),
							duplicado
					)
			);
		}

		@Test
		void noSePuedeCrearUnEmpleadoConEmailDuplicadoEnLaMismaEscuela() {
			EmpleadoEducativo duplicado = EmpleadoEducativo.builder()
					.escuela(p_escuelaN65)
					.cuil("20-42341174-1")
					.nombre("Otro")
					.apellido("Empleado")
					.fechaDeNacimiento(LocalDate.now())
					.fechaDeIngreso(LocalDate.now())
					.email(p_giardinoNoraRosa.getEmail())
					.build();

			assertThrows(
					RecursoDuplicadoException.class,
					() -> empleadoEducativoService.crear(
							p_escuelaN65.getId(),
							duplicado
					)
			);
		}
	}

	@Nested
	class CreacionBatch {
		@Test
		void creaMultiplesEmpleadosCorrectamente() {
			EmpleadoEducativo unEmpleado = EmpleadoEducativo.builder()
					.escuela(p_escuelaN65)
					.cuil("20-11111111-1")
					.nombre("Juan")
					.apellido("Perez")
					.fechaDeNacimiento(LocalDate.now())
					.fechaDeIngreso(LocalDate.now())
					.email("juan@gmail.com.ar")
					.build();

			EmpleadoEducativo otroEmpleado = EmpleadoEducativo.builder()
					.escuela(p_escuelaN65)
					.cuil("20-22222222-2")
					.nombre("Maria")
					.apellido("Gomez")
					.fechaDeNacimiento(LocalDate.now())
					.fechaDeIngreso(LocalDate.now())
					.email("maria@gmail.com.ar")
					.build();

			empleadoEducativoService.crearBatch(List.of(unEmpleado, otroEmpleado));

			assertNotNull(unEmpleado.getId());
			assertNotNull(otroEmpleado.getId());
		}

		@Test
		void crearBatchConListaVaciaNoFalla() {
			assertDoesNotThrow(() -> empleadoEducativoService.crearBatch(List.of()));
		}

		@Test
		void noSePuedeCrearBatchConCuilDuplicado() {

			EmpleadoEducativo duplicado = EmpleadoEducativo.builder()
					.escuela(p_escuelaN65)
					.cuil(p_giardinoNoraRosa.getCuil())
					.nombre("Otro")
					.apellido("Empleado")
					.fechaDeNacimiento(LocalDate.now())
					.fechaDeIngreso(LocalDate.now())
					.email("otro@gmail.com.ar")
					.build();

			assertThrows(
					RecursoDuplicadoException.class,
					() -> empleadoEducativoService.crearBatch(List.of(duplicado))
			);
		}

		@Test
		void noSePuedeCrearBatchConEmailDuplicado() {

			EmpleadoEducativo duplicado = EmpleadoEducativo.builder()
					.escuela(p_escuelaN65)
					.cuil("20-33333333-3")
					.nombre("Otro")
					.apellido("Empleado")
					.fechaDeNacimiento(LocalDate.now())
					.fechaDeIngreso(LocalDate.now())
					.email(p_giardinoNoraRosa.getEmail())
					.build();

			assertThrows(
					RecursoDuplicadoException.class,
					() -> empleadoEducativoService.crearBatch(List.of(duplicado))
			);
		}

	}

	@Nested
	class ObtenerPorId {

		@Test
		void obtieneEmpleadoPorIdCorrectamente() {

			EmpleadoEducativo obtenido = empleadoEducativoService.obtenerPorId(p_giardinoNoraRosa.getId());

			assertNotNull(obtenido);
			assertEquals(p_giardinoNoraRosa.getId(), obtenido.getId());
			assertEquals("Nora Rosa", obtenido.getNombre());
			assertEquals(p_escuelaN65.getId(), obtenido.getEscuela().getId());
		}

		@Test
		void lanzaExcepcionSiElEmpleadoNoExiste() {
			assertThrows(
					RecursoNoEncontradoException.class,
					() -> empleadoEducativoService.obtenerPorId(999L)
			);
		}

	}

	@Nested
	class CrearLicencia {

		@Test
		void crearLicencia() {
			// Arrange
			LocalDate fechaTomaPosesion = LocalDate.of(1998, JANUARY, 1);
			AsignacionTitular titular = designacionService.cubrirConTitular(
					p_plg2467775.getId(),
					p_giardinoNoraRosa.getId(),
					fechaTomaPosesion,
					null,
					1
			);

			// Act
			LocalDate fechaInicio = LocalDate.of(2026, JANUARY, 1);
			LocalDate fechaFin = LocalDate.of(2026, JANUARY, 15);
			Licencia licencia = empleadoEducativoService.crearLicencia(
					p_giardinoNoraRosa.getId(),
					TipoLicencia.L_A1,
					cerrado(fechaInicio, fechaFin),
					"Licencia médica",
					Set.of(p_plg2467775.getId())
			);

			// Assert
			assertNotNull(licencia.getId());
			assertEquals(p_giardinoNoraRosa.getId(), licencia.getEmpleadoEducativo().getId());
			assertEquals(TipoLicencia.L_A1, licencia.getTipoLicencia());
			assertEquals(fechaInicio, licencia.getPeriodo().getFechaDesde());
			assertEquals(fechaFin, licencia.getPeriodo().getFechaHasta());
		}

	}

//	@Nested
//	class DarBajaDefinitiva {
//
//		@Test
//		void daDeBajaDefinitivaCorrectamente() {
//
//			LocalDate fechaBaja = LocalDate.of(2026, JANUARY, 15);
//
//			empleadoEducativoService.darDeBajaDefinitiva(
//					p_giardinoNoraRosa.getId(),
//					fechaBaja,
//					CausaBaja.JUBILACION
//			);
//
//			EmpleadoEducativo actualizado =
//					empleadoEducativoService.obtenerPorId(
//							p_giardinoNoraRosa.getId()
//					);
//
//			assertTrue(actualizado.estaDadoDeBaja());
//
//			assertEquals(
//					fechaBaja,
//					actualizado.getFechaBaja()
//			);
//
//			assertEquals(
//					CausaBaja.JUBILACION,
//					actualizado.getCausaBaja()
//			);
//		}
//
//	}



//
//	@Test
//	void crearLicenciaCongelaDesignaciones() {
//
//		// Arrange
//		LocalDate fechaTomaPosesion = LocalDate.of(2026, 1, 10);
//		LocalDate fechaCese = LocalDate.of(2026, 2, 15);
//		AsignacionNormal asignacionNormal = cubrirConTitular(juanPerez, fechaTomaPosesion, fechaCese);
//
//		designacionService.agregarAsignacion(secretaria.getId(), asignacionNormal);
//
//		// sanity check
//		assertEquals(1, juanPerez.asignacionesActivas(LocalDate.of(2026, 1, 10)).size()
//		);
//
//		// Act
//		LocalDate fechaInicio = LocalDate.of(2026, 1, 10);
//		LocalDate fechaFin = LocalDate.of(2026, 1, 15);
//		Licencia licenciaGuardada = empleadoEducativoService.crearLicencia(
//				juanPerez.getId(),
//				TipoLicencia.L_A1,
//				fechaInicio,
//				fechaFin,
//				"Licencia médica"
//		);
//
//		// Assert
//		assertEquals(1, licenciaGuardada.getDesignaciones().size());
//		assertTrue(licenciaGuardada.getDesignaciones().contains(secretaria));
//		assertEquals(EstadoDesignacion.VACANTE_POR_LICENCIA, secretaria.getEstadoEn(fechaInicio));
//
//	}
//
//	@Test
//	void crearLicenciaSinDesignacionesNoFallaYQuedaSinCubrir() {
//
//		LocalDate fechaInicio = LocalDate.of(2026, 1, 10);
//		LocalDate fechaFin = LocalDate.of(2026, 1, 15);
//		Licencia licencia = empleadoEducativoService.crearLicencia(
//				mariaLopez.getId(),
//				TipoLicencia.L_A1,
//				fechaInicio,
//				fechaFin,
//				"Licencia"
//		);
//
//		assertTrue(licencia.getDesignaciones().isEmpty());
//		assertEquals(EstadoLicencia.CUBIERTA, licencia.getEstadoEn(fechaInicio));
//	}
//
//	/* =========================
//	  DAR DE BAJA DEFINTIIVA
//	========================= */
//
//	@Test
//	void daDeBajaDefinitivaAEmpleadoConAsignacionVigente() {
//		// Arrange
//		LocalDate fechaTomaPosesion = LocalDate.of(2026, 1, 10);
//		LocalDate fechaCese = LocalDate.of(2026, 1, 30);
//		AsignacionNormal asignacionTitular = cubrirConTitular(carlosFernandez, fechaTomaPosesion, fechaCese);
//
//		designacionService.agregarAsignacion(preceptoria.getId(), asignacionTitular);
//
//		// precondición
//		LocalDate fechaBaja = LocalDate.of(2026, 1, 20);
//		assertEquals(EstadoAsignacion.VIGENTE, asignacionTitular.getEstadoEn(fechaBaja));
//		assertEquals(EstadoDesignacion.CUBIERTA, preceptoria.getEstadoEn(fechaBaja));
//
//		// Act
//		empleadoEducativoService.darDeBajaDefinitiva(carlosFernandez.getId(), fechaBaja, CausaBaja.RENUNCIA);
//
//		// Assert
//		assertEquals(EstadoAsignacion.DADA_DE_BAJA, asignacionTitular.getEstadoEn(fechaBaja));
//		assertEquals(CausaBaja.RENUNCIA, asignacionTitular.getCausaBaja());
//		assertEquals(fechaBaja, asignacionTitular.getFechaBaja());
//
//		assertEquals(EstadoDesignacion.VACANTE, preceptoria.getEstadoEn(fechaBaja));
//	}
//
//	@Test
//	void daDeBajaDefinitivaAEmpleadoSinAsignaciones() {
//		// Arrange
//		LocalDate fechaBaja = LocalDate.of(2026, 1, 20);
//
//		// precondición
//		assertTrue(mariaLopez.getAsignaciones().isEmpty());
//
//		// Act (no debería explotar)
//		empleadoEducativoService.darDeBajaDefinitiva(mariaLopez.getId(), fechaBaja, CausaBaja.RENUNCIA);
//
//		// Assert
//		// no hay asignacion, no hay nada que dar de baja
//		assertTrue(mariaLopez.getAsignaciones().isEmpty());
//	}
//
//	@Test
//	void siTitularRenunciaDuranteLicenciaSinSuplenteLaDesignacionQuedaVacante() {
//		// Arrange
//		LocalDate fechaTomaPosesion = LocalDate.of(2026, 1, 1);
//		LocalDate fechaCese = LocalDate.of(2026, 12, 31);
//
//		AsignacionNormal asignacionTitular = cubrirConTitular(juanPerez, fechaTomaPosesion, fechaCese);
//
//		designacionService.agregarAsignacion(bibliotecario.getId(), asignacionTitular);
//
//		// licencia activa del titular
//		LocalDate fechaInicioLicencia = LocalDate.of(2026, 1, 10);
//		LocalDate fechaFinLicencia = LocalDate.of(2026, 1, 20);
//
//		empleadoEducativoService.crearLicencia(
//				juanPerez.getId(),
//				TipoLicencia.L_A1,
//				fechaInicioLicencia,
//				fechaFinLicencia,
//				"Reposo médico"
//		);
//
//		// precondiciones
//		LocalDate fechaBaja = LocalDate.of(2026, 1, 15);
//		assertEquals(EstadoAsignacion.EN_LICENCIA, asignacionTitular.getEstadoEn(fechaBaja));
//		assertEquals(EstadoDesignacion.VACANTE_POR_LICENCIA, bibliotecario.getEstadoEn(fechaBaja));
//
//		// Act
//		empleadoEducativoService.darDeBajaDefinitiva(juanPerez.getId(), fechaBaja, CausaBaja.RENUNCIA);
//
//		// Assert
//		assertEquals(EstadoAsignacion.DADA_DE_BAJA, asignacionTitular.getEstadoEn(fechaBaja));
//
//		assertEquals(EstadoDesignacion.VACANTE, bibliotecario.getEstadoEn(fechaBaja));
//	}
//
//	@Test
//	void siTitularRenunciaDuranteLicenciaElSuplentePasaAProvisional() {
//		// Arrange
//		LocalDate fechaTomaPosesion = LocalDate.of(2026, 1, 1);
//		LocalDate fechaCese = LocalDate.of(2026, 12, 31);
//
//
//		AsignacionNormal asignacionTitular = cubrirConTitular(carlosFernandez, fechaTomaPosesion, fechaCese);
//		designacionService.agregarAsignacion(bibliotecario.getId(), asignacionTitular);
//
//		// Licencia del titular
//		LocalDate inicioLicencia = LocalDate.of(2026, 1, 10);
//		LocalDate finLicencia = LocalDate.of(2026, 1, 20);
//
//		Licencia licenciaGuardada = empleadoEducativoService.crearLicencia(
//				carlosFernandez.getId(),
//				TipoLicencia.L_A1,
//				inicioLicencia,
//				finLicencia,
//				"Reposo médico"
//		);
//
//		//	designacionService.cubrirDesignacionesConSuplente(licenciaGuardada, mariaLopez, List.of(bibliotecario.getId()));
//
//		// precondiciones
//		LocalDate fechaBaja = LocalDate.of(2026, 1, 15);
//
//		Asignacion asignacionSuplente = bibliotecario.asignacionQueEjerceEn(fechaBaja).orElseThrow();
//
//		assertEquals(EstadoAsignacion.EN_LICENCIA, asignacionTitular.getEstadoEn(fechaBaja));
//		assertEquals(EstadoAsignacion.VIGENTE, asignacionSuplente.getEstadoEn(fechaBaja));
//		assertEquals(EstadoDesignacion.CUBIERTA, bibliotecario.getEstadoEn(fechaBaja));
//
//		// Act
//		empleadoEducativoService.darDeBajaDefinitiva(carlosFernandez.getId(), fechaBaja, CausaBaja.RENUNCIA);
//
//		// Assert
//		// 1️⃣ Titular dado de baja
//		assertEquals(EstadoAsignacion.DADA_DE_BAJA, asignacionTitular.getEstadoEn(fechaBaja));
//
//		// 2️⃣ La asignación de suplente original queda dada de baja
//		assertEquals(EstadoAsignacion.DADA_DE_BAJA, asignacionSuplente.getEstadoEn(fechaBaja));
//
//		// 3️⃣ Existe una nueva asignación PROVISIONAL
//		Asignacion asignacionProvisional = bibliotecario.asignacionQueEjerceEn(fechaBaja).orElseThrow();
//		assertEquals(SituacionDeRevista.PROVISIONAL, asignacionProvisional.getSituacionDeRevista());
//		assertEquals(mariaLopez.getId(), asignacionProvisional.getEmpleadoEducativo().getId());
//
//		// 4️⃣ La designación sigue cubierta
//		assertEquals(EstadoDesignacion.CUBIERTA, bibliotecario.getEstadoEn(fechaBaja));
//	}
//
//	@Test
//	void darDeBajaDefinitivaEsIdempotente() {
//		LocalDate fechaBaja = LocalDate.of(2026, 1, 20);
//
//		AsignacionNormal asignacionTitular = cubrirConTitular(
//				carlosFernandez,
//				LocalDate.of(2026, 1, 1),
//				LocalDate.of(2026, 12, 31)
//		);
//
//		designacionService.agregarAsignacion(bibliotecario.getId(), asignacionTitular);
//
//		empleadoEducativoService.darDeBajaDefinitiva(
//				carlosFernandez.getId(), fechaBaja, CausaBaja.RENUNCIA
//		);
//
//		// no debería explotar
//		empleadoEducativoService.darDeBajaDefinitiva(
//				carlosFernandez.getId(), fechaBaja, CausaBaja.RENUNCIA
//		);
//
//		assertEquals(
//				EstadoAsignacion.DADA_DE_BAJA,
//				asignacionTitular.getEstadoEn(fechaBaja)
//		);
//	}
//


//	/* =========================
//	   HELPERS
//	========================= */
//
//	private Escuela crearEscuela65Bernal() {
//		return escuelaService.crear(new Escuela(
//				"Escuela N°65",
//				"Bernal",
//				"Brown 5066",
//				"42573309"
//		));
//	}
//
//	private EmpleadoEducativo crearEmpleadoJuanPerez() {
//		return empleadoEducativoService.crear(escuela.getId(), new EmpleadoEducativo(
//				escuela,
//				"20-34567891-2",
//				"Juan",
//				"Pérez",
//				"Mitre 1450",
//				"1162347890",
//				LocalDate.of(1982, 6, 18),
//				LocalDate.of(2008, 4, 1),
//				"juan.perez@test.com"
//		));
//	}
//
//	private EmpleadoEducativo crearEmpleadoMariaLopez() {
//		return empleadoEducativoService.crear(escuela.getId(), new EmpleadoEducativo(
//				escuela,
//				"27-38945612-7",
//				"María",
//				"López",
//				"Sarmiento 980",
//				"1145983210",
//				LocalDate.of(1989, 9, 3),
//				LocalDate.of(2016, 3, 12),
//				"maria.lopez@test.com"
//		));
//	}
//
//	private EmpleadoEducativo crearEmpleadoCarlosFernandez() {
//		return empleadoEducativoService.crear(escuela.getId(), new EmpleadoEducativo(
//				escuela,
//				"23-31278945-6",
//				"Carlos",
//				"Fernández",
//				"Av. Calchaquí 3200",
//				"1176540987",
//				LocalDate.of(1975, 12, 21),
//				LocalDate.of(2001, 8, 20),
//				"carlos.fernandez@test.com"
//		));
//	}
//
//	private DesignacionAdministrativa crearDesignacionAdministrativa(
//			Integer cupof,
//			RolEducativo rolEducativo
//	) {
//		return designacionService.crear(
//				new DesignacionAdministrativa(escuela, cupof, rolEducativo)
//		);
//	}

}
