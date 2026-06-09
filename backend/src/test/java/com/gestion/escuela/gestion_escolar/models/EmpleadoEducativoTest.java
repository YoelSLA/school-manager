package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.CuilInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmailInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionNoActivaDelEmpleadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo.EmpleadoInactivoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.LicenciaSuperpuestaException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

import static com.gestion.escuela.gestion_escolar.models.Periodo.cerrado;
import static java.time.Month.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;

class EmpleadoEducativoTest extends DomainTestFixture {



	@Nested
	@DisplayName("Creación de empleadoEducativoBasico")
	class Creacion {

		private EmpleadoEducativo.Builder builderValido() {
			return EmpleadoEducativo.builder()
					.escuela(mock(Escuela.class))
					.cuil("27-14762038-7")
					.nombre("Nora Rosa")
					.apellido("Giardino")
					.domicilio("Calle Falsa 123")
					.telefono("1122334455")
					.email("mail@test.com")
					.fechaDeNacimiento(LocalDate.of(1990, JANUARY, 12));
		}

		@Test
		@DisplayName("Debe crear empleadoEducativoBasico válido")
		void creaEmpleadoValido() {

			LocalDate fechaNacimiento = LocalDate.of(1990, JANUARY, 12);
			EmpleadoEducativo empleado = builderValido().build();
			assertThat(empleado).isNotNull();
			assertThat(empleado.isActivo()).isTrue();
			assertThat(empleado.getCuil()).isEqualTo("27-14762038-7");
			assertThat(empleado.getNombre()).isEqualTo("Nora Rosa");
			assertThat(empleado.getApellido()).isEqualTo("Giardino");
			assertThat(empleado.getDomicilio()).isEqualTo("Calle Falsa 123");
			assertThat(empleado.getTelefono()).isEqualTo("1122334455");
			assertThat(empleado.getEmail()).isEqualTo("mail@test.com");
			assertThat(empleado.getFechaDeNacimiento()).isEqualTo(fechaNacimiento);
			assertThat(empleado.getAsignaciones()).isEmpty();
			assertThat(empleado.getLicencias()).isEmpty();
		}

