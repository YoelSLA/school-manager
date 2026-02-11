package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class DesignacionServiceTest {

	@Autowired
	private DesignacionService designacionService;

	@Autowired
	private EmpleadoEducativoService empleadoService;

	@Autowired
	private LicenciaService licenciaService;

	@Autowired
	private EscuelaService escuelaService;

	@Autowired
	private EmpleadoEducativoService empleadoEducativoService;

	private Escuela escuela;
	private EmpleadoEducativo juanPerez;
	private EmpleadoEducativo mariaLopez;
	private EmpleadoEducativo carlosFernandez;
	private DesignacionAdministrativa preceptoria;
	private DesignacionAdministrativa secretaria;
	private DesignacionAdministrativa bibliotecario;


	@BeforeEach
	void setUp() {
		escuela = crearEscuela65Bernal();
		juanPerez = crearEmpleadoJuanPerez();
		mariaLopez = crearEmpleadoMariaLopez();
		carlosFernandez = crearEmpleadoCarlosFernandez();
		secretaria = crearDesignacionAdministrativa(2467832, RolEducativo.SECRETARIA);
		bibliotecario = crearDesignacionAdministrativa(2467838, RolEducativo.BIBLIOTECARIO);
		preceptoria = crearDesignacionAdministrativa(2467833, RolEducativo.PRECEPTORIA);
	}


	// Cubre una designación vacante por licencia con un suplente desde una fecha dentro del período de licencia.
	@Test
	void cubrirDesignacionConSuplente() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 1, 1);

		AsignacionTitular titular = new AsignacionTitular(juanPerez, fechaTomaPosesion);

		LocalDate inicioLicencia = LocalDate.of(2026, 1, 10);
		LocalDate finLicencia = LocalDate.of(2026, 1, 20);
		Periodo periodo = new Periodo(inicioLicencia, finLicencia);
		Licencia licenciaGuardada = empleadoService.crearLicencia(
				juanPerez.getId(),
				TipoLicencia.L_A1,
				periodo,
				"Licencia médica"
		);

		// sanity check
		assertEquals(EstadoDesignacion.LICENCIA, preceptoria.getEstadoEn(inicioLicencia));

		// Act
		LocalDate inicioSuplencia = LocalDate.of(2026, 1, 12);
		designacionService.cubrirConSuplentes(
				licenciaGuardada.getId(),
				mariaLopez.getId(),
				List.of(preceptoria.getId()),
				inicioSuplencia
		);

		// Assert

//		// Designacion
//		assertEquals(EstadoDesignacion.CUBIERTA, preceptoria.getEstadoEn(inicioSuplencia));
//		assertFalse(preceptoria.asignacionQueEjerceEn(inicioLicencia).isPresent());
//
//		// Asignacion
//		Asignacion asignacionSuplente = preceptoria.asignacionQueEjerceEn(inicioSuplencia).orElseThrow();
//
//		assertEquals(mariaLopez.getId(), asignacionSuplente.getEmpleadoEducativo().getId());
//		assertEquals(inicioSuplencia, asignacionSuplente.getFechaTomaPosesion());
//		assertEquals(finLicencia, asignacionSuplente.getFechaCese());
//
//		// Licencia
//		assertEquals(EstadoLicencia.CUBIERTA, licenciaGuardada.getEstadoEn(inicioSuplencia));
//
//		// EmpledoEducativo
//		assertTrue(mariaLopez.tieneAsignacionActivaEn(preceptoria, inicioSuplencia));
	}

