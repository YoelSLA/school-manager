package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.enums.*;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmpleadoEnLicenciaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.LicenciaSuperpuestaException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class EmpleadoEducativoTest {

	private Escuela escuela;

	private DesignacionAdministrativa preceptoria;
	private DesignacionAdministrativa secretaria;

	private EmpleadoEducativo juanPerez;

	@BeforeEach
	void setUp() {
		escuela = crearEscuela65Bernal();

		secretaria = crearDesignacionAdministrativa(2467832, RolEducativo.SECRETARIA);
		preceptoria = crearDesignacionAdministrativa(2467833, RolEducativo.PRECEPTORIA);

		juanPerez = crearEmpleadoJuanPerez();
	}

	// -------------------------------------------------------------------------
	// CONSTRUCTOR
	// -------------------------------------------------------------------------

	@Test
	void empleadoSeCreaActivoPorDefecto() {
		assertTrue(juanPerez.isActivo());
	}

	@Test
	void noSePuedeCrearEmpleadoSinEscuela() {
		assertThrows(
				CampoObligatorioException.class,
				() -> new EmpleadoEducativo(
						null,
						"20-11111111-1",
						"Juan",
						"Pérez",
						"Mitre 123",
						"1111111111",
						LocalDate.of(1980, 1, 1),
						LocalDate.of(2000, 1, 1),
						"test@test.com"
				)
		);
	}

	@Test
	void noSePuedeCrearEmpleadoConFechaIngresoAnteriorANacimiento() {
		assertThrows(
				RangoFechasInvalidoException.class,
				() -> new EmpleadoEducativo(
						escuela,
						"20-11111111-1",
						"Juan",
						"Pérez",
						"Mitre 123",
						"1111111111",
						LocalDate.of(2000, 1, 1),
						LocalDate.of(1990, 1, 1),
						"test@test.com"
				)
		);
	}

	// -------------------------------------------------------------------------
	// CREAR LICENCIA
	// -------------------------------------------------------------------------

	@Test
	void crearLicenciaAsociaEmpleado() {
		Licencia licencia = juanPerez.crearLicencia(
				TipoLicencia.L_A1,
				new Periodo(LocalDate.of(2026, 3, 10),
						LocalDate.of(2026, 3, 20)),
				"Reposo"
		);

		assertEquals(juanPerez, licencia.getEmpleadoEducativo());
	}

	@Test
	void noSePuedeCrearLicenciaSuperpuesta() {
		juanPerez.crearLicencia(
				TipoLicencia.L_A1,
				new Periodo(LocalDate.of(2026, 3, 10),
						LocalDate.of(2026, 3, 20)),
				"Reposo"
		);

		assertThrows(
				LicenciaSuperpuestaException.class,
				() -> juanPerez.crearLicencia(
						TipoLicencia.L_A1,
						new Periodo(LocalDate.of(2026, 3, 15),
								LocalDate.of(2026, 3, 25)),
						"Reposo"
				)
		);
	}

	@Test
	void crearLicenciaAfectaDesignacionesVigentes() {
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);

		preceptoria.cubrirConTitular(juanPerez, fechaTomaPosesion);

		Licencia licencia = juanPerez.crearLicencia(
				TipoLicencia.L_A1,
				new Periodo(LocalDate.of(2026, 3, 10),
						LocalDate.of(2026, 3, 20)),
				"Reposo"
		);

		Set<Designacion> afectadas =
				juanPerez.designacionesAfectadasPor(licencia);

		assertTrue(afectadas.contains(preceptoria));
	}

	// -------------------------------------------------------------------------
	// BAJA DEFINITIVA
	// -------------------------------------------------------------------------

	@Test
	void darDeBajaDefinitivaEmpleadoSinAsignacionesLoDejaInactivo() {
		// Arrange
		assertTrue(juanPerez.isActivo());

		// Act
		juanPerez.darDeBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, LocalDate.now());

		// Assert
		assertFalse(juanPerez.isActivo());
	}

	@Test
	void darDeBajaDefinitivaEmpleadoConAsignacionActivaFinalizaLaAsignacion() {
		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);

		AsignacionTitular asignacionTitular = preceptoria.cubrirConTitular(juanPerez, fechaTomaPosesion);


		LocalDate fechaBaja = LocalDate.of(2026, 3, 25);
		assertEquals(EstadoAsignacion.ACTIVA, asignacionTitular.getEstadoEn(fechaBaja));

		// Act
		juanPerez.darDeBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);

		// Assert

		assertEquals(EstadoAsignacion.BAJA, asignacionTitular.getEstadoEn(fechaBaja));
		assertEquals(fechaBaja, asignacionTitular.getFechaBaja());
		assertEquals(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, asignacionTitular.getCausaBaja());

		assertFalse(juanPerez.isActivo());

	}

	@Test
	void darDeBajaDefinitivaEmpleadoConMultiplesAsignacionesVigentesFinalizaTodas() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);

		AsignacionTitular asignacionTitular1 = secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);
		AsignacionTitular asignacionTitular2 = preceptoria.cubrirConTitular(juanPerez, fechaTomaPosesion);

		LocalDate fechaBaja = LocalDate.of(2026, 3, 25);

		// Sanity check
		assertEquals(EstadoAsignacion.ACTIVA, asignacionTitular1.getEstadoEn(fechaBaja));
		assertEquals(EstadoAsignacion.ACTIVA, asignacionTitular2.getEstadoEn(fechaBaja));

		// Act
		juanPerez.darDeBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);

		// THEN
		assertFalse(juanPerez.isActivo());

		assertEquals(EstadoAsignacion.BAJA, asignacionTitular1.getEstadoEn(fechaBaja));
		assertEquals(EstadoAsignacion.BAJA, asignacionTitular2.getEstadoEn(fechaBaja));

		assertEquals(fechaBaja, asignacionTitular1.getFechaBaja());
		assertEquals(fechaBaja, asignacionTitular2.getFechaBaja());

		assertEquals(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, asignacionTitular1.getCausaBaja());
		assertEquals(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, asignacionTitular2.getCausaBaja());
	}

	// -------------------------------------------------------------------------
	// AGREGAR ASIGNACION
	// -------------------------------------------------------------------------

	@Test
	void agregarAsignacionAsociaEmpleadoCorrectamente() {

		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);
		AsignacionTitular asignacionTitular = secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);

		assertEquals(juanPerez, asignacionTitular.getEmpleadoEducativo());
	}

	@Test
	void noSePuedeCubrirOtraDesignacionConEmpleadoEnLicencia() {
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);
		AsignacionTitular asignacionTitular = secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);

		assertEquals(EstadoAsignacion.ACTIVA, asignacionTitular.getEstadoEn(fechaTomaPosesion));
		assertEquals(EstadoDesignacion.CUBIERTA, secretaria.getEstadoEn(fechaTomaPosesion));

		LocalDate inicioLicencia = LocalDate.of(2026, 3, 10);
		LocalDate finLicencia = LocalDate.of(2026, 3, 20);
		Periodo periodo = new Periodo(inicioLicencia, finLicencia);
		juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, null);

		assertEquals(EstadoAsignacion.LICENCIA, asignacionTitular.getEstadoEn(inicioLicencia));
		assertEquals(EstadoDesignacion.LICENCIA, secretaria.getEstadoEn(inicioLicencia));

		assertThrows(EmpleadoEnLicenciaException.class, () -> preceptoria.cubrirConTitular(juanPerez, inicioLicencia));
	}

	@Test
	void empleadoConLicenciaNoPuedeValidarTomaDePosesion() {

		juanPerez.crearLicencia(
				TipoLicencia.L_A1,
				new Periodo(LocalDate.of(2026, 3, 10),
						LocalDate.of(2026, 3, 20)),
				null
		);

		assertThrows(
				EmpleadoEnLicenciaException.class,
				() -> juanPerez.validarPuedeTomarPosesionEn(LocalDate.of(2026, 3, 15))
		);
	}


	// HELPERS

	private Escuela crearEscuela65Bernal() {
		return new Escuela(
				"Escuela N°65",
				"Bernal",
				"Brown 5066",
				"42573309"
		);
	}

	private EmpleadoEducativo crearEmpleadoJuanPerez() {
		return new EmpleadoEducativo(
				escuela,
				"20-34567891-2",
				"Juan",
				"Pérez",
				"Mitre 1450",
				"1162347890",
				LocalDate.of(1982, 6, 18),
				LocalDate.of(2008, 4, 1),
				"juan.perez@test.com"
		);
	}

	private DesignacionAdministrativa crearDesignacionAdministrativa(
			Integer cupof,
			RolEducativo rolEducativo
	) {
		return new DesignacionAdministrativa(escuela, cupof, rolEducativo);
	}

}