		@Test
		@DisplayName("Debe fallar si escuela es null")
		void fallaSiEscuelaEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> builderValido()
							.escuela(null)
							.build()
			);
		}

		@ParameterizedTest(name = "Debe fallar con cuil = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el cuil es null, vacío o solo espacios")
		void fallaSiCuilInvalido(String cuilInvalido) {

			assertThrows(
					CampoObligatorioException.class,
					() -> builderValido()
							.cuil(cuilInvalido)
							.build()
			);
		}

		@ParameterizedTest(name = "CUIL inválido: {0}")
		@ValueSource(strings = {
				"20-1234567-9",
				"2-12345678-9",
				"20-12345678-99",
				"AA-12345678-9",
				"20-12345678-A",
				"2012345678A",
				"123",
				"20_12345678_9"
		})
		@DisplayName("Debe fallar si el CUIL no cumple el formato válido")
		void fallaSiCuilFormatoInvalido(String cuilInvalido) {

			assertThrows(
					CuilInvalidoException.class,
					() -> builderValido()
							.cuil(cuilInvalido)
							.build()
			);
		}

		@ParameterizedTest(name = "Debe fallar con nombre = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el nombre es null, vacío o solo espacios")
		void fallaSiNombreInvalido(String nombreInvalido) {

			assertThrows(
					CampoObligatorioException.class,
					() -> builderValido()
							.nombre(nombreInvalido)
							.build()
			);
		}

		@ParameterizedTest(name = "Debe fallar con apellido = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el apellido es null, vacío o solo espacios")
		void fallaSiApellidoInvalido(String apellidoInvalido) {

			assertThrows(
					CampoObligatorioException.class,
					() -> builderValido()
							.apellido(apellidoInvalido)
							.build()
			);
		}

		@ParameterizedTest(name = "Debe fallar con email = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el email es null, vacío o solo espacios")
		void fallaSiEmailBlank(String emailInvalido) {

			assertThrows(
					CampoObligatorioException.class,
					() -> builderValido()
							.email(emailInvalido)
							.build()
			);
		}

		@ParameterizedTest(name = "Debe fallar con email inválido = {0}")
		@ValueSource(strings = {
				"nora",
				"nora@",
				"@mail.com",
				"nora@mail",
				"nora@mail.",
				"noramail.com"
		})
		@DisplayName("Debe fallar si el email no cumple el formato válido")
		void fallaSiEmailFormatoInvalido(String emailInvalido) {

			assertThrows(
					EmailInvalidoException.class,
					() -> builderValido()
							.email(emailInvalido)
							.build()
			);
		}

		@Test
		@DisplayName("Debe fallar si fecha de nacimiento es null")
		void fallaSiFechaNacimientoEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> builderValido()
							.fechaDeNacimiento(null)
							.build()
			);
		}

		@Test
		@DisplayName("Debe fallar si la fecha de ingreso es anterior a la fecha de nacimiento")
		void fallaSiFechaIngresoEsAnteriorANacimiento() {

			assertThrows(
					RangoFechasInvalidoException.class,
					() -> builderValido()
							.fechaDeNacimiento(LocalDate.of(1990, JANUARY, 1))
							.fechaDeIngreso(LocalDate.of(1980, JANUARY, 1))
							.build()
			);
		}

		@Test
		@DisplayName("Debe permitir fecha de ingreso null")
		void permiteIngresoNull() {

			EmpleadoEducativo empleado = builderValido()
					.fechaDeIngreso(null)
					.build();

			assertThat(empleado).isNotNull();
		}
	}

	@Nested
	@DisplayName("Licencias del empleadoEducativoBasico")
	class Licencias {

		@Test
		void seCreaUnaLicenciaCorrectamente() {
			// Arrange
			LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);
			Asignacion titular = plg2467775.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);

			// Act
			LocalDate fechaInicioLicencia = LocalDate.of(2026, MARCH, 1);
			LocalDate fechaFinLicencia = LocalDate.of(2026, MARCH, 15);
			Periodo unPeriodo = cerrado(fechaInicioLicencia, fechaFinLicencia);

			Licencia licencia = giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					unPeriodo,
					"Reposo médico",
					Set.of(plg2467775)
			);

			// Assert
			// Antes de cubrir con el titular.
			assertThat(plg2467775.getEstadoEn(fechaTomaPosesion.minusDays(1)))
					.isEqualTo(EstadoDesignacion.VACANTE);
			// Despues de cubrir con el titular.
			assertThat(titular.getEstadoEn(fechaTomaPosesion)).isEqualTo(EstadoAsignacion.ACTIVA);
			assertThat(plg2467775.getEstadoEn(fechaTomaPosesion)).isEqualTo(EstadoDesignacion.CUBIERTA);
			// Al inciar la licencia.
			assertThat(titular.getEstadoEn(fechaInicioLicencia)).isEqualTo(EstadoAsignacion.LICENCIA);
			assertThat(plg2467775.getEstadoEn(fechaInicioLicencia)).isEqualTo(EstadoDesignacion.VACANTE);
			// Al dia siguiente de terminar la licencia.
			assertThat(titular.getEstadoEn(fechaFinLicencia.plusDays(1))).
					isEqualTo(EstadoAsignacion.ACTIVA);
			assertThat(plg2467775.getEstadoEn(fechaFinLicencia.plusDays(1)))
					.isEqualTo(EstadoDesignacion.CUBIERTA);

			assertThat(licencia).isNotNull();
			assertThat(licencia.getTipoLicencia()).isEqualTo(TipoLicencia.L_114O1);
			assertThat(licencia.getPeriodo()).isEqualTo(unPeriodo);
			assertThat(licencia.getDescripcion()).isEqualTo("Reposo médico");
			assertThat(licencia.getDesignaciones()).containsExactly(plg2467775);
			// Relacion bidireccional
			assertThat(licencia.getEmpleadoEducativo()).isEqualTo(giardinoNoraRosa);
			assertThat(giardinoNoraRosa.getLicencias()).contains(licencia);

		}

		@Test
		void noDeberiaCrearLicenciaParaEmpleadoInactivo() {

			giardinoNoraRosa.darDeBajaDefinitiva(
					CausaBaja.RENUNCIA,
					LocalDate.of(2025, DECEMBER, 1)
			);

			assertThatThrownBy(() ->
					giardinoNoraRosa.crearLicencia(
							TipoLicencia.L_114O1,
							cerrado(
									LocalDate.of(2026, MARCH, 1),
									LocalDate.of(2026, MARCH, 15)
							),
							"Reposo médico",
							Set.of(plg2467775)
					)
			).isInstanceOf(EmpleadoInactivoException.class);
		}

		@Test
		void noDeberiaCrearLicenciaSuperpuesta() {

			LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);

			plg2467775.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);

			giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					cerrado(
							LocalDate.of(2026, MARCH, 1),
							LocalDate.of(2026, MARCH, 15)
					),
					"Primera licencia",
					Set.of(plg2467775)
			);

			assertThatThrownBy(() ->
					giardinoNoraRosa.crearLicencia(
							TipoLicencia.L_114O1,
							cerrado(
									LocalDate.of(2026, MARCH, 10),
									LocalDate.of(2026, MARCH, 20)
							),
							"Licencia superpuesta",
							Set.of(plg2467775)
					)
			).isInstanceOf(LicenciaSuperpuestaException.class);
		}

		@Test
		void noDeberiaCrearLicenciaConDesignacionNoActiva() {

			assertThatThrownBy(() ->
					giardinoNoraRosa.crearLicencia(
							TipoLicencia.L_114O1,
							cerrado(
									LocalDate.of(2026, MARCH, 1),
									LocalDate.of(2026, MARCH, 15)
							),
							"Reposo médico",
							Set.of(plg2467775)
					)
			).isInstanceOf(DesignacionNoActivaDelEmpleadoException.class);
		}

		@Test
		void seEliminaUnaLicenciaCorrectamente() {
			// Arrange
			LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);
			Asignacion titular = plg2467775.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);

			// Act
			LocalDate fechaInicioLicencia = LocalDate.of(2026, MARCH, 1);
			LocalDate fechaFinLicencia = LocalDate.of(2026, MARCH, 15);
			Periodo unPeriodo = cerrado(fechaInicioLicencia, fechaFinLicencia);
			Licencia unaLicencia = giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					unPeriodo,
					"Reposo médico",
					Set.of(plg2467775)
			);

			//Act
			giardinoNoraRosa.eliminarLicencia(unaLicencia);

			// Asssert
			assertThat(giardinoNoraRosa.getLicencias()).doesNotContain(unaLicencia);
		}

		@Test
		void deberiaRetornarLicenciaActivaEnFecha() {

			LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);

			plg2467775.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);

			Licencia licencia = giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					cerrado(
							LocalDate.of(2026, MARCH, 1),
							LocalDate.of(2026, MARCH, 15)
					),
					"Reposo médico",
					Set.of(plg2467775)
			);

			Optional<Licencia> resultado =
					giardinoNoraRosa.licenciaActivaEn(LocalDate.of(2026, MARCH, 10));

			assertThat(resultado).contains(licencia);
		}

		@Test
		void deberiaRetornarOptionalVacioCuandoNoHayLicenciaActiva() {
			Optional<Licencia> resultado =
					giardinoNoraRosa.licenciaActivaEn(LocalDate.of(2026, MARCH, 10));
			assertThat(resultado).isEmpty();
		}

		@Test
		void deberiaRetornarOptionalVacioCuandoFechaEsNull() {
			Optional<Licencia> resultado = giardinoNoraRosa.licenciaActivaEn(null);
			assertThat(resultado).isEmpty();
		}

		@Test
		void deberiaRetornarTrueCuandoEmpleadoEstaEnLicenciaParaDesignacion() {
			// Arrange
			LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);
			plg2467775.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);

			giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					cerrado(
							LocalDate.of(2026, MARCH, 1),
							LocalDate.of(2026, MARCH, 15)
					),
					"Reposo médico",
					Set.of(plg2467775)
			);

			// Act
			boolean resultado = giardinoNoraRosa.estaEnLicenciaPara(
							plg2467775,
							LocalDate.of(2026, MARCH, 5)
			);

			assertThat(resultado).isTrue();
		}

		@Test
		void deberiaRetornarFalseCuandoEmpleadoNoEstaEnLicenciaEnFecha() {

			LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);
			plg2467775.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);

			giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					cerrado(
							LocalDate.of(2026, MARCH, 1),
							LocalDate.of(2026, MARCH, 15)
					),
					"Reposo médico",
					Set.of(plg2467775)
			);

			boolean resultado = giardinoNoraRosa.estaEnLicenciaPara(
							plg2467775,
							LocalDate.of(2026, APRIL, 1)
			);

			assertThat(resultado).isFalse();
		}

		@Test
		void deberiaRetornarFalseCuandoLaDesignacionNoPerteneceALaLicencia() {

			LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);

			plg2467775.cubrirConTitular(
					giardinoNoraRosa,
					fechaTomaPosesion,
					1
			);

			giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					cerrado(
							LocalDate.of(2026, MARCH, 1),
							LocalDate.of(2026, MARCH, 15)
					),
					"Reposo médico",
					Set.of(plg2467775)
			);

			boolean resultado = giardinoNoraRosa.estaEnLicenciaPara(
							direccion2467830,
							LocalDate.of(2026, MARCH, 5)
					);

			assertThat(resultado).isFalse();
		}

	}

	@Nested
	@DisplayName("Asignaciones del empleadoEducativoBasico")
	class Asignaciones {

		private Asignacion titular;

		@BeforeEach
		void setUp() {
			LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);
			titular = plg2467775.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);
		}

		@Test
		void seAgregaAsignacionCorrectamente() {
			assertThat(giardinoNoraRosa.getAsignaciones()).contains(titular);
			assertThat(titular.getEmpleadoEducativo()).isEqualTo(giardinoNoraRosa);
		}

		@Test
		void seEliminaAsignacionCorrectamente() {
			giardinoNoraRosa.eliminarAsignacion(titular);
			assertThat(giardinoNoraRosa.getAsignaciones()).doesNotContain(titular);
		}

		@Test
		void deberiaRetornarAsignacionesActivasEnFecha() {
			Set<Asignacion> resultado = giardinoNoraRosa.asignacionesActivasEn(
							LocalDate.of(2026, MARCH, 1)
			);

			assertThat(resultado).contains(titular);
		}

		@Test
		void deberiaRetornarSetVacioCuandoFechaEsNullEnAsignacionesActivas() {
			Set<Asignacion> resultado = giardinoNoraRosa.asignacionesActivasEn(null);

			assertThat(resultado).isEmpty();
		}

		@Test
		void deberiaRetornarAsignacionesEnLicencia() {
			giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					cerrado(
							LocalDate.of(2026, MARCH, 1),
							LocalDate.of(2026, MARCH, 15)
					),
					"Reposo médico",
					Set.of(plg2467775)
			);

			Set<Asignacion> resultado = giardinoNoraRosa.asignacionesEnLicenciaEn(
					LocalDate.of(2026, MARCH, 5)
			);

			assertThat(resultado).contains(titular);
		}

		@Test
		void deberiaRetornarSetVacioCuandoNoHayAsignacionesEnLicencia() {
			Set<Asignacion> resultado = giardinoNoraRosa.asignacionesEnLicenciaEn(
					LocalDate.of(2026, APRIL, 1)
			);

			assertThat(resultado).isEmpty();
		}

		@Test
		void deberiaRetornarSetVacioCuandoFechaEsNullEnAsignacionesEnLicencia() {
			Set<Asignacion> resultado = giardinoNoraRosa.asignacionesEnLicenciaEn(null);

			assertThat(resultado).isEmpty();
		}
	}