// Cubre múltiples designaciones afectadas por una misma licencia usando un único suplente
//	@Test
//	void cubrirMultiplesDesignacionesConUnSuplente() {
//
//		// Arrange
//		LocalDate fechaTomaPosesion = LocalDate.of(2026, 1, 5);
//
//		preceptoria.cubrirConTitular(carlosFernandez, fechaTomaPosesion);
//		bibliotecario.cubrirConTitular(carlosFernandez, fechaTomaPosesion);
//
//		LocalDate inicioLicencia = LocalDate.of(2026, 1, 10);
//		LocalDate finLicencia = LocalDate.of(2026, 1, 23);
//		Licencia licenciaGuardada = empleadoService.crearLicencia(
//				carlosFernandez.getId(),
//				TipoLicencia.L_A1,
//				inicioLicencia,
//				finLicencia,
//				"Licencia"
//		);
//
//		// sanity check
//		assertEquals(EstadoDesignacion.VACANTE_POR_LICENCIA, secretaria.getEstadoEn(inicioLicencia));
//		assertEquals(EstadoDesignacion.VACANTE_POR_LICENCIA, bibliotecario.getEstadoEn(inicioLicencia));
//
//		// Act
//		LocalDate inicioSuplencia = LocalDate.of(2026, 1, 14);
//		designacionService.cubrirDesignacionesConSuplente(
//				licenciaGuardada.getId(),
//				juanPerez.getId(),
//				List.of(secretaria.getId(), bibliotecario.getId()),
//				inicioSuplencia
//
//		);
//
//		// Assert
//
//		// Designacion
//		assertEquals(EstadoDesignacion.VACANTE_POR_LICENCIA, secretaria.getEstadoEn(inicioLicencia));
//		assertEquals(EstadoDesignacion.CUBIERTA, secretaria.getEstadoEn(inicioSuplencia));
//		assertFalse(secretaria.asignacionQueEjerceEn(inicioLicencia).isPresent());
//
//		assertEquals(EstadoDesignacion.VACANTE_POR_LICENCIA, bibliotecario.getEstadoEn(inicioLicencia));
//		assertEquals(EstadoDesignacion.CUBIERTA, bibliotecario.getEstadoEn(inicioSuplencia));
//		assertFalse(bibliotecario.asignacionQueEjerceEn(inicioLicencia).isPresent());
//
//		// Asignacion
//		Asignacion suplenteSecretaria = secretaria.asignacionQueEjerceEn(inicioSuplencia).orElseThrow();
//		Asignacion suplenteBibliotecario = bibliotecario.asignacionQueEjerceEn(inicioSuplencia).orElseThrow();
//
//		assertEquals(juanPerez.getId(), suplenteSecretaria.getEmpleadoEducativo().getId());
//		assertEquals(inicioSuplencia, suplenteSecretaria.getFechaTomaPosesion());
//		assertEquals(finLicencia, suplenteSecretaria.getFechaCese());
//
//		assertEquals(juanPerez.getId(), suplenteBibliotecario.getEmpleadoEducativo().getId());
//		assertEquals(inicioSuplencia, suplenteBibliotecario.getFechaTomaPosesion());
//		assertEquals(finLicencia, suplenteBibliotecario.getFechaCese());
//
//		// Licencia
//		assertEquals(EstadoLicencia.CUBIERTA, licenciaGuardada.getEstadoEn(inicioSuplencia));

// EmpledoEducativo
//		assertTrue(juanPerez.tieneAsignacionActivaEn(secretaria, inicioSuplencia));
//		assertTrue(juanPerez.tieneAsignacionActivaEn(bibliotecario, inicioSuplencia));

//
//	@Test
//	void renovarLicenciaCopiaDesignacionesYEncadena() {
//
//		// Arrange
//		EmpleadoEducativo titularGuardado = crearTitular();
//
//		DesignacionAdministrativa designacionGuardada = crearDesignacionAdministrativa(2467834, RolEducativo.PRECEPTORIA);
//
//		LocalDate fechaTomaPosesion = LocalDate.of(2026, 1, 5);
//		LocalDate fechaCese = LocalDate.of(2026, 1, 20);
//
//		asignarDesignacionTitular(designacionGuardada, titularGuardado, fechaTomaPosesion, fechaCese);
//
//		LocalDate originalDesde = LocalDate.of(2026, 1, 10);
//		LocalDate originalHasta = LocalDate.of(2026, 1, 15);
//
//		Licencia original = empleadoEducativoService.crearLicencia(
//				titularGuardado.getId(),
//				TipoLicencia.L_A1,
//				originalDesde,
//				originalHasta,
//				"Licencia original"
//		);
//
//		// sanity check
//		assertEquals(EstadoDesignacion.VACANTE_POR_LICENCIA, designacionGuardada.getEstadoEn(originalDesde));
//
//		// Act — renovar
//		LocalDate renovadaDesde = LocalDate.of(2026, 1, 16);
//
//		Licencia renovada = licenciaService.renovarLicencia(
//				original.getId(),
//				TipoLicencia.L_A1,
//				renovadaDesde,
//				"Prórroga"
//		);
//
//		// Assert — encadenamiento
//		assertEquals(original.getId(), renovada.getLicenciaAnterior().getId());
//		assertEquals(renovada.getId(), original.getLicenciaSiguiente().getId());
//
//		// Assert — copia de designaciones
//		assertEquals(1, renovada.getDesignaciones().size());
//		assertTrue(renovada.getDesignaciones().contains(designacionGuardada));
//
//		// Assert — sigue en licencia en la nueva fecha
//		assertEquals(EstadoDesignacion.VACANTE_POR_LICENCIA, designacionGuardada.getEstadoEn(renovadaDesde));
//	}

