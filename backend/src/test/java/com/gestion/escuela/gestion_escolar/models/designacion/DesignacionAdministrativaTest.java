package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.enums.*;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.DesignacionYaTieneTitularException;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionYaCubiertaException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Month;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Tests de Designación Administrativa")
class DesignacionAdministrativaTest {

	private Escuela escuela;
	private EmpleadoEducativo leguizamonMarina;
	private EmpleadoEducativo giardinoNoraRosa;
	private EmpleadoEducativo vallejosValeria;
	private DesignacionAdministrativa direccion2467830;
	private DesignacionAdministrativa auxiliar2330001;


	@BeforeEach
	void setUp() {
		escuela = crearEscuela65Bernal();

		leguizamonMarina = crearEmpleado(
				"27-22604033-7",
				"Marina",
				"Leguizamon",
				LocalDate.of(1971, Month.JANUARY, 22),
				LocalDate.of(2004, Month.JULY, 21)
		);

		giardinoNoraRosa = crearEmpleado(
				"27-14762038-7",
				"Nora Rosa",
				"Giardino",
				LocalDate.of(1961, Month.NOVEMBER, 10),
				LocalDate.of(1998, Month.MARCH, 1)
		);

		vallejosValeria = crearEmpleado(
				"27-33688860-9",
				"Nora Rosa",
				"Giardino",
				LocalDate.of(1988, Month.APRIL, 17),
				LocalDate.of(2024, Month.FEBRUARY, 24)
		);

		direccion2467830 = crearDesignacionAdministrativa(2467830, RolEducativo.DIRECCION);
		auxiliar2330001 = crearDesignacionAdministrativa(2330001, RolEducativo.AUXILIAR);
	}