//	@Nested
//	@DisplayName("CrearLicencia")
//	class CrearLicencia {
//
//		private Periodo periodoCerrado;
//
//		@BeforeEach
//		void setUp() {
//			periodoCerrado = cerrado(
//					LocalDate.of(2025, MARCH, 1),
//					LocalDate.of(2025, MARCH, 10)
//			);
//		}
//
//		@Test
//		@DisplayName("Debe crear una licencia válida y agregarla al empleadoEducativoBasico")
//		void creaLicenciaValida() {
//			// Arrange
//			LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);
//			Periodo periodo = cerrado(
//					LocalDate.of(2025, 3, 1),
//					LocalDate.of(2025, 3, 10)
//			);
//			AsignacionTitular titular =
//					designacion2467775.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion,1);
//
//			// Act
//			Licencia licencia = giardinoNoraRosa.crearLicencia(
//					TipoLicencia.L_115D1,
//					periodo,
//					"Descanso médico",
//					Set.of(designacion2467775)
//			);
//
//			// Assert
//			assertEquals(TipoLicencia.L_115D1, licencia.getTipoLicencia());
//			assertTrue(giardinoNoraRosa.getLicencias().contains(licencia));
//			assertEquals(1, giardinoNoraRosa.getLicencias().size());
//			assertEquals(periodo, licencia.getPeriodo());
//			assertTrue(licencia.getDesignaciones().contains(designacion2467775));
//
//		}
//
//		@Test
//		void x() {
//			// Arrange
//			LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);
//			LocalDate fechaInicioLicencia = LocalDate.of(2026, MARCH, 1);
//			LocalDate fechaFinLicencia = LocalDate.of(2026, MARCH, 10);
//
//			assertEquals(VACANTE, designacion2467775.getEstadoEn(fechaFinLicencia));
//
//			AsignacionTitular titular =
//					designacion2467775.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion,1);
//
//			assertEquals(CUBIERTA, designacion2467775.getEstadoEn(fechaFinLicencia));
//
//			Periodo periodo = cerrado(fechaInicioLicencia, fechaFinLicencia);
//
//			giardinoNoraRosa.crearLicencia(
//					TipoLicencia.L_115D1,
//					periodo,
//					"Descanso Médico",
//					Set.of(designacion2467775)
//			);
//
//			Licencia licenciaActual = giardinoNoraRosa.licenciaActivaEn(fechaInicioLicencia).orElseThrow();
//
//			assertTrue(licenciaActual.getDesignaciones().contains(designacion2467775));
//			assertEquals(1, licenciaActual.getDesignaciones().size());
//			assertEquals(TipoLicencia.L_115D1, licenciaActual.getTipoLicencia());
//			assertEquals("Descanso Médico", licenciaActual.getDescripcion());
//			assertEquals(periodo , licenciaActual.getPeriodo());
//			assertEquals(DESCUBIERTA, licenciaActual.getEstadoEn(fechaInicioLicencia));
//
//			assertEquals(VACANTE, designacion2467775.getEstadoEn(fechaFinLicencia));
//
//			AsignacionSuplente suplente =
//					designacion2467775.cubrirConSuplente(
//							licenciaActual,
//							billordoTomasa,
//							fechaInicioLicencia.plusDays(3),
//							1);
//
//			assertEquals(DESCUBIERTA, licenciaActual.getEstadoEn(fechaInicioLicencia));
//			assertEquals(EstadoLicencia.CUBIERTA, licenciaActual.getEstadoEn(fechaInicioLicencia.plusDays(3)));
//			assertEquals(EstadoDesignacion.CUBIERTA, designacion2467775.getEstadoEn(fechaFinLicencia));
//
//			LocalDate fechaInicioRenovacion = LocalDate.of(2026, MARCH, 11);
//			LocalDate fechaFinRenovacion = LocalDate.of(2026, MARCH, 20);
//
//			Licencia licenciaRenovada =
//					licenciaActual.renovar(
//							licenciaActual.getTipoLicencia(),
//							fechaFinRenovacion,
//							null
//					);
//
//			assertTrue(licenciaRenovada.getDesignaciones().contains(designacion2467775));
//			assertEquals(1, licenciaRenovada.getDesignaciones().size());
//			assertEquals(TipoLicencia.L_115D1, licenciaRenovada.getTipoLicencia());
//			assertNull(licenciaRenovada.getDescripcion());
//			assertEquals(licenciaRenovada, licenciaActual.getLicenciaSiguiente());
//			assertEquals(licenciaActual, licenciaRenovada.getLicenciaAnterior());
//			assertEquals(fechaInicioRenovacion, licenciaRenovada.getPeriodo().getFechaDesde());
//			assertEquals(fechaFinRenovacion, licenciaRenovada.getPeriodo().getFechaHasta());
//
//			// Finalizo la suplencia de 01-03-10
//			assertEquals(FINALIZADA, suplente.getEstadoEn(fechaInicioRenovacion));
//			// Quedo Vacante la desingación porque finalizo la licencia anterior.
//			assertEquals(VACANTE, designacion2467775.getEstadoEn(fechaInicioRenovacion));
//			// La licencia original quedo finalizada al 01-03-11 (inicio de renovación de la otra licencia)
//			assertEquals(EstadoLicencia.NO_VIGENTE, licenciaActual.getEstadoEn(fechaInicioRenovacion));
//			// La licencia renovada quedo descubierta porque no hay suplente.
//			assertEquals(EstadoLicencia.DESCUBIERTA, licenciaRenovada.getEstadoEn(fechaInicioRenovacion));
//		}
//
//		@Test
//		@DisplayName("Debe fallar si tipo de licencia es null")
//		void fallaSiTipoEsNull() {
//			assertThrows(
//					CampoObligatorioException.class,
//					() -> giardinoNoraRosa.crearLicencia(
//							null,
//							periodoCerrado,
//							"Descanso",
//							Set.of(mock(Designacion.class))
//					)
//			);
//		}
//
//		@Test
//		@DisplayName("Debe fallar si periodo es null")
//		void fallaSiPeriodoEsNull() {
//			assertThrows(
//					CampoObligatorioException.class,
//					() -> giardinoNoraRosa.crearLicencia(
//							TipoLicencia.L_115D1,
//							null,
//							"Descanso",
//							Set.of(mock(Designacion.class))
//					)
//			);
//		}
//
//		@Test
//		@DisplayName("Debe fallar si el empleadoEducativoBasico está inactivo")
//		void fallaSiEmpleadoInactivo() {
//
//			giardinoNoraRosa.setActivo(false); // TODO: Cambiar esto por darBajaDefinitiva despues, ES MOMENTANEO
//
//			assertThrows(
//					EmpleadoInactivoException.class,
//					() -> giardinoNoraRosa.crearLicencia(
//							TipoLicencia.L_115D1,
//							periodoCerrado,
//							"Descanso",
//							Set.of(mock(Designacion.class))
//					)
//			);
//		}
//
//		@Test
//		@DisplayName("Debe fallar si la licencia se superpone con otra existente")
//		void fallaSiLicenciaSuperpuesta() {
//
//			Periodo p1 = cerrado(
//					LocalDate.of(2025, 3, 1),
//					LocalDate.of(2025, 3, 10)
//			);
//
//			Periodo p2 = cerrado(
//					LocalDate.of(2025, 3, 5),
//					LocalDate.of(2025, 3, 15)
//			);
//
//			Designacion designacion = mock(Designacion.class);
//			Asignacion asignacion = mock(Asignacion.class);
//
//			when(asignacion.estaActivaEn(any())).thenReturn(true);
//			when(asignacion.getDesignacion()).thenReturn(designacion);
//
//			giardinoNoraRosa.agregarAsignacion(asignacion);
//
//			giardinoNoraRosa.crearLicencia(
//					TipoLicencia.L_115D1,
//					p1,
//					"Primera",
//					Set.of(designacion)
//			);
//
//			assertThrows(
//					LicenciaSuperpuestaException.class,
//					() -> giardinoNoraRosa.crearLicencia(
//							TipoLicencia.L_115D1,
//							p2,
//							"Segunda",
//							Set.of(designacion)
//					)
//			);
//		}
//
//		@Test
//		@DisplayName("Debe fallar si designacion está vacía")
//		void fallaSiDesignacionesVacia() {
//
//			assertThrows(
//					IllegalArgumentException.class,
//					() -> giardinoNoraRosa.crearLicencia(
//							TipoLicencia.L_115D1,
//							periodoCerrado,
//							"Descanso",
//							Set.of()
//					)
//			);
//		}
//
//		@Test
//		@DisplayName("Debe fallar si designacion es null")
//		void fallaSiDesignacionesNull() {
//
//			assertThrows(
//					IllegalArgumentException.class,
//					() -> giardinoNoraRosa.crearLicencia(
//							TipoLicencia.L_115D1,
//							periodoCerrado,
//							"Descanso",
//							null
//					)
//			);
//		}
//
//
//		@Test
//		@DisplayName("Debe fallar si la designación no está activa en la fecha")
//		void fallaSiDesignacionNoActiva() {
//
//			Designacion designacion = mock(Designacion.class);
//
//			assertThrows(
//					DesignacionNoActivaDelEmpleadoException.class,
//					() -> giardinoNoraRosa.crearLicencia(
//							TipoLicencia.L_115D1,
//							periodoCerrado,
//							"Descanso",
//							Set.of(designacion)
//					)
//			);
//		}
//
//	}
//
//	@Nested
//	@DisplayName("Baja definitiva")
//	class BajaDefinitiva {
//
//		@Test
//		@DisplayName("Debe fallar si causa de bajaAsignacion es null")
//		void fallaSiCausaBajaEsNull() {
//
//			assertThrows(
//					CampoObligatorioException.class,
//					() -> giardinoNoraRosa.darDeBajaDefinitiva(
//							null,
//							LocalDate.now()
//					)
//			);
//		}
//
//		@Test
//		@DisplayName("Debe fallar si fecha de bajaAsignacion es null")
//		void fallaSiFechaBajaEsNull() {
//
//			assertThrows(
//					CampoObligatorioException.class,
//					() -> giardinoNoraRosa.darDeBajaDefinitiva(
//							CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES,
//							null
//					)
//			);
//		}
//
////		@Test
////		@DisplayName("Titular en licencia renuncia y el suplente activo se convierte en provisional")
////		void titularEnLicenciaRenunciaYSuplenteSeConvierteEnProvisional() {
////
////			// Arrange
////			LocalDate fechaTomaPosesion = LocalDate.of(2004, Month.JULY, 21);
////			AsignacionTitular titular = auxiliar2330001.cubrirConTitular(leguizamonMarina, fechaTomaPosesion);
////
////			assertEquals(CUBIERTA, auxiliar2330001.getEstadoEn(fechaTomaPosesion));
////			assertEquals(ACTIVA, titular.getEstadoEn(fechaTomaPosesion));
////
////			LocalDate fechaInicio = LocalDate.of(2025, Month.MARCH, 1);
////			LocalDate fechaFin = LocalDate.of(2025, Month.JUNE, 1);
////			Periodo periodoLicencia = new Periodo(fechaInicio, fechaFin);
////
////			Licencia licencia = leguizamonMarina.crearLicencia(
////					TipoLicencia.L_115A1,
////					periodoLicencia,
////					"Reposo",
////					Set.of(auxiliar2330001)
////			);
////
////			assertEquals(LICENCIA, titular.getEstadoEn(periodoLicencia.getFechaDesde()));
////			assertEquals(VACANTE, auxiliar2330001.getEstadoEn(licencia.getPeriodo().getFechaDesde()));
////			assertTrue((leguizamonMarina.getLicencias().contains(licencia)));
////
////			AsignacionSuplente suplente =
////					auxiliar2330001.cubrirConSuplente(
////							licencia,
////							vallejosValeria,
////							periodoLicencia.getFechaDesde()
////					);
////
////			assertEquals(ACTIVA, suplente.getEstadoEn(periodoLicencia.getFechaDesde()));
////			assertEquals(CUBIERTA, auxiliar2330001.getEstadoEn(licencia.getPeriodo().getFechaDesde()));
////
////			// Act
////			LocalDate fechaBaja = LocalDate.of(2025, Month.APRIL, 1);
////			leguizamonMarina.darDeBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);
////
////			// Assert
////			assertEquals(EstadoAsignacion.BAJA, titular.getEstadoEn(fechaBaja));
////			assertEquals(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, titular.getBajaAsignacion().getCausa());
////			assertEquals(fechaBaja, titular.getBajaAsignacion().getFechaBaja());
////
////			assertEquals(EstadoAsignacion.BAJA, suplente.getEstadoEn(fechaBaja));
////			assertEquals(CausaBaja.PASE_DE_SUPLENTE_A_PROVISIONAL, suplente.getBajaAsignacion().getCausa());
////			assertEquals(fechaBaja, suplente.getBajaAsignacion().getFechaBaja());
////
////			LocalDate fechaBajaDiaSiguiente = fechaBaja.plusDays(1);
////
////			assertEquals(CUBIERTA, auxiliar2330001.getEstadoEn(fechaBajaDiaSiguiente));
////
////			Asignacion asignacionActual = auxiliar2330001.asignacionQueEjerceEn(fechaBajaDiaSiguiente).orElseThrow();
////
////			assertEquals(ACTIVA, asignacionActual.getEstadoEn(fechaBajaDiaSiguiente));
////			assertEquals(SituacionDeRevista.PROVISIONAL, asignacionActual.getSituacionDeRevista());
////			assertEquals(vallejosValeria, asignacionActual.getEmpleadoEducativo());
////			assertFalse(asignacionActual.estaDadaDeBajaEn(fechaBajaDiaSiguiente));
////
////			assertFalse(leguizamonMarina.isActivo());
////
////		}
//
//		@Test
//		@DisplayName("Provisional activo renuncia definitivamente y la designación queda vacante")
//		void provisionalActivoRenunciaYLaDesignacionQuedaVacante() {
//
//			// Arrange
//			LocalDate fechaTomaPosesion = LocalDate.of(2017, Month.JUNE, 7);
//			LocalDate fechaCese = LocalDate.of(2018, FEBRUARY, 28);
//			Periodo periodoProvisional = cerrado(fechaTomaPosesion, fechaCese);
//			AsignacionProvisional provisional = direccion2467830.cubrirConProvisionalManual(giardinoNoraRosa, periodoProvisional, 1);
//
//			assertEquals(CUBIERTA, direccion2467830.getEstadoEn(fechaTomaPosesion));
//			assertEquals(ACTIVA, provisional.getEstadoEn(fechaTomaPosesion));
//
//			// Act
//			LocalDate fechaBaja = LocalDate.of(2017, Month.AUGUST, 1);
//			giardinoNoraRosa.darDeBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);
//
//			// Assert
//			assertFalse(giardinoNoraRosa.isActivo());
//
//			assertEquals(EstadoAsignacion.BAJA, provisional.getEstadoEn(fechaBaja));
//			assertEquals(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, provisional.getBajaAsignacion().getCausa());
//			assertEquals(fechaBaja, provisional.getBajaAsignacion().getFechaBaja());
//
//			assertEquals(VACANTE, direccion2467830.getEstadoEn(fechaBaja));
//
//		}
//
//
//	}
//
//	@Nested
//	@DisplayName("Actualización de empleadoEducativoBasico")
//	class Actualizacion {
//
//		@Test
//		@DisplayName("Debe actualizar correctamente los datos del empleadoEducativoBasico")
//		void actualizaCorrectamenteLosDatos() {
//
//			// Arrange
//			LocalDate nuevaFechaNacimiento = LocalDate.of(1991, 5, 10);
//			LocalDate nuevaFechaIngreso = LocalDate.of(2020, 3, 1);
//
//			// Act
//			giardinoNoraRosa.actualizar(
//					"20-12345678-9",
//					"Nuevo Nombre",
//					"Nuevo Apellido",
//					"Nueva dirección",
//					"123456",
//					nuevaFechaNacimiento,
//					nuevaFechaIngreso,
//					"nuevo@mail.com"
//			);
//
//			// Assert
//			assertEquals("20-12345678-9", giardinoNoraRosa.getCuil());
//			assertEquals("Nuevo Nombre", giardinoNoraRosa.getNombre());
//			assertEquals("Nuevo Apellido", giardinoNoraRosa.getApellido());
//			assertEquals("Nueva dirección", giardinoNoraRosa.getDomicilio());
//			assertEquals("123456", giardinoNoraRosa.getTelefono());
//			assertEquals(nuevaFechaNacimiento, giardinoNoraRosa.getFechaDeNacimiento());
//			assertEquals(nuevaFechaIngreso, giardinoNoraRosa.getFechaDeIngreso());
//			assertEquals("nuevo@mail.com", giardinoNoraRosa.getEmail());
//		}
//
//	}
//
//	@Nested
//	@DisplayName("Consultas con fecha null")
//	class ConsultasConFechaNull {
//
//		@Test
//		@DisplayName("licenciaActivaEn debe devolver Optional.empty si fecha es null")
//		void licenciaActivaEnFechaNull() {
//
//			Optional<Licencia> resultado = giardinoNoraRosa.licenciaActivaEn(null);
//
//			assertTrue(resultado.isEmpty());
//		}
//
//		@Test
//		@DisplayName("asignacionesActivasEn debe devolver Set vacío si fecha es null")
//		void asignacionesActivasEnFechaNull() {
//
//			Set<Asignacion> resultado = giardinoNoraRosa.asignacionesActivasEn(null);
//
//			assertTrue(resultado.isEmpty());
//		}
//
//		@Test
//		@DisplayName("designacionesActivasEn debe devolver Set vacío si fecha es null")
//		void designacionesActivasEnFechaNull() {
//
//			Set<Designacion> resultado = giardinoNoraRosa.designacionesActivasEn(null);
//
//			assertTrue(resultado.isEmpty());
//		}
//
//		@Test
//		@DisplayName("asignacionesEnLicenciaEn debe devolver Set vacío si fecha es null")
//		void asignacionesEnLicenciaEnFechaNull() {
//
//			Set<Asignacion> resultado = giardinoNoraRosa.asignacionesEnLicenciaEn(null);
//
//			assertTrue(resultado.isEmpty());
//		}
//
//	}
//
//	@Nested
//	@DisplayName("Dias que no trabaja por licencia")
//	class DiasQueNoTrabajaPorLicencia {
//
//		private DesignacionCurso crearDesignacionCurso(
//				Integer cupof,
//				Materia materia,
//				Curso curso,
//				String orientacion
//		) {
//			return new DesignacionCurso(escuela, cupof, materia, curso, orientacion);
//		}
//
//		private FranjaHoraria crearFranja(
//				DiaDeSemana dia,
//				int hDesde,
//				int mDesde,
//				int hHasta,
//				int mHasta
//		) {
//			return new FranjaHoraria(
//					dia,
//					LocalTime.of(hDesde, mDesde),
//					LocalTime.of(hHasta, mHasta)
//			);
//		}
//
//		@BeforeEach
//		void setUp() {
//
//			Materia practicasDelLenguaje = new Materia("Practicas del Lenguaje", "PLG", 4);
//
//			Curso a1g1 = new Curso(MANIANA, 1, 1);
//			Curso a2g1 = new Curso(MANIANA, 2, 1);
//			Curso a3g1 = new Curso(MANIANA, 3, 1);
//
//			designacion2467775 = crearDesignacionCurso(2467775, practicasDelLenguaje, a1g1, "Bachiller de Ciclo Básico");
//			designacion2467791 = crearDesignacionCurso(2467791, practicasDelLenguaje, a2g1, "Bachiller de Ciclo Básico");
//			designacion2467811 = crearDesignacionCurso(2467811, practicasDelLenguaje, a3g1, "Bachiller de Ciclo Básico");
//
//			designacion2467775.agregarFranjaHoraria(crearFranja(LUNES, 12, 0, 13, 0));
//			designacion2467775.agregarFranjaHoraria(crearFranja(VIERNES, 9, 45, 10, 45));
//			designacion2467775.agregarFranjaHoraria(crearFranja(VIERNES, 11, 0, 12, 0));
//			designacion2467775.agregarFranjaHoraria(crearFranja(VIERNES, 12, 0, 13, 0));
//
//			designacion2467791.agregarFranjaHoraria(crearFranja(LUNES, 7, 30, 8, 30));
//			designacion2467791.agregarFranjaHoraria(crearFranja(LUNES, 8, 45, 9, 45));
//			designacion2467791.agregarFranjaHoraria(crearFranja(VIERNES, 9, 45, 10, 45));
//			designacion2467791.agregarFranjaHoraria(crearFranja(VIERNES, 11, 0, 12, 0));
//
//			designacion2467811.agregarFranjaHoraria(crearFranja(JUEVES, 9, 45, 10, 45));
//			designacion2467811.agregarFranjaHoraria(crearFranja(JUEVES, 11, 0, 12, 0));
//			designacion2467811.agregarFranjaHoraria(crearFranja(JUEVES, 12, 0, 13, 0));
//			designacion2467811.agregarFranjaHoraria(crearFranja(VIERNES, 11, 0, 12, 0));
//
//		}
//
//		@Test
//		@DisplayName("cuando toma licencia en varias designacion activas libera todas y calcula los dias afectados")
//		void tomaLicenciaEnVariasDesignacionesYCalculaDiasAfectados() {
//
//			LocalDate fechaTomaPosesion = LocalDate.of(1998, MARCH, 1);
//
//			AsignacionTitular asignacionTitular1 = designacion2467775.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);
//			AsignacionTitular asignacionTitular2 = designacion2467791.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);
//			AsignacionTitular asignacionTitular3 = designacion2467811.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);
//
//			assertEquals(CUBIERTA, designacion2467775.getEstadoEn(fechaTomaPosesion));
//			assertEquals(CUBIERTA, designacion2467791.getEstadoEn(fechaTomaPosesion));
//			assertEquals(CUBIERTA, designacion2467811.getEstadoEn(fechaTomaPosesion));
//
//			assertEquals(ACTIVA, asignacionTitular1.getEstadoEn(fechaTomaPosesion));
//			assertEquals(ACTIVA, asignacionTitular2.getEstadoEn(fechaTomaPosesion));
//			assertEquals(ACTIVA, asignacionTitular3.getEstadoEn(fechaTomaPosesion));
//
//			Periodo periodoLicencia = abierto(fechaTomaPosesion);
//
//			Licencia licencia = giardinoNoraRosa.crearLicencia(
//					TipoLicencia.L_115D1,
//					periodoLicencia,
//					null,
//					Set.of(designacion2467775, designacion2467791, designacion2467811)
//			);
//
//			assertEquals(VACANTE, designacion2467775.getEstadoEn(fechaTomaPosesion));
//			assertEquals(VACANTE, designacion2467791.getEstadoEn(fechaTomaPosesion));
//			assertEquals(VACANTE, designacion2467811.getEstadoEn(fechaTomaPosesion));
//
//			assertEquals(LICENCIA, asignacionTitular1.getEstadoEn(fechaTomaPosesion));
//			assertEquals(LICENCIA, asignacionTitular2.getEstadoEn(fechaTomaPosesion));
//			assertEquals(LICENCIA, asignacionTitular3.getEstadoEn(fechaTomaPosesion));
//
//			Licencia licenciaActiva = giardinoNoraRosa.licenciaActivaEn(fechaTomaPosesion).orElseThrow();
//
//			assertEquals(licenciaActiva, licencia);
//
//		}
//
//
//	}


}