//	@Test
//	void renovarLicenciaNoDecideCobertura() {
//
//		EmpleadoEducativo titular = crearTitular();
//		EmpleadoEducativo suplente = crearSuplente();
//
//		DesignacionAdministrativa designacion =
//				crearDesignacionAdministrativa(999, RolEducativo.PRECEPTORIA);
//
//		asignarDesignacionTitular(
//				designacion,
//				titular,
//				LocalDate.of(2026, 1, 5),
//				LocalDate.of(2026, 1, 25)
//		);
//
//		Licencia original = empleadoEducativoService.crearLicencia(
//				titular.getId(),
//				TipoLicencia.L_A1,
//				LocalDate.of(2026, 1, 10),
//				LocalDate.of(2026, 1, 15),
//				"Licencia original"
//		);
//
//		// se cubre la licencia original
//		designacionService.cubrirDesignacionesConSuplente(
//				original,
//				suplente,
//				List.of(designacion.getId())
//		);
//
//		// Act → renovar
//		Licencia renovada = empleadoEducativoService.renovarLicencia(
//				original.getId(),
//				TipoLicencia.L_A1,
//				LocalDate.of(2026, 1, 16),
//				"Renovación"
//		);
//
//		// Assert → NO hay decisión de cobertura
//		assertEquals(
//				EstadoDesignacion.VACANTE_POR_LICENCIA,
//				designacion.getEstadoEn(LocalDate.of(2026, 1, 16))
//		);
//
//		assertEquals(
//				EstadoLicencia.SIN_CUBRIR,
//				renovada.getEstadoEn(LocalDate.of(2026, 1, 16))
//		);
//	}
//
//	@Test
//	void decidirQueElSuplenteSigaCubriendoLuegoDeRenovar() {
//
//		EmpleadoEducativo titular = crearTitular();
//		EmpleadoEducativo suplente = crearSuplente();
//
//		DesignacionAdministrativa designacion =
//				crearDesignacionAdministrativa(999, RolEducativo.PRECEPTORIA);
//
//		asignarDesignacionTitular(
//				designacion,
//				titular,
//				LocalDate.of(2026, 1, 5),
//				LocalDate.of(2026, 1, 25)
//		);
//
//		Licencia original = empleadoEducativoService.crearLicencia(
//				titular.getId(),
//				TipoLicencia.L_A1,
//				LocalDate.of(2026, 1, 10),
//				LocalDate.of(2026, 1, 15),
//				"Licencia original"
//		);
//
//		designacionService.cubrirDesignacionesConSuplente(
//				original,
//				suplente,
//				List.of(designacion.getId())
//		);
//
//		// renovar
//		Licencia renovada = empleadoEducativoService.renovarLicencia(
//				original.getId(),
//				TipoLicencia.L_A1,
//				LocalDate.of(2026, 1, 16),
//				"Renovación"
//		);
//
//		// 👉 decisión explícita
//		designacionService.cubrirDesignacionesConSuplente(
//				renovada,
//				suplente,
//				List.of(designacion.getId())
//		);
//
//		// Assert
//		assertEquals(
//				EstadoDesignacion.CUBIERTA,
//				designacion.getEstadoEn(LocalDate.of(2026, 1, 16))
//		);
//
//		assertEquals(
//				EstadoLicencia.CUBIERTA,
//				renovada.getEstadoEn(LocalDate.of(2026, 1, 16))
//		);
//	}