	private EmpleadoEducativo crearEmpleado(
			String cuil,
			String nombre,
			String apellido,
			LocalDate nacimiento,
			LocalDate ingreso
	) {
		return new EmpleadoEducativo(
				escuela,
				cuil,
				nombre,
				apellido,
				" ",
				" ",
				nacimiento,
				ingreso,
				"test@gmail.com"
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

	private DesignacionAdministrativa crearDesignacionAdministrativa(
			Integer cupof,
			RolEducativo rolEducativo
	) {
		return new DesignacionAdministrativa(escuela, cupof, rolEducativo);
	}

	@Nested
	@DisplayName("Estado inicial")
	class EstadoInicial {

		@Test
		@DisplayName("Una designación sin asignaciones está vacante")
		void designacionSinAsignacionesEstaVacante() {
			assertEquals(
					EstadoDesignacion.VACANTE,
					direccion2467830.getEstadoEn(LocalDate.now())
			);
		}
	}

	@Nested
	@DisplayName("Cobertura con titular")
	class CoberturaTitular {

		@Test
		@DisplayName("Cuando hay titular activo la designación está cubierta")
		void titularActivoCubreDesignacion() {

			LocalDate fechaTomaPosesion = LocalDate.of(2004, Month.JULY, 21);

			auxiliar2330001.cubrirConTitular(leguizamonMarina, fechaTomaPosesion);

			assertEquals(EstadoDesignacion.CUBIERTA, auxiliar2330001.getEstadoEn(fechaTomaPosesion));
		}

		@Test
		@DisplayName("No se puede cubrir con segundo titular activo")
		void noPuedeHaberDosTitulares() {

			LocalDate fecha = LocalDate.of(2024, 3, 1);

			auxiliar2330001.cubrirConTitular(leguizamonMarina, fecha);

			assertThrows(
					DesignacionYaTieneTitularException.class,
					() -> auxiliar2330001.cubrirConTitular(vallejosValeria, fecha)
			);
		}
	}

	@Nested
	@DisplayName("Cobertura provisional")
	class CoberturaProvisional {

		@Test
		@DisplayName("Se puede cubrir con provisional cuando está vacante")
		void sePuedeCubrirConProvisional() {

			LocalDate fechaTomaPosesion = LocalDate.of(2017, Month.JUNE, 7);
			LocalDate fechaCese = LocalDate.of(2018, Month.FEBRUARY, 28);
			Periodo periodo = new Periodo(fechaTomaPosesion, fechaCese);

			direccion2467830.cubrirConProvisionalManual(giardinoNoraRosa, periodo);

			assertEquals(EstadoDesignacion.CUBIERTA, direccion2467830.getEstadoEn(fechaTomaPosesion));
		}

		@Test
		@DisplayName("No se puede cubrir con provisional si está cubierta")
		void noSePuedeCubrirSiYaEstaCubierta() {

			LocalDate fechaTomaPosesion = LocalDate.of(2017, Month.MARCH, 1);

			LocalDate fechaTomaPosesion2 = LocalDate.of(2017, Month.JUNE, 7);
			LocalDate fechaCese = LocalDate.of(2018, Month.FEBRUARY, 28);
			Periodo periodo = new Periodo(fechaTomaPosesion2, fechaCese);

			direccion2467830.cubrirConTitular(leguizamonMarina, fechaTomaPosesion);

			assertThrows(
					DesignacionYaCubiertaException.class,
					() -> direccion2467830.cubrirConProvisionalManual(
							giardinoNoraRosa,
							periodo
					)
			);
		}

		@Test
		@DisplayName("Cobertura automática genera período hasta último día hábil de febrero siguiente")
		void cubrirConProvisionalAutomaticoGeneraPeriodoCorrecto() {

			LocalDate inicio = LocalDate.of(2024, 3, 1);

			AsignacionProvisional asignacion =
					direccion2467830.cubrirConProvisionalAutomatico(
							giardinoNoraRosa,
							inicio
					);


			assertEquals(inicio, asignacion.getPeriodo().getFechaDesde());
		}

		@Test
		@DisplayName("No permite cobertura automática si ya está cubierta")
		void noPermiteCoberturaAutomaticaSiEstaCubierta() {

			LocalDate inicio = LocalDate.of(2024, 3, 1);

			direccion2467830.cubrirConTitular(
					leguizamonMarina,
					inicio
			);

			assertThrows(
					DesignacionYaCubiertaException.class,
					() -> direccion2467830.cubrirConProvisionalAutomatico(
							giardinoNoraRosa,
							inicio
					)
			);
		}
	}

	@Nested
	@DisplayName("Vacante por licencia")
	class Licencias {

		@Test
		@DisplayName("Cuando titular está de licencia la designación queda en estado LICENCIA")
		void titularEnLicencia() {

			LocalDate fechaTomaPosesion = LocalDate.of(2004, Month.JULY, 21);
			auxiliar2330001.cubrirConTitular(leguizamonMarina, fechaTomaPosesion);

			LocalDate fechaInicio = LocalDate.of(2025, Month.FEBRUARY, 24);
			LocalDate fechaFin = LocalDate.of(2026, Month.FEBRUARY, 4);
			Periodo periodo = new Periodo(fechaInicio, fechaFin);

			leguizamonMarina.crearLicencia(TipoLicencia.L_115D1, periodo, "Reposo", Set.of(auxiliar2330001));

			assertEquals(EstadoDesignacion.VACANTE, auxiliar2330001.getEstadoEn(fechaInicio));
		}
	}

	@Nested
	@DisplayName("Cobertura con suplente")
	class Suplencias {

//		@Test
//		@DisplayName("Se puede cubrir con suplente si la licencia afecta la designación")
//		void cubrirConSuplente() {
//
//			// Arrange
//			LocalDate fechaTomaPosesion = LocalDate.of(2004, Month.JULY, 21);
//			AsignacionTitular asignacionTitular = auxiliar2330001.cubrirConTitular(leguizamonMarina, fechaTomaPosesion);
//
//			LocalDate fechaInicio = LocalDate.of(2025, Month.FEBRUARY, 24);
//			LocalDate fechaFin = LocalDate.of(2026, Month.FEBRUARY, 4);
//			Periodo periodo = new Periodo(fechaInicio, fechaFin);
//
//			Licencia licencia = leguizamonMarina.crearLicencia(TipoLicencia.L_115D1, periodo, "Reposo", Set.of(auxiliar2330001));
//
//			// sanity check
//			assertEquals(EstadoDesignacion.VACANTE, auxiliar2330001.getEstadoEn(fechaInicio));
//
//			// Act
//			AsignacionSuplente asignacionSuplente = auxiliar2330001.cubrirConSuplente(licencia, vallejosValeria, fechaInicio);
//
//			// Assert
//			assertEquals(EstadoAsignacion.LICENCIA, asignacionTitular.getEstadoEn(fechaInicio));
//			assertEquals(EstadoAsignacion.ACTIVA, asignacionSuplente.getEstadoEn(fechaInicio));
//
//			assertEquals(EstadoDesignacion.CUBIERTA, auxiliar2330001.getEstadoEn(fechaInicio));
//
//
//		}
	}

	@Nested
	@DisplayName("Asignación que ejerce")
	class AsignacionQueEjerce {

		@Test
		@DisplayName("Si la fecha es null devuelve Optional vacío")
		void fechaNullDevuelveEmpty() {

			assertEquals(
					Optional.empty(),
					direccion2467830.asignacionQueEjerceEn(null)
			);
		}

	}

	@Nested
	@DisplayName("Renovación provisional")
	class RenovacionProvisional {

		@Test
		@DisplayName("Renovación automática debe iniciar el 1 de marzo y finalizar el último día hábil de febrero siguiente.")
		void renovarProvisionalAutomatica() {

			// Arrange
			LocalDate fechaInicio = LocalDate.of(2017, Month.JUNE, 7);
			LocalDate fechaFin = LocalDate.of(2018, Month.FEBRUARY, 28);
			Periodo periodo = new Periodo(fechaInicio, fechaFin);

			AsignacionProvisional anterior = direccion2467830.cubrirConProvisionalManual(giardinoNoraRosa, periodo);

			// Act
			AsignacionProvisional renovada = direccion2467830.renovarProvisionalAutomatica(anterior);

			// Assert
			assertNotNull(renovada);
			assertEquals(LocalDate.of(2018, Month.MARCH, 1), renovada.getPeriodo().getFechaDesde());
			assertEquals(LocalDate.of(2019, Month.FEBRUARY, 28), renovada.getPeriodo().getFechaHasta());
			assertEquals(giardinoNoraRosa, renovada.getEmpleadoEducativo());
			assertEquals(SituacionDeRevista.PROVISIONAL, renovada.getSituacionDeRevista());
		}

		@Test
		@DisplayName("Renovación desde marzo debe iniciar el 1 de marzo y respetar la fecha fin indicada")
		void renovarProvisionalDesdeMarzoConFechaFinManual() {

			// Arrange
			LocalDate fechaInicio = LocalDate.of(2017, Month.JUNE, 7);
			LocalDate fechaFin = LocalDate.of(2018, Month.FEBRUARY, 28);
			Periodo periodo = new Periodo(fechaInicio, fechaFin);

			AsignacionProvisional anterior = direccion2467830.cubrirConProvisionalManual(giardinoNoraRosa, periodo);

			LocalDate nuevaFechaFin = LocalDate.of(2018, Month.DECEMBER, 31);

			// Act
			AsignacionProvisional renovada = direccion2467830.renovarProvisionalDesdeMarzo(anterior, nuevaFechaFin);

			// Assert
			assertNotNull(renovada);
			assertEquals(LocalDate.of(2018, Month.MARCH, 1), renovada.getPeriodo().getFechaDesde());
			assertEquals(nuevaFechaFin, renovada.getPeriodo().getFechaHasta());
			assertEquals(giardinoNoraRosa, renovada.getEmpleadoEducativo());
			assertEquals(SituacionDeRevista.PROVISIONAL, renovada.getSituacionDeRevista());
		}

		@Test
		@DisplayName("Renovación manual debe respetar las fechas indicadas cuando no hay superposición")
		void renovarProvisionalManual() {

			// Arrange
			LocalDate fechaInicio = LocalDate.of(2017, Month.JUNE, 7);
			LocalDate fechaFin = LocalDate.of(2018, Month.FEBRUARY, 28);
			Periodo periodo = new Periodo(fechaInicio, fechaFin);

			AsignacionProvisional anterior =
					direccion2467830.cubrirConProvisionalManual(giardinoNoraRosa, periodo);

			Periodo nuevoPeriodo = new Periodo(
					LocalDate.of(2018, Month.MARCH, 1),
					LocalDate.of(2018, Month.NOVEMBER, 30)
			);

			// Act
			AsignacionProvisional renovada = direccion2467830.renovarProvisionalManual(anterior, nuevoPeriodo);

			// Assert
			assertNotNull(renovada);
			assertEquals(nuevoPeriodo, renovada.getPeriodo());
			assertEquals(giardinoNoraRosa, renovada.getEmpleadoEducativo());
		}

	}

	@Nested
	@DisplayName("Superposición de asignaciones")
	class Superposicion {

//		@Test
//		@DisplayName("No permite superposición en misma fecha inicio")
//		void noPermiteSuperposicionMismaFecha() {
//
//			LocalDate fecha = LocalDate.of(2024, 3, 1);
//
//			direccion2467830.cubrirConTitular(leguizamonMarina, fecha);
//
//			Periodo periodo = new Periodo(
//					LocalDate.of(2024, 2, 28),
//					LocalDate.of(2025, 2, 28)
//			);
//
//			assertThrows(
//					DesignacionYaCubiertaException.class,
//					() -> direccion2467830.cubrirConProvisionalManual(
//							vallejosValeria,
//							periodo
//					)
//			);
//		}

	}

	@Nested
	@DisplayName("Asociación con escuela")
	class AsociacionEscuela {

		@Test
		@DisplayName("No permite asignar escuela null")
		void noPermiteAsignarEscuelaNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> direccion2467830.asignarEscuela(null)
			);
		}

		@Test
		@DisplayName("Permite reasignar escuela")
		void permiteAsignarNuevaEscuela() {

			Escuela nuevaEscuela = new Escuela(
					"Escuela N°10",
					"Quilmes",
					"Calle Falsa 123",
					"12345678"
			);

			direccion2467830.asignarEscuela(nuevaEscuela);

			assertEquals(nuevaEscuela, direccion2467830.getEscuela());
		}

	}

