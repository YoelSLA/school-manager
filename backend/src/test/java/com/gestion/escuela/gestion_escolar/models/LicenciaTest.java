package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.LicenciaSinEmpleadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class LicenciaTest {

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

	@Nested
	class Creacion {

		private Periodo periodo;

		@BeforeEach
		void setUp() {
			LocalDate fechaInicio = LocalDate.of(2026, 3, 1);
			LocalDate fechaFin = LocalDate.of(2026, 3, 15);
			periodo = new Periodo(fechaInicio, fechaFin);
		}

		@Test
		void seCreaLicenciaValidaConDescripcionNula() {

			Licencia licencia = new Licencia(TipoLicencia.L_A1, periodo, null);

			assertAll(
					() -> assertEquals(TipoLicencia.L_A1, licencia.getTipoLicencia()),
					() -> assertEquals(11, licencia.dias()),
					() -> assertNull(licencia.getDescripcion())
			);
		}

		@Test
		void noSePuedeCrearLicenciaConFechasInvalidas() {
			assertThrows(RangoFechasInvalidoException.class, () ->
					new Licencia(
							TipoLicencia.L_A1,
							new Periodo(LocalDate.of(2026, 2, 1),
									LocalDate.of(2026, 1, 1)),
							null
					)
			);
		}

	}

	@Nested
	class VigenciaYEstado {

		private Periodo periodo;

		@BeforeEach
		void setUp() {
			LocalDate fechaInicio = LocalDate.of(2026, 3, 1);
			LocalDate fechaFin = LocalDate.of(2026, 3, 15);
			periodo = new Periodo(fechaInicio, fechaFin);
		}

		@Test
		void licenciaFueraDeRangoNoEstaVigente() {
			Licencia licencia = new Licencia(TipoLicencia.L_A1, periodo, null);

			assertEquals(EstadoLicencia.DESCUBIERTA, licencia.getEstadoEn(LocalDate.of(2026, 2, 27)));
		}

		@Test
		void licenciaVigenteSinDesignacionesEstaCubierta() {
			Licencia licencia = new Licencia(TipoLicencia.L_A1, periodo, null);

			assertEquals(EstadoLicencia.CUBIERTA, licencia.getEstadoEn(LocalDate.of(2026, 3, 5)));
		}
	}

	@Nested
	class Superposicion {

		@Test
		void seSuperponeConRangoQueIntersecta() {
			Licencia licencia = new Licencia(
					TipoLicencia.L_A1,
					new Periodo(LocalDate.of(2026, 1, 10),
							LocalDate.of(2026, 1, 20)),
					null
			);

			assertTrue(
					licencia.seSuperponeCon(
							new Periodo(LocalDate.of(2026, 1, 15),
									LocalDate.of(2026, 1, 25))
					)
			);
		}

		@Test
		void noSeSuperponeConRangoAnterior() {
			Licencia licencia = new Licencia(
					TipoLicencia.L_A1,
					new Periodo(LocalDate.of(2026, 1, 10),
							LocalDate.of(2026, 1, 20)),
					null
			);

			assertFalse(
					licencia.seSuperponeCon(
							new Periodo(LocalDate.of(2026, 1, 1),
									LocalDate.of(2026, 1, 9))
					)
			);
		}

		@Test
		void noSePermiteSuperposicionConRangoInvalido() {
			Licencia licencia = new Licencia(
					TipoLicencia.L_A1,
					new Periodo(LocalDate.of(2026, 1, 10),
							LocalDate.of(2026, 1, 20)),
					null
			);

			assertThrows(RangoFechasInvalidoException.class, () ->
					licencia.seSuperponeCon(
							new Periodo(LocalDate.of(2026, 2, 1),
									LocalDate.of(2026, 1, 1))
					)
			);
		}
	}

	@Nested
	class DesignacionesAfectadas {

		@Test
		void inicializaDesignacionesAfectadasAlCrearLicencia() {
			// Asignaciones del empleado
			LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);

			secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);
			preceptoria.cubrirConTitular(juanPerez, fechaTomaPosesion);

			LocalDate fechaInicio = LocalDate.of(2026, 3, 10);
			LocalDate fechaFin = LocalDate.of(2026, 3, 20);
			Periodo periodo = new Periodo(fechaInicio, fechaFin);
			Licencia licencia = juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, null);

			licencia.inicializarDesignacionesAfectadas();

			assertEquals(2, licencia.getDesignaciones().size());
			assertTrue(licencia.getDesignaciones().contains(secretaria));
			assertTrue(licencia.getDesignaciones().contains(preceptoria));
		}

		@Test
		void noSePuedeInicializarDesignacionesSinEmpleado() {
			Licencia licencia = new Licencia(TipoLicencia.L_A1, mock(Periodo.class), null);

			assertThrows(LicenciaSinEmpleadoException.class, licencia::inicializarDesignacionesAfectadas);
		}

		@Test
		void licenciaAfectaDesignacionCuandoHayAsignacionYEstaVigente() {
			LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);

			secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);

			LocalDate fechaInicio = LocalDate.of(2026, 3, 10);
			LocalDate fechaFin = LocalDate.of(2026, 3, 20);
			Periodo periodo = new Periodo(fechaInicio, fechaFin);
			Licencia licencia = juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, null);

			licencia.inicializarDesignacionesAfectadas();

			assertTrue(
					licencia.afectaDesignacion(
							secretaria,
							LocalDate.of(2026, 3, 15)
					)
			);
		}

		@Test
		void nuevasAsignacionesNoAfectanLicenciaYaCreada() {
			LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);

			secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);

			LocalDate fechaInicio = LocalDate.of(2026, 3, 10);
			LocalDate fechaFin = LocalDate.of(2026, 3, 20);
			Periodo periodo = new Periodo(fechaInicio, fechaFin);
			Licencia licencia = juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, null);

			licencia.inicializarDesignacionesAfectadas();

			// Nueva asignación DESPUÉS
			preceptoria.cubrirConTitular(juanPerez, fechaTomaPosesion);

			assertEquals(1, licencia.getDesignaciones().size());
			assertTrue(licencia.getDesignaciones().contains(secretaria));
			assertFalse(licencia.getDesignaciones().contains(preceptoria));
		}

	}

	@Nested
	class Renovacion {

		@Test
		void renovarCreaNuevaLicenciaEncadenadaYCopiaDesignaciones() {

			LocalDate fechaTomaPosesion = LocalDate.of(2026, 3, 1);

			secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);

			LocalDate inicioLicencia = LocalDate.of(2026, 3, 10);
			LocalDate finLicencia = LocalDate.of(2026, 3, 20);
			Periodo periodo = new Periodo(inicioLicencia, finLicencia);
			Licencia original = juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, null);

			LocalDate finLicenciaRenovada = LocalDate.of(2026, 4, 10);
			Licencia renovada = original.renovar(
					TipoLicencia.L_A1,
					finLicenciaRenovada,
					"Renovación"
			);

			assertEquals(original, renovada.getLicenciaAnterior());
			assertEquals(renovada, original.getLicenciaSiguiente());
			assertEquals(finLicencia.plusDays(1), renovada.getPeriodo().getFechaDesde());
			assertEquals(finLicenciaRenovada, renovada.getPeriodo().getFechaHasta());
			assertEquals(1, renovada.getDesignaciones().size());
			assertTrue(renovada.getDesignaciones().contains(secretaria));
		}
	}

	@Nested
	class CadenaDeLicencias {

		@Test
		void cadenaCompleta_desdeRenovacionDevuelveTodaLaCadena() {

			// Arrange
			LocalDate fechaInicio = LocalDate.of(2026, 3, 1);
			LocalDate fechaFin = LocalDate.of(2026, 3, 15);
			Periodo periodo = new Periodo(fechaInicio, fechaFin);
			Licencia original = juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, null);

			original.asignarEmpleadoEducativo(juanPerez);

			LocalDate fechaFinRenovacion1 = LocalDate.of(2026, 3, 30);
			Licencia renovacion1 = original.renovar(TipoLicencia.L_115E1, fechaFinRenovacion1, null);

			LocalDate fechaFinRenovacion2 = LocalDate.of(2026, 4, 15);
			Licencia renovacion2 = renovacion1.renovar(TipoLicencia.L_115E3, fechaFinRenovacion2, null);

			// Act
			List<Licencia> cadena = renovacion2.cadenaCompleta();

			// Assert
			assertEquals(List.of(original, renovacion1, renovacion2), cadena);

		}

		@Test
		void cadenaCompleta_desdeOriginalDevuelveSoloElla() {

			// Arrange
			LocalDate fechaInicio = LocalDate.of(2026, 3, 1);
			LocalDate fechaFin = LocalDate.of(2026, 3, 15);
			Periodo periodo = new Periodo(fechaInicio, fechaFin);
			Licencia original = juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, null);

			original.asignarEmpleadoEducativo(juanPerez);

			// Act
			List<Licencia> cadena = original.cadenaCompleta();

			// Assert
			assertEquals(List.of(original), cadena);
		}

		@Test
		void cadenaCompleta_desdeLicenciaIntermediaDevuelveTodaLaCadena() {

			// Arrange

			LocalDate fechaInicio = LocalDate.of(2026, 3, 1);
			LocalDate fechaFin = LocalDate.of(2026, 3, 15);
			Periodo periodo = new Periodo(fechaInicio, fechaFin);
			Licencia original = juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, null);

			original.asignarEmpleadoEducativo(juanPerez);

			Licencia renovacion1 =
					original.renovar(TipoLicencia.L_115E1,
							LocalDate.of(2026, 3, 30),
							null);

			Licencia renovacion2 =
					renovacion1.renovar(TipoLicencia.L_115E3,
							LocalDate.of(2026, 4, 15),
							null);

			// Act
			List<Licencia> cadena = renovacion1.cadenaCompleta();

			// Assert
			assertEquals(
					List.of(original, renovacion1, renovacion2),
					cadena
			);
		}
	}


}