// NEGATIVOS

//	@Test
//	void noSePuedeCubrirDesignacionNoAfectadaPorLicencia() {
//
//		// Arrange
//		EmpleadoEducativo titularGuardado = crearTitular();
//		EmpleadoEducativo suplenteGuardado = crearSuplente();
//
//		DesignacionAdministrativa designacionGuardada = crearDesignacionAdministrativa(2467834, RolEducativo.SECRETARIA);
//
//		// NO se asigna al titular → no está afectada
//
//		Licencia licenciaGuardada = empleadoService.crearLicencia(
//				titularGuardado.getId(),
//				TipoLicencia.L_A1,
//				LocalDate.of(2026, 1, 10),
//				LocalDate.of(2026, 1, 15),
//				"Licencia"
//		);
//
//		// Act + Assert
//		assertThrows(
//				DesignacionNoAfectadaPorLicenciaException.class,
//				() -> designacionService.cubrirDesignacionesConSuplente(
//						licenciaGuardada,
//						suplenteGuardado,
//						List.of(designacionGuardada.getId())
//				)
//		);
//	}

//	@Test
//	void noSePuedeRenovarDosVecesLaMismaLicencia() {
//
//		EmpleadoEducativo titularGuardado = crearTitular();
//		DesignacionAdministrativa designacionGuardada = crearDesignacionAdministrativa(123, RolEducativo.PRECEPTORIA);
//
//		LocalDate fechaTomaPosesion = LocalDate.of(2026, 1, 5);
//		LocalDate fechaCese = LocalDate.of(2026, 1, 20);
//		asignarDesignacionTitular(designacionGuardada, titularGuardado, fechaTomaPosesion, fechaCese);
//
//		Licencia originalGuardada = empleadoEducativoService.crearLicencia(
//				titularGuardado.getId(),
//				TipoLicencia.L_A1,
//				LocalDate.of(2026, 1, 10),
//				LocalDate.of(2026, 1, 15),
//				"Licencia original"
//		);
//
//		empleadoEducativoService.renovarLicencia(
//				originalGuardada.getId(),
//				TipoLicencia.L_A1,
//				LocalDate.of(2026, 1, 16),
//				"Primera renovación"
//		);
//
//		assertThrows(
//				LicenciaYaRenovadaException.class,
//				() -> empleadoEducativoService.renovarLicencia(
//						originalGuardada.getId(),
//						TipoLicencia.L_A1,
//						LocalDate.of(2026, 1, 21),
//						"Segunda renovación"
//				)
//		);
//	}
//
//	@Test
//	void noSePuedeRenovarConFechasSolapadas() {
//
//		EmpleadoEducativo titularGuardado = crearTitular();
//
//		Licencia originalGuardada = empleadoEducativoService.crearLicencia(
//				titularGuardado.getId(),
//				TipoLicencia.L_A1,
//				LocalDate.of(2026, 1, 10),
//				LocalDate.of(2026, 1, 15),
//				"Licencia original"
//		);
//
//		assertThrows(
//				RangoFechasLicenciaInvalidoException.class,
//				() -> empleadoEducativoService.renovarLicencia(
//						originalGuardada.getId(),
//						TipoLicencia.L_A1,
//						LocalDate.of(2026, 1, 14),
//						"Renovación inválida"
//				)
//		);
//	}

	//	@Test
//	void licenciaQuedaSinCubrirSiNoSeCubrenTodasLasDesignaciones() {
//
//		// Arrange
//		EmpleadoEducativo titular = crearTitular();
//		EmpleadoEducativo suplente = crearSuplente();
//
//		DesignacionAdministrativa d1 =
//				crearDesignacionAdministrativa(1, RolEducativo.PRECEPTORIA);
//		DesignacionAdministrativa d2 =
//				crearDesignacionAdministrativa(2, RolEducativo.PRECEPTORIA);
//
//		LocalDate asignacionDesde = LocalDate.of(2026, 1, 5);
//		LocalDate asignacionHasta = LocalDate.of(2026, 1, 25);
//
//		asignarDesignacionTitular(d1, titular, asignacionDesde, asignacionHasta);
//		asignarDesignacionTitular(d2, titular, asignacionDesde, asignacionHasta);
//
//		LocalDate licenciaDesde = LocalDate.of(2026, 1, 10);
//		LocalDate licenciaHasta = LocalDate.of(2026, 1, 15);
//
//		Licencia licencia = empleadoEducativoService.crearLicencia(
//				titular.getId(),
//				TipoLicencia.L_A1,
//				licenciaDesde,
//				licenciaHasta,
//				"Licencia con dos cargos"
//		);
//
//		// Act → se cubre SOLO una designación
//		designacionService.cubrirDesignacionesConSuplente(
//				licencia,
//				suplente,
//				List.of(d1.getId())
//		);
//
//		// Assert
//		assertEquals(
//				EstadoLicencia.SIN_CUBRIR,
//				licencia.getEstadoEn(licenciaDesde)
//		);
//	}
//
//	@Test
//	void noSePuedeCubrirDesignacionYaCubierta() {
//
//		// Arrange
//		EmpleadoEducativo titular = crearTitular();
//		EmpleadoEducativo suplente1 = crearSuplente();
//		EmpleadoEducativo suplente2 = crearOtroSuplente();
//
//		DesignacionAdministrativa designacion =
//				crearDesignacionAdministrativa(777, RolEducativo.PRECEPTORIA);
//
//		asignarDesignacionTitular(
//				designacion,
//				titular,
//				LocalDate.of(2026, 1, 5),
//				LocalDate.of(2026, 1, 25)
//		);
//
//		Licencia licencia = empleadoEducativoService.crearLicencia(
//				titular.getId(),
//				TipoLicencia.L_A1,
//				LocalDate.of(2026, 1, 10),
//				LocalDate.of(2026, 1, 15),
//				"Licencia"
//		);
//
//		// Primera cobertura (válida)
//		designacionService.cubrirDesignacionesConSuplente(
//				licencia,
//				suplente1,
//				List.of(designacion.getId())
//		);
//
//		// Act + Assert → intentar cubrir de nuevo
//		assertThrows(
//				DesignacionYaCubiertaException.class,
//				() -> designacionService.cubrirDesignacionesConSuplente(
//						licencia,
//						suplente2,
//						List.of(designacion.getId())
//				)
//		);
//	}
	private Escuela crearEscuela65Bernal() {
		return escuelaService.crear(new Escuela(
				"Escuela N°65",
				"Bernal",
				"Brown 5066",
				"42573309"
		));
	}

	private EmpleadoEducativo crearEmpleadoJuanPerez() {
		return empleadoEducativoService.crear(escuela.getId(), new EmpleadoEducativo(
				escuela,
				"20-34567891-2",
				"Juan",
				"Pérez",
				"Mitre 1450",
				"1162347890",
				LocalDate.of(1982, 6, 18),
				LocalDate.of(2008, 4, 1),
				"juan.perez@test.com"
		));
	}

	private EmpleadoEducativo crearEmpleadoMariaLopez() {
		return empleadoEducativoService.crear(escuela.getId(), new EmpleadoEducativo(
				escuela,
				"27-38945612-7",
				"María",
				"López",
				"Sarmiento 980",
				"1145983210",
				LocalDate.of(1989, 9, 3),
				LocalDate.of(2016, 3, 12),
				"maria.lopez@test.com"
		));
	}

	private EmpleadoEducativo crearEmpleadoCarlosFernandez() {
		return empleadoEducativoService.crear(escuela.getId(), new EmpleadoEducativo(
				escuela,
				"23-31278945-6",
				"Carlos",
				"Fernández",
				"Av. Calchaquí 3200",
				"1176540987",
				LocalDate.of(1975, 12, 21),
				LocalDate.of(2001, 8, 20),
				"carlos.fernandez@test.com"
		));
	}

	private DesignacionAdministrativa crearDesignacionAdministrativa(
			Integer cupof,
			RolEducativo rolEducativo
	) {
		return designacionService.crear(
				new DesignacionAdministrativa(escuela, cupof, rolEducativo)
		);
	}


}