	@Nested
	@DisplayName("Franjas horarias")
	class FranjasHorarias {

		@Test
		@DisplayName("No permite agregar franja null")
		void noPermiteAgregarFranjaNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> direccion2467830.agregarFranjaHoraria(null)
			);
		}

		@Test
		@DisplayName("Agrega franja y asigna la designación correctamente")
		void agregarFranjaAsignaDesignacion() {

			FranjaHoraria franja = new FranjaHoraria(
					DiaDeSemana.LUNES,
					LocalTime.of(8, 0),
					LocalTime.of(10, 0)
			);

			direccion2467830.agregarFranjaHoraria(franja);

			assertTrue(direccion2467830.getFranjasHorarias().contains(franja));

		}

		@Nested
		@DisplayName("toString")
		class ToStringTests {

			@Test
			@DisplayName("toString contiene datos principales")
			void toStringContieneDatosClave() {

				String texto = direccion2467830.toString();

				assertTrue(texto.contains("DesignacionAdministrativa"));
				assertTrue(texto.contains("cupof = 2467830"));
				assertTrue(texto.contains("rolEducativo"));
			}

		}
	}

	@Nested
	@DisplayName("notificarBajaDefinitivaDe")
	class NotificarBajaDefinitiva {

		private LocalDate fecha;

		@BeforeEach
		void setUp() {
			fecha = LocalDate.of(2026, Month.MARCH, 10);
		}

//		@Test
//		@DisplayName("Si genera vacante y hay suplente activo se convierte en provisional")
//		void convierteSuplenteEnProvisional() {
//
//			// Arrange
//			LocalDate fechaTomaPosesion = LocalDate.of(2004, Month.JULY, 21);
//
//			AsignacionTitular titular =
//					auxiliar2330001.cubrirConTitular(
//							leguizamonMarina,
//							fechaTomaPosesion
//					);
//
//			assertEquals(EstadoDesignacion.CUBIERTA, auxiliar2330001.getEstadoEn(fechaTomaPosesion));
//			assertEquals(EstadoAsignacion.ACTIVA, titular.getEstadoEn(fechaTomaPosesion));
//
//			// 2️⃣ Licencia del titular que habilita suplente
//			LocalDate fechaInicio = LocalDate.of(2026, Month.MARCH, 1);
//			LocalDate fechaFin = LocalDate.of(2026, Month.JULY, 31);
//			Periodo periodoLicencia = new Periodo(fechaInicio, fechaFin);
//
//			Licencia licencia = leguizamonMarina.crearLicencia(
//					TipoLicencia.L_115D1,
//					periodoLicencia,
//					null,
//					Set.of(auxiliar2330001)
//			);
//
//			assertEquals(EstadoDesignacion.VACANTE, auxiliar2330001.getEstadoEn(fechaInicio));
//			assertEquals(EstadoAsignacion.LICENCIA, titular.getEstadoEn(fechaInicio));
//
//			AsignacionSuplente suplente = auxiliar2330001.cubrirConSuplente(licencia, vallejosValeria, periodoLicencia.getFechaDesde());
//
//			assertEquals(EstadoDesignacion.CUBIERTA, auxiliar2330001.getEstadoEn(fechaInicio));
//			assertEquals(EstadoAsignacion.ACTIVA, suplente.getEstadoEn(fechaInicio));
//
//			// Act
//			LocalDate fechaBaja = LocalDate.of(2026, Month.MAY, 10);
//			titular.finalizarPorBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);
//
//		}

		@Test
		@DisplayName("Se genera vacante en la designación porque no hay suplente activo.")
		void generaVacantePeroNoHaySuplenteActivo() {

			// Arrange
			LocalDate fechaTomaPosesion = LocalDate.of(2004, Month.JULY, 21);

			AsignacionTitular titular =
					auxiliar2330001.cubrirConTitular(
							leguizamonMarina,
							fechaTomaPosesion
					);

			assertEquals(EstadoDesignacion.CUBIERTA, auxiliar2330001.getEstadoEn(fechaTomaPosesion));
			assertEquals(EstadoAsignacion.ACTIVA, titular.getEstadoEn(fechaTomaPosesion));

			// Act
			LocalDate fechaBaja = LocalDate.of(2026, Month.MAY, 10);
			auxiliar2330001.notificarBajaDefinitivaDe(titular, fechaBaja);

			// Assert
			assertEquals(EstadoDesignacion.CUBIERTA, auxiliar2330001.getEstadoEn(fechaTomaPosesion));
			assertEquals(EstadoAsignacion.ACTIVA, titular.getEstadoEn(fechaTomaPosesion));

		}

		@Test
		@DisplayName("El Provisional no genera vacante.")
		void noGeneraVacanteNoHaceNada() {

			// Arrange
			LocalDate fechaTomaPosesion = LocalDate.of(2017, Month.JUNE, 7);
			LocalDate fechaCese = LocalDate.of(2018, Month.FEBRUARY, 28);
			Periodo periodo = new Periodo(fechaTomaPosesion, fechaCese);

			AsignacionProvisional provisional = direccion2467830.cubrirConProvisionalManual(giardinoNoraRosa, periodo);

			assertEquals(EstadoDesignacion.CUBIERTA, direccion2467830.getEstadoEn(fechaTomaPosesion));
			assertEquals(EstadoAsignacion.ACTIVA, provisional.getEstadoEn(fechaTomaPosesion));

			// Act
			LocalDate fechaBaja = LocalDate.of(2017, Month.SEPTEMBER, 10);
			auxiliar2330001.notificarBajaDefinitivaDe(provisional, fechaBaja);

			// Assert
			assertEquals(EstadoDesignacion.CUBIERTA, direccion2467830.getEstadoEn(fechaTomaPosesion));
			assertEquals(EstadoAsignacion.ACTIVA, provisional.getEstadoEn(fechaTomaPosesion));

		}

		@Test
		@DisplayName("Si genera vacante pero no hay suplente no hace nada")
		void noHaceNadaSiNoHaySuplente() {

			// Arrange
			AsignacionTitular titular =
					auxiliar2330001.cubrirConTitular(
							leguizamonMarina,
							LocalDate.of(2004, Month.JULY, 21)
					);

			// Act & Assert
			assertDoesNotThrow(() -> auxiliar2330001.notificarBajaDefinitivaDe(titular, fecha));

			// sigue sin nadie provisional
			assertEquals(EstadoDesignacion.CUBIERTA, auxiliar2330001.getEstadoEn(fecha));
		}
	}

}
