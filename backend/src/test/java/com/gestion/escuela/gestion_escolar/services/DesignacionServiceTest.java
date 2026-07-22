package com.gestion.escuela.gestion_escolar.services;

import static java.time.Month.MARCH;
import static org.assertj.core.api.Assertions.assertThat;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.services.curso.CursoService;
import com.gestion.escuela.gestion_escolar.services.designacion.DesignacionCommandService;
import com.gestion.escuela.gestion_escolar.services.designacion.DesignacionQueryService;
import com.gestion.escuela.gestion_escolar.services.empleadoEducativo.EmpleadoEducativoService;
import com.gestion.escuela.gestion_escolar.services.escuela.EscuelaService;
import com.gestion.escuela.gestion_escolar.services.licencia.LicenciaService;
import com.gestion.escuela.gestion_escolar.services.materia.MateriaService;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class DesignacionServiceTest extends DomainServiceFixtureTest {

  @Autowired private DesignacionCommandService designacionCommandService;

  @Autowired private DesignacionQueryService designacionQueryService;

  @Autowired private EmpleadoEducativoService empleadoService;

  @Autowired private LicenciaService licenciaService;

  @Autowired private EscuelaService escuelaService;

  @Autowired private EmpleadoEducativoService empleadoEducativoService;

  @Autowired private MateriaService materiaService;

  @Autowired private CursoService cursoService;

  private Escuela escuelaN65P;
  private EmpleadoEducativo giardinoNoraP;
  private EmpleadoEducativo billordoTomasaP;
  private EmpleadoEducativo marchettiRomanP;
  private DesignacionCurso plg2467775P;

  @BeforeEach
  void setUp() {
    escuelaN65P = escuelaService.crear(escuelaN65M);
    giardinoNoraP = empleadoEducativoService.crear(escuelaN65P.getId(), giardinoNoraRosaM);
    billordoTomasaP = empleadoEducativoService.crear(escuelaN65P.getId(), billordoTomasaM);
    marchettiRomanP = empleadoEducativoService.crear(escuelaN65P.getId(), marchettiRomanM);

    materiaService.crear(escuelaN65P.getId(), practicasDelLenguajeM);
    cursoService.crear(escuelaN65P.getId(), a1g1M);
    plg2467775P = designacionCommandService.crear(plg2467775M);
  }

  @Test
  void x() {
    LocalDate fechaTomaPosesion = LocalDate.of(2026, MARCH, 1);

    designacionCommandService.cubrirConTitular(
        plg2467775P.getId(), giardinoNoraP.getId(), fechaTomaPosesion, 1);

    LocalDate fechaConsultada = LocalDate.of(2026, MARCH, 1);

    assertThat(designacionQueryService.obtenerEstadoEn(plg2467775P.getId(), fechaConsultada))
        .isEqualTo(EstadoDesignacion.CUBIERTA);

    designacionQueryService
        .obtenerCargoActivo(plg2467775P.getId(), fechaConsultada)
        .ifPresent(
            asignacion -> {
              assertThat(asignacion.getEmpleadoEducativo().getId())
                  .isEqualTo(giardinoNoraP.getId());
              assertThat(asignacion.getPeriodo().getFechaDesde()).isEqualTo(fechaTomaPosesion);
            });
  }

  //	// Cubre una designación vacante por licencia con un suplente desde una fecha dentro del
  // período de licencia.
  //	@Test
  //	void cubrirDesignacionConSuplente() {
  //
  //		// Arrange
  //		LocalDate fechaTomaPosesion = LocalDate.of(2026, 1, 1);
  //
  //		preceptoria.cubrirConTitular(juanPerez, fechaTomaPosesion);
  //
  //		LocalDate inicioLicencia = LocalDate.of(2026, 1, 10);
  //		LocalDate finLicencia = LocalDate.of(2026, 1, 20);
  //		Periodo periodo = new Periodo(inicioLicencia, finLicencia);
  //		Licencia licenciaGuardada = empleadoService.crearLicencia(
  //				juanPerez.getId(),
  //				TipoLicencia.L_A1,
  //				periodo,
  //				"Licencia médica"
  //		);
  //
  //		// Act
  //		LocalDate inicioSuplencia = LocalDate.of(2026, 1, 12);
  //		designacionService.cubrirConSuplentes(
  //				licenciaGuardada.getId(),
  //				mariaLopez.getId(),
  //				List.of(preceptoria.getId()),
  //				inicioSuplencia
  //		);
  //
  //		// Assert
  //
  //		// Designacion
  //		assertEquals(EstadoDesignacion.CUBIERTA, preceptoria.getEstadoEn(inicioSuplencia));
  //		assertFalse(preceptoria.asignacionQueEjerceEn(inicioLicencia).isPresent());
  //
  //		// Asignacion
  //		Asignacion asignacionSuplente =
  // preceptoria.asignacionQueEjerceEn(inicioSuplencia).orElseThrow();
  //
  //		assertEquals(mariaLopez.getId(), asignacionSuplente.getEmpleadoEducativo().getId());
  //		assertEquals(inicioSuplencia, asignacionSuplente.getPeriodo().getFechaDesde());
  //		assertEquals(finLicencia, asignacionSuplente.getPeriodo().getFechaHasta());
  //
  //		// Licencia
  //		assertEquals(EstadoLicencia.CUBIERTA, licenciaGuardada.getEstadoEn(inicioSuplencia));
  //	}

  // Cubre múltiples designacion afectadas por una misma licencia usando un único suplente
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
  //		assertEquals(EstadoDesignacion.VACANTE_POR_LICENCIA,
  // bibliotecario.getEstadoEn(inicioLicencia));
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
  //		assertEquals(EstadoDesignacion.VACANTE_POR_LICENCIA,
  // bibliotecario.getEstadoEn(inicioLicencia));
  //		assertEquals(EstadoDesignacion.CUBIERTA, bibliotecario.getEstadoEn(inicioSuplencia));
  //		assertFalse(bibliotecario.asignacionQueEjerceEn(inicioLicencia).isPresent());
  //
  //		// Asignacion
  //		Asignacion suplenteSecretaria =
  // secretaria.asignacionQueEjerceEn(inicioSuplencia).orElseThrow();
  //		Asignacion suplenteBibliotecario =
  // bibliotecario.asignacionQueEjerceEn(inicioSuplencia).orElseThrow();
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
  //		DesignacionAdministrativa designacionGuardada = crearDesignacionAdministrativa(2467834,
  // RolEducativo.PRECEPTORIA);
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
  //		assertEquals(EstadoDesignacion.VACANTE_POR_LICENCIA,
  // designacionGuardada.getEstadoEn(originalDesde));
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
  //		// Assert — copia de designacion
  //		assertEquals(1, renovada.getDesignaciones().size());
  //		assertTrue(renovada.getDesignaciones().contains(designacionGuardada));
  //
  //		// Assert — sigue en licencia en la nueva fecha
  //		assertEquals(EstadoDesignacion.VACANTE_POR_LICENCIA,
  // designacionGuardada.getEstadoEn(renovadaDesde));
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
  //		DesignacionAdministrativa designacionGuardada = crearDesignacionAdministrativa(2467834,
  // RolEducativo.SECRETARIA);
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
  //		DesignacionAdministrativa designacionGuardada = crearDesignacionAdministrativa(123,
  // RolEducativo.PRECEPTORIA);
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
