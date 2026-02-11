package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion.CaracteristicaAsignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionYaAsociadaADesignacionException;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionYaDadaDeBajaException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class AsignacionTitularTest {

	private Escuela escuela;
	private EmpleadoEducativo juanPerez;
	private DesignacionAdministrativa secretaria;
	private DesignacionAdministrativa preceptoria;

	@BeforeEach
	void setUp() {
		escuela = crearEscuela65Bernal();
		juanPerez = crearEmpleadoJuanPerez();
		secretaria = crearDesignacionAdministrativa(2467832, RolEducativo.SECRETARIA);
		preceptoria = crearDesignacionAdministrativa(2467833, RolEducativo.PRECEPTORIA);
	}

	@Test
	void seCreaAsignacionTitularConEmpleadoYFecha() {
		LocalDate inicio = LocalDate.of(2026, 1, 1);

		AsignacionTitular asignacionTitular = new AsignacionTitular(juanPerez, inicio);

		assertEquals(inicio, asignacionTitular.getPeriodo().getFechaDesde());
		assertFalse(asignacionTitular.estaDadaDeBajaEn(inicio));
	}

	@Test
	void noSePuedeCrearAsignacionSinEmpleado() {
		assertThrows(
				CampoObligatorioException.class,
				() -> new AsignacionTitular(null, LocalDate.now())
		);
	}

	@Test
	void noSePuedeCrearAsignacionSinFechaTomaPosesion() {
		assertThrows(
				CampoObligatorioException.class,
				() -> new AsignacionTitular(juanPerez, null)
		);
	}

	@Test
	void sePuedeAsociarADesignacion() {
		AsignacionTitular asignacionTitular = new AsignacionTitular(juanPerez, LocalDate.now());

		asignacionTitular.asignarADesignacion(secretaria);

		assertEquals(secretaria, asignacionTitular.getDesignacion());
	}

	@Test
	void noSePuedeAsociarDosVecesADesignacion() {
		AsignacionTitular asignacionTitular = new AsignacionTitular(juanPerez, LocalDate.now());

		asignacionTitular.asignarADesignacion(secretaria);

		assertThrows(
				AsignacionYaAsociadaADesignacionException.class,
				() -> asignacionTitular.asignarADesignacion(preceptoria)
		);
	}

	@Test
	void alDarDeBajaLaAsignacionQuedaDadaDeBaja() {
		// Arrange
		AsignacionTitular asignacionTitular = new AsignacionTitular(juanPerez, LocalDate.now());
		asignacionTitular.asignarADesignacion(secretaria);

		// Act
		LocalDate fechaBaja = LocalDate.of(2026, 1, 10);
		asignacionTitular.finalizarPorBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);

		// Assert
		assertTrue(asignacionTitular.estaDadaDeBajaEn(fechaBaja));
		assertEquals(EstadoAsignacion.BAJA, asignacionTitular.getEstadoEn(fechaBaja));
		assertEquals(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, asignacionTitular.getCausaBaja());
	}

	@Test
	void noSePuedeDarDeBajaDosVeces() {

		// Arrange
		AsignacionTitular asignacionTitular = new AsignacionTitular(juanPerez, LocalDate.now());
		asignacionTitular.asignarADesignacion(secretaria);

		LocalDate fechaBaja = LocalDate.of(2026, 1, 10);
		asignacionTitular.finalizarPorBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);

		// Act + Assert
		assertThrows(
				AsignacionYaDadaDeBajaException.class,
				() -> asignacionTitular.finalizarPorBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja)
		);
	}

	@Test
	void asignacionVigenteDentroDelPeriodo() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 1, 1);
		AsignacionTitular asignacionTitular = new AsignacionTitular(juanPerez, fechaTomaPosesion);
		asignacionTitular.asignarADesignacion(secretaria);

		// Assert
		assertEquals(EstadoAsignacion.ACTIVA, asignacionTitular.getEstadoEn(fechaTomaPosesion));
	}

	@Test
	void asignacionEnLicencia() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);
		AsignacionTitular asignacionTitular = new AsignacionTitular(juanPerez, fechaTomaPosesion);
		asignacionTitular.asignarADesignacion(secretaria);

		LocalDate fechaInicio = LocalDate.of(2026, 3, 10);
		LocalDate fechaFin = LocalDate.of(2026, 3, 20);
		Periodo periodo = new Periodo(fechaInicio, fechaFin);
		juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, "Reposo medico");

		// Assert
		assertEquals(EstadoAsignacion.LICENCIA, asignacionTitular.getEstadoEn(fechaInicio));
	}

	@Test
	void cubreDesignacionCuandoEstaVigenteYSinLicencia() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);
		AsignacionTitular asignacionTitular = new AsignacionTitular(juanPerez, fechaTomaPosesion);
		asignacionTitular.asignarADesignacion(secretaria);

		// Assert
		assertTrue(asignacionTitular.cubreDesignacionEn(fechaTomaPosesion));
	}

	@Test
	void noCubreDesignacionSiEstaEnLicencia() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);
		AsignacionTitular asignacionTitular = new AsignacionTitular(juanPerez, fechaTomaPosesion);
		asignacionTitular.asignarADesignacion(secretaria);

		LocalDate fechaInicio = LocalDate.of(2026, 3, 10);
		LocalDate fechaFin = LocalDate.of(2026, 3, 20);
		Periodo periodo = new Periodo(fechaInicio, fechaFin);
		juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, "Reposo medico");

		// Assert
		assertFalse(asignacionTitular.cubreDesignacionEn(fechaInicio));
	}

	@Test
	void generaVacantePorLicencia() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);
		AsignacionTitular asignacionTitular = new AsignacionTitular(juanPerez, fechaTomaPosesion);
		asignacionTitular.asignarADesignacion(secretaria);

		LocalDate fechaInicio = LocalDate.of(2026, 3, 10);
		LocalDate fechaFin = LocalDate.of(2026, 3, 20);
		Periodo periodo = new Periodo(fechaInicio, fechaFin);
		juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, "Reposo medico");

		// Assert
		assertTrue(asignacionTitular.generaVacantePorLicenciaEn(fechaInicio));
	}

	@Test
	void sePuedeAplicarCaracteristica() {

		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);
		AsignacionTitular asignacionTitular = new AsignacionTitular(juanPerez, fechaTomaPosesion);
		asignacionTitular.asignarADesignacion(secretaria);

		CaracteristicaAsignacion caracteristica = mock(CaracteristicaAsignacion.class);

		asignacionTitular.aplicarCaracteristica(caracteristica);

		verify(caracteristica).validarAplicacion(asignacionTitular);
		verify(caracteristica).alAsignarse(asignacionTitular);
	}


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


