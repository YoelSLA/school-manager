package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class EmpleadoEducativoServiceTest {

	@Autowired
	private EscuelaService escuelaService;

	@Autowired
	private DesignacionService designacionService;

	@Autowired
	private EmpleadoEducativoService empleadoEducativoService;

	private Escuela escuela;
	private EmpleadoEducativo juanPerez;
	private EmpleadoEducativo mariaLopez;
	private EmpleadoEducativo carlosFernandez;
	private DesignacionAdministrativa preceptoria;
	private DesignacionAdministrativa secretaria;
	private DesignacionAdministrativa bibliotecario;

	/* =========================
	   TESTS
	========================= */

	@BeforeEach
	void setUp() {
		escuela = crearEscuela65Bernal();
//		juanPerez = crearEmpleadoJuanPerez();
//		mariaLopez = crearEmpleadoMariaLopez();
//		carlosFernandez = crearEmpleadoCarlosFernandez();
		secretaria = crearDesignacionAdministrativa(2467832, RolEducativo.SECRETARIA);
		bibliotecario = crearDesignacionAdministrativa(2467838, RolEducativo.BIBLIOTECARIO);
		preceptoria = crearDesignacionAdministrativa(2467833, RolEducativo.PRECEPTORIA);
	}

	@Test
	void crearEmpleadoEducativo() {

		assertNotNull(carlosFernandez.getId());
		assertEquals("Carlos", carlosFernandez.getNombre());
		assertEquals(escuela.getId(), carlosFernandez.getEscuela().getId());
	}

//	@Test
//	void asignarDesignacionAEmpleado() {
//
//		LocalDate fechaTomaPosesion = LocalDate.of(2026, 1, 10);
//		LocalDate fechaCese = LocalDate.of(2026, 2, 15);
//		AsignacionNormal asignacionNormal = cubrirConTitular(juanPerez, fechaTomaPosesion, fechaCese);
//
//		designacionService.agregarAsignacion(secretaria.getId(), asignacionNormal);
//
//		List<Asignacion> activas = juanPerez.asignacionesActivas(fechaTomaPosesion);
//
//		assertEquals(1, activas.size());
//		assertEquals(secretaria.getId(), activas.get(0).getDesignacion().getId());
//	}
//
//	@Test
//	void crearLicencia() {
//
//		// Act
//		LocalDate fechaInicio = LocalDate.of(2026, 1, 10);
//		LocalDate fechaFin = LocalDate.of(2026, 1, 15);
//
//		Licencia licencia = empleadoEducativoService.crearLicencia(
//				mariaLopez.getId(),
//				TipoLicencia.L_A1,
//				fechaInicio,
//				fechaFin,
//				"Licencia médica"
//		);
//
//		// Assert
//		assertNotNull(licencia.getId());
//		assertEquals(mariaLopez.getId(), licencia.getEmpleadoEducativo().getId());
//		assertEquals(TipoLicencia.L_A1, licencia.getTipoLicencia());
//		assertEquals(LocalDate.of(2026, 1, 10), licencia.getFechaDesde());
//		assertEquals(LocalDate.of(2026, 1, 15), licencia.getFechaHasta());
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
//		// no hay asignaciones, no hay nada que dar de baja
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



	/* =========================
	   HELPERS
	========================= */

	private Escuela crearEscuela65Bernal() {
		return escuelaService.crear(new Escuela(
				"Escuela N°65",
				"Bernal",
				"Brown 5066",
				"42573309"
		));
	}
//
//	private EmpleadoEducativo crearEmpleadoJuanPerez() {
//		return empleadoEducativoService.crear(new EmpleadoEducativo(
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
//		return empleadoEducativoService.crear(new EmpleadoEducativo(
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
//		return empleadoEducativoService.crear(new EmpleadoEducativo(
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

	private DesignacionAdministrativa crearDesignacionAdministrativa(
			Integer cupof,
			RolEducativo rolEducativo
	) {
		return designacionService.crear(
				new DesignacionAdministrativa(escuela, cupof, rolEducativo)
		);
	}

}
