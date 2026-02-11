package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.enums.*;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionNoAfectadaPorLicenciaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionYaCubiertaException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class DesignacionAdministrativaTest {

	private Escuela escuela;
	private EmpleadoEducativo juanPerez;
	private EmpleadoEducativo mariaLopez;
	private DesignacionAdministrativa secretaria;
	private DesignacionAdministrativa preceptoria;

	@BeforeEach
	void setUp() {
		escuela = crearEscuela65Bernal();
		juanPerez = crearEmpleadoJuanPerez();
		mariaLopez = crearEmpleadoMariaLopez();
		secretaria = crearDesignacionAdministrativa(2467832, RolEducativo.SECRETARIA);
		preceptoria = crearDesignacionAdministrativa(2467833, RolEducativo.PRECEPTORIA);
	}

	@Test
	void unaDesignacionSinAsignacionesEstaVacante() {

		// Assert
		assertEquals(EstadoDesignacion.VACANTE, secretaria.getEstadoEn(LocalDate.now()));
	}

	@Test
	void cuandoHayAsignacionQueEjerceLaDesignacionEstaCubierta() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 1, 10);
		secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);

		// Assert
		assertEquals(EstadoDesignacion.CUBIERTA, secretaria.getEstadoEn(fechaTomaPosesion)
		);
	}

	@Test
	void cuandoTitularEstaDeLicenciaYNoHaySuplenteEstaVacantePorLicencia() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);

		secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);

		LocalDate fechaInicio = LocalDate.of(2026, 3, 10);
		LocalDate fechaFin = LocalDate.of(2026, 3, 20);
		Periodo periodo = new Periodo(fechaInicio, fechaFin);
		juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, "Reposo");


		// Assert
		assertEquals(EstadoDesignacion.LICENCIA, secretaria.getEstadoEn(fechaInicio));
	}

	@Test
	void sePuedeCubrirConProvisionalCuandoEstaVacante() {
		LocalDate fechaInicio = LocalDate.of(2026, 2, 10);

		preceptoria.cubrirConProvisional(juanPerez, fechaInicio);

		assertEquals(EstadoDesignacion.CUBIERTA, preceptoria.getEstadoEn(fechaInicio));
	}

	@Test
	void laAsignacionProvisionalFinalizaElPrimeroDeMarzo() {
		LocalDate fechaInicio = LocalDate.of(2026, 2, 10);

		preceptoria.cubrirConProvisional(juanPerez, fechaInicio);

		AsignacionProvisional asignacionProvisional = (AsignacionProvisional) preceptoria.asignacionQueEjerceEn(fechaInicio).orElseThrow();

		assertEquals(LocalDate.of(2026, 3, 1), asignacionProvisional.getPeriodo().getFechaHasta());
	}

	@Test
	void laAsignacionProvisionalFinalizaElPrimeroDeMarzoDelAnioQueViene() {
		LocalDate fechaInicio = LocalDate.of(2026, 3, 1);

		preceptoria.cubrirConProvisional(juanPerez, fechaInicio);

		AsignacionProvisional asignacionProvisional = (AsignacionProvisional) preceptoria.asignacionQueEjerceEn(fechaInicio).orElseThrow();

		assertEquals(LocalDate.of(2027, 3, 1), asignacionProvisional.getPeriodo().getFechaHasta());
	}

	@Test
	void noSePuedeCubrirConProvisionalSiLaDesignacionEstaCubierta() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);

		secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);

		// Act + Assert
		assertThrows(
				DesignacionYaCubiertaException.class,
				() -> secretaria.cubrirConProvisional(
						mariaLopez,
						fechaTomaPosesion.plusDays(5)
				)
		);
	}

	@Test
	void cuandoTitularTieneBajaDefinitivaElSuplentePasaAProvisional() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);

		LocalDate fechaBaja = LocalDate.of(2026, 3, 15);

		secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);

		juanPerez.darDeBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);

		// Act
		LocalDate fechaInicio = LocalDate.of(2026, 3, 20);
		secretaria.cubrirConProvisional(mariaLopez, fechaInicio);

		// Assert

		// Asignacion
		Asignacion asignacionQueEjerce = secretaria.asignacionQueEjerceEn(fechaInicio).orElseThrow();

		assertInstanceOf(AsignacionProvisional.class, asignacionQueEjerce);
		assertEquals(mariaLopez, asignacionQueEjerce.getEmpleadoEducativo());
		assertEquals(LocalDate.of(2027, 3, 1), asignacionQueEjerce.getPeriodo().getFechaHasta());

		// Designacion
		assertEquals(EstadoDesignacion.CUBIERTA, secretaria.getEstadoEn(fechaInicio));

	}

	@Test
	void cuandoHayVacantePorLicenciaSePuedeCubrirConSuplente() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);
		AsignacionTitular asignacionTitular = secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);

		LocalDate inicioLicencia = LocalDate.of(2026, 3, 10);
		LocalDate finLicencia = LocalDate.of(2026, 3, 30);
		Periodo periodo = new Periodo(inicioLicencia, finLicencia);
		Licencia licencia =
				juanPerez.crearLicencia(
						TipoLicencia.L_A1,
						periodo,
						"Reposo"
				);

		// Act
		LocalDate inicioSuplencia = LocalDate.of(2026, 3, 15);
		AsignacionSuplente asignacionSuplente = secretaria.cubrirConSuplente(
				licencia,
				mariaLopez,
				inicioSuplencia
		);

		// Assert
		assertEquals(EstadoAsignacion.LICENCIA, asignacionTitular.getEstadoEn(inicioSuplencia));
		assertEquals(EstadoAsignacion.ACTIVA, asignacionSuplente.getEstadoEn(inicioSuplencia));
		assertEquals(EstadoDesignacion.CUBIERTA, secretaria.getEstadoEn(inicioSuplencia));


	}

	@Test
	void noSePuedeCubrirSiLaLicenciaNoAfectaLaDesignacion() {

		// Arrange
		Licencia licencia =
				juanPerez.crearLicencia(
						TipoLicencia.L_A1,
						new Periodo(LocalDate.of(2026, 3, 10),
								LocalDate.of(2026, 3, 20)),
						"Reposo"
				);

		// Act + Assert
		assertThrows(
				DesignacionNoAfectadaPorLicenciaException.class,
				() -> secretaria.cubrirConSuplente(
						licencia,
						mariaLopez,
						LocalDate.of(2026, 3, 15)
				)
		);
	}

	@Test
	void darDeBajaDefinitivaTitularSinSuplenteDejaDesignacionVacante() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);
		LocalDate fechaBaja = LocalDate.of(2026, 3, 10);

		AsignacionTitular asignacionTitular = preceptoria.cubrirConTitular(juanPerez, fechaTomaPosesion);

		// Precondiciones
		assertEquals(EstadoAsignacion.ACTIVA, asignacionTitular.getEstadoEn(fechaBaja));
		assertEquals(EstadoDesignacion.CUBIERTA, preceptoria.getEstadoEn(fechaBaja));

		// Act
		juanPerez.darDeBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);

		// Assert

		assertEquals(EstadoAsignacion.BAJA, asignacionTitular.getEstadoEn(fechaBaja));
		assertEquals(EstadoDesignacion.VACANTE, secretaria.getEstadoEn(fechaBaja));
	}

	@Test
	void darDeBajaDefinitivaTitularEnLicenciaSinSuplenteDejaDesignacionVacante() {
		// GIVEN

		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);
		AsignacionTitular asignacionTitular = secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);


		// Licencia activa del titular
		LocalDate inicioLicencia = LocalDate.of(2026, 3, 8);
		LocalDate finLicencia = LocalDate.of(2026, 3, 20);
		Periodo periodo = new Periodo(inicioLicencia, finLicencia);
		juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, "Reposo medico");

		LocalDate fechaBaja = LocalDate.of(2026, 3, 15);

		// Precondiciones

		// El titular está en licencia → no ejerce
		assertEquals(EstadoAsignacion.LICENCIA, asignacionTitular.getEstadoEn(fechaBaja));

		assertEquals(EstadoDesignacion.LICENCIA, secretaria.getEstadoEn(fechaBaja));

		// WHEN
		juanPerez.darDeBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);

		// THEN

		// La asignación titular queda dada de baja
		assertEquals(EstadoAsignacion.BAJA, asignacionTitular.getEstadoEn(fechaBaja));

		// La designación queda vacante
		assertEquals(EstadoDesignacion.VACANTE, secretaria.getEstadoEn(fechaBaja));
	}

	@Test
	void darDeBajaDefinitivaProvisionalDejaDesignacionVacante() {
		// given

		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 4);

		preceptoria.cubrirConProvisional(juanPerez, fechaTomaPosesion);

		LocalDate fechaBaja = LocalDate.of(2026, 4, 15);

		// sanity
		assertEquals(EstadoDesignacion.CUBIERTA, preceptoria.getEstadoEn(fechaBaja));

		// Act
		juanPerez.darDeBajaDefinitiva(CausaBaja.FALLECIMIENTO, fechaBaja);

		// Assert
		AsignacionProvisional asignacionProvisional = (AsignacionProvisional) preceptoria.getAsignaciones().get(0);
		assertEquals(EstadoAsignacion.BAJA, asignacionProvisional.getEstadoEn(fechaBaja.plusDays(1)));
		assertEquals(LocalDate.of(2027, 3, 1), asignacionProvisional.getPeriodo().getFechaHasta());

		assertEquals(EstadoDesignacion.VACANTE, preceptoria.getEstadoEn(fechaBaja));

	}

	@Test
	void darDeBajaDefinitivaTitularEnLicenciaConSuplenteActivoCreaAsignacionProvisional() {

		// Arrange
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);

		// Titular
		AsignacionTitular asignacionTitular = preceptoria.cubrirConTitular(juanPerez, fechaTomaPosesion);

		// Licencia del titular
		LocalDate inicioLicencia = LocalDate.of(2026, 3, 10);
		LocalDate finLicencia = LocalDate.of(2026, 3, 25);
		Periodo periodo = new Periodo(inicioLicencia, finLicencia);
		Licencia licencia = juanPerez.crearLicencia(
				TipoLicencia.L_A1,
				periodo,
				"Reposo medico"
		);

		// Cubrir la designación por licencia → crea SUPLENTE
		LocalDate inicioSuplencia = LocalDate.of(2026, 3, 13);
		preceptoria.cubrirConSuplente(licencia, mariaLopez, inicioSuplencia);

		// Obtener la asignación SUPLENTE creada
		AsignacionSuplente asignacionSuplente =
				(AsignacionSuplente) preceptoria.getAsignaciones().stream()
						.filter(a -> a.getSituacionDeRevista() == SituacionDeRevista.SUPLENTE)
						.findFirst()
						.orElseThrow();

		// Precondiciones
		LocalDate fechaBaja = LocalDate.of(2026, 3, 20);
		assertEquals(EstadoDesignacion.CUBIERTA, preceptoria.getEstadoEn(fechaBaja));

		assertEquals(SituacionDeRevista.SUPLENTE, asignacionSuplente.getSituacionDeRevista());

		assertEquals(EstadoAsignacion.ACTIVA, asignacionSuplente.getEstadoEn(fechaBaja));

		// Act
		juanPerez.darDeBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);

		// Assert

		// 1️⃣ El titular queda dado de baja
		assertEquals(EstadoAsignacion.BAJA, asignacionTitular.getEstadoEn(fechaBaja));

		// 2️⃣ La asignación SUPLENTE original queda dada de baja
		assertEquals(EstadoAsignacion.BAJA, asignacionSuplente.getEstadoEn(fechaBaja));

		// 3️⃣ Existe una NUEVA asignación PROVISIONAL activa
		AsignacionProvisional asignacionProvisional =
				(AsignacionProvisional) preceptoria.getAsignaciones().stream()
						.filter(a -> a.getSituacionDeRevista() == SituacionDeRevista.PROVISIONAL)
						.findFirst()
						.orElseThrow();

		assertEquals(EstadoAsignacion.ACTIVA, asignacionProvisional.getEstadoEn(fechaBaja));
		assertEquals(LocalDate.of(2027, 3, 1), asignacionProvisional.getPeriodo().getFechaHasta());
		assertEquals(mariaLopez, asignacionProvisional.getEmpleadoEducativo());

		// 5️⃣ La designación sigue cubierta
		assertEquals(EstadoDesignacion.CUBIERTA, preceptoria.getEstadoEn(fechaBaja));
	}

	@Test
	void unaVacantePorRenunciaDeTitularSoloSePuedeCubrirConProvisional() {

		// Setup
		LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);

		AsignacionTitular asignacionTitular = preceptoria.cubrirConTitular(juanPerez, fechaTomaPosesion);


		LocalDate fechaBaja = LocalDate.of(2026, 3, 20);
		juanPerez.darDeBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);

		assertEquals(EstadoDesignacion.VACANTE, preceptoria.getEstadoEn(fechaBaja));

		// Exercise
		LocalDate fechaIncio = LocalDate.of(2026, 3, 25);
		preceptoria.cubrirConProvisional(mariaLopez, fechaIncio);

		// Assert
		assertEquals(EstadoAsignacion.BAJA, asignacionTitular.getEstadoEn(fechaBaja));
		assertEquals(EstadoDesignacion.CUBIERTA, preceptoria.getEstadoEn(fechaIncio));

		Asignacion asignacionActiva = preceptoria.asignacionQueEjerceEn(fechaIncio).orElseThrow();
		assertEquals(SituacionDeRevista.PROVISIONAL, asignacionActiva.getSituacionDeRevista());

		assertEquals(mariaLopez, asignacionActiva.getEmpleadoEducativo());

	}

	@Test
	void siTitularRenunciaDuranteLicenciaElSuplentePasaAProvisional() {

		// Setup
		LocalDate tomaPosesion = LocalDate.of(2026, 3, 1);

		AsignacionTitular asignacionTitular = preceptoria.cubrirConTitular(juanPerez, tomaPosesion);

		// Titular pide licencia
		LocalDate inicioLicencia = LocalDate.of(2026, 3, 15);
		LocalDate finLicencia = LocalDate.of(2026, 3, 25);
		Periodo periodo = new Periodo(inicioLicencia, finLicencia);
		Licencia licencia = juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, "Reposo");

		LocalDate inicioSuplencia = LocalDate.of(2026, 3, 16);
		preceptoria.cubrirConSuplente(licencia, mariaLopez, inicioSuplencia);

		assertEquals(EstadoAsignacion.LICENCIA, asignacionTitular.getEstadoEn(inicioLicencia));
		assertEquals(EstadoDesignacion.CUBIERTA, preceptoria.getEstadoEn(inicioSuplencia));

		// Act
		LocalDate fechaRenuncia = LocalDate.of(2026, 3, 20);
		juanPerez.darDeBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaRenuncia);

		// Assert — la designación sigue cubierta
		assertEquals(EstadoDesignacion.CUBIERTA, preceptoria.getEstadoEn(fechaRenuncia.plusDays(1))
		);

		Asignacion asignacionActual = preceptoria.asignacionQueEjerceEn(fechaRenuncia.plusDays(1)).orElseThrow();

		assertEquals(SituacionDeRevista.PROVISIONAL, asignacionActual.getSituacionDeRevista());
		assertEquals(LocalDate.of(2027, 3, 1), asignacionActual.getPeriodo().getFechaHasta());

		assertEquals(mariaLopez, asignacionActual.getEmpleadoEducativo());

		// Assert — la suplencia fue dada de baja
		assertTrue(
				preceptoria.getAsignaciones().stream()
						.filter(a -> a.getSituacionDeRevista() == SituacionDeRevista.SUPLENTE)
						.allMatch(a -> a.getEstadoEn(fechaRenuncia.plusDays(1))
								== EstadoAsignacion.BAJA)
		);
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

	private EmpleadoEducativo crearEmpleadoMariaLopez() {
		return new EmpleadoEducativo(
				escuela,
				"27-38945612-7",
				"María",
				"López",
				"Sarmiento 980",
				"1145983210",
				LocalDate.of(1989, 9, 3),
				LocalDate.of(2016, 3, 12),
				"maria.lopez@test.com"
		);
	}

	private DesignacionAdministrativa crearDesignacionAdministrativa(
			Integer cupof,
			RolEducativo rolEducativo
	) {
		return new DesignacionAdministrativa(escuela, cupof, rolEducativo);
	}

}
