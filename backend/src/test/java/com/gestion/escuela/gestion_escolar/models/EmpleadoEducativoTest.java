package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.CuilInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmailInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
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

			EmpleadoEducativo.Builder builder = builderValido()
					.escuela(null);

			assertThrows(
					CampoObligatorioException.class,
					builder::build
			);
		}

		@ParameterizedTest(name = "Debe fallar con cuil = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el cuil es null, vacío o solo espacios")
		void fallaSiCuilInvalido(String cuilInvalido) {

			EmpleadoEducativo.Builder builder = builderValido()
					.cuil(cuilInvalido);

			assertThrows(
					CampoObligatorioException.class,
					builder::build
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

			EmpleadoEducativo.Builder builder = builderValido()
					.cuil(cuilInvalido);

			assertThrows(
					CuilInvalidoException.class,
					builder::build
			);
		}

		@ParameterizedTest(name = "Debe fallar con nombre = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el nombre es null, vacío o solo espacios")
		void fallaSiNombreInvalido(String nombreInvalido) {

			EmpleadoEducativo.Builder builder = builderValido()
					.nombre(nombreInvalido);

			assertThrows(
					CampoObligatorioException.class,
					builder::build
			);
		}


		@ParameterizedTest(name = "Debe fallar con apellido = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el apellido es null, vacío o solo espacios")
		void fallaSiApellidoInvalido(String apellidoInvalido) {

			EmpleadoEducativo.Builder builder = builderValido()
					.apellido(apellidoInvalido);

			assertThrows(
					CampoObligatorioException.class,
					builder::build
			);
		}

		@ParameterizedTest(name = "Debe fallar con email = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el email es null, vacío o solo espacios")
		void fallaSiEmailBlank(String emailInvalido) {

			EmpleadoEducativo.Builder builder = builderValido()
					.email(emailInvalido);

			assertThrows(
					CampoObligatorioException.class,
					builder::build
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

			EmpleadoEducativo.Builder builder = builderValido()
					.email(emailInvalido);

			assertThrows(
					EmailInvalidoException.class,
					builder::build
			);
		}

		@Test
		@DisplayName("Debe fallar si fecha de nacimiento es null")
		void fallaSiFechaNacimientoEsNull() {

			EmpleadoEducativo.Builder builder = builderValido()
					.fechaDeNacimiento(null);

			assertThrows(
					CampoObligatorioException.class,
					builder::build
			);
		}

		@Test
		@DisplayName("Debe fallar si la fecha de ingreso es anterior a la fecha de nacimiento")
		void fallaSiFechaIngresoEsAnteriorANacimiento() {

			EmpleadoEducativo.Builder builder = builderValido()
					.fechaDeNacimiento(LocalDate.of(1990, JANUARY, 1))
					.fechaDeIngreso(LocalDate.of(1980, JANUARY, 1));

			assertThrows(
					RangoFechasInvalidoException.class,
					builder::build
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

		private LocalDate fechaTomaPosesion;
		private AsignacionTitular titularGiardino;

		@BeforeEach
		void setUp() {
			fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);

			titularGiardino = plg2467775.cubrirConTitular(
					giardinoNoraRosa,
					fechaTomaPosesion,
					1
			);
		}

		@Test
		void seCreaUnaLicenciaCorrectamente() {
			// Act
			LocalDate fechaInicioLicencia = LocalDate.of(2026, MARCH, 1);
			LocalDate fechaFinLicencia = LocalDate.of(2026, MARCH, 15);
			Periodo unPeriodo = cerrado(fechaInicioLicencia, fechaFinLicencia);

			Licencia licencia = giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					unPeriodo,
					"Reposo médico",
					Set.of(titularGiardino)
			);

			// Assert
			// Antes de cubrir con el titular.
			assertThat(plg2467775.getEstadoEn(fechaTomaPosesion.minusDays(1)))
					.isEqualTo(EstadoDesignacion.VACANTE);
			// Despues de cubrir con el titular.
			assertThat(titularGiardino.getEstadoEn(fechaTomaPosesion)).isEqualTo(EstadoAsignacion.ACTIVA);
			assertThat(plg2467775.getEstadoEn(fechaTomaPosesion)).isEqualTo(EstadoDesignacion.CUBIERTA);
			// Al inciar la licencia.
			assertThat(titularGiardino.getEstadoEn(fechaInicioLicencia)).isEqualTo(EstadoAsignacion.LICENCIA);
			assertThat(plg2467775.getEstadoEn(fechaInicioLicencia)).isEqualTo(EstadoDesignacion.VACANTE);
			// Al dia siguiente de terminar la licencia.
			assertThat(titularGiardino.getEstadoEn(fechaFinLicencia.plusDays(1))).
					isEqualTo(EstadoAsignacion.ACTIVA);
			assertThat(plg2467775.getEstadoEn(fechaFinLicencia.plusDays(1)))
					.isEqualTo(EstadoDesignacion.CUBIERTA);

			assertThat(licencia).isNotNull();
			assertThat(licencia.getTipoLicencia()).isEqualTo(TipoLicencia.L_114O1);
			assertThat(licencia.getPeriodo()).isEqualTo(unPeriodo);
			assertThat(licencia.getDescripcion()).isEqualTo("Reposo médico");
			assertThat(licencia.getAsignaciones()).containsExactly(titularGiardino);
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

			Periodo periodo = cerrado(
					LocalDate.of(2026, MARCH, 1),
					LocalDate.of(2026, MARCH, 15)
			);

			Set<Asignacion> asignaciones = Set.of(titularGiardino);

			assertThatThrownBy(() ->
					giardinoNoraRosa.crearLicencia(
							TipoLicencia.L_114O1,
							periodo,
							"Reposo médico",
							asignaciones
					)
			).isInstanceOf(EmpleadoInactivoException.class);
		}

		@Test
		void noDeberiaCrearLicenciaSuperpuesta() {

			Periodo primeraLicencia = cerrado(
					LocalDate.of(2026, MARCH, 1),
					LocalDate.of(2026, MARCH, 15)
			);

			Periodo licenciaSuperpuesta = cerrado(
					LocalDate.of(2026, MARCH, 10),
					LocalDate.of(2026, MARCH, 20)
			);

			Set<Asignacion> asignaciones = Set.of(titularGiardino);

			giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					primeraLicencia,
					"Primera licencia",
					asignaciones
			);

			assertThatThrownBy(() ->
					giardinoNoraRosa.crearLicencia(
							TipoLicencia.L_114O1,
							licenciaSuperpuesta,
							"Licencia superpuesta",
							asignaciones
					)
			).isInstanceOf(LicenciaSuperpuestaException.class);
		}

		@Test
		void seEliminaUnaLicenciaCorrectamente() {

			// Act
			LocalDate fechaInicioLicencia = LocalDate.of(2026, MARCH, 1);
			LocalDate fechaFinLicencia = LocalDate.of(2026, MARCH, 15);
			Periodo unPeriodo = cerrado(fechaInicioLicencia, fechaFinLicencia);
			Licencia unaLicencia = giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					unPeriodo,
					"Reposo médico",
					Set.of(titularGiardino)
			);

			//Act
			giardinoNoraRosa.eliminarLicencia(unaLicencia);

			// Asssert
			assertThat(giardinoNoraRosa.getLicencias()).doesNotContain(unaLicencia);
		}

		@Test
		void deberiaRetornarLicenciaActivaEnFecha() {

			Licencia licencia = giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					cerrado(
							LocalDate.of(2026, MARCH, 1),
							LocalDate.of(2026, MARCH, 15)
					),
					"Reposo médico",
					Set.of(titularGiardino)
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

			giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					cerrado(
							LocalDate.of(2026, MARCH, 1),
							LocalDate.of(2026, MARCH, 15)
					),
					"Reposo médico",
					Set.of(titularGiardino)
			);

			// Act
			boolean resultado = giardinoNoraRosa.estaEnLicenciaPara(
					titularGiardino, LocalDate.of(2026, MARCH, 5)
			);

			assertThat(resultado).isTrue();
		}

		@Test
		void deberiaRetornarFalseCuandoEmpleadoNoEstaEnLicenciaEnFecha() {

			giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					cerrado(
							LocalDate.of(2026, MARCH, 1),
							LocalDate.of(2026, MARCH, 15)
					),
					"Reposo médico",
					Set.of(titularGiardino)
			);

			boolean resultado = giardinoNoraRosa.estaEnLicenciaPara(
					titularGiardino,
					LocalDate.of(2026, APRIL, 1)
			);

			assertThat(resultado).isFalse();
		}

		@Test
		void deberiaRetornarFalseCuandoLaDesignacionNoPerteneceALaLicencia() {

			giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_114O1,
					cerrado(
							LocalDate.of(2026, MARCH, 1),
							LocalDate.of(2026, MARCH, 15)
					),
					"Reposo médico",
					Set.of(titularGiardino)
			);

			boolean resultado = giardinoNoraRosa.estaEnLicenciaPara(
					mock(AsignacionTitular.class),
					LocalDate.of(2026, MARCH, 5)
			);

			assertThat(resultado).isFalse();
		}

	}

	@Nested
	@DisplayName("Asignaciones del empleadoEducativoBasico")
	class Asignaciones {

		private AsignacionTitular titularGiardino;

		@BeforeEach
		void setUp() {
			LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);
			titularGiardino = plg2467775.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion, 1);
		}

		@Test
		void seAgregaAsignacionCorrectamente() {
			assertThat(giardinoNoraRosa.getAsignaciones()).contains(titularGiardino);
			assertThat(titularGiardino.getEmpleadoEducativo()).isEqualTo(giardinoNoraRosa);
		}

		@Test
		void seEliminaAsignacionCorrectamente() {
			giardinoNoraRosa.eliminarAsignacion(titularGiardino);
			assertThat(giardinoNoraRosa.getAsignaciones()).doesNotContain(titularGiardino);
		}

		@Test
		void deberiaRetornarAsignacionesActivasEnFecha() {
			Set<Asignacion> resultado = giardinoNoraRosa.asignacionesActivasEn(
					LocalDate.of(2026, MARCH, 1)
			);

			assertThat(resultado).contains(titularGiardino);
		}

		@Test
		void noDeberiaPermitirFechaNullEnAsignacionesActivas() {

			assertThatThrownBy(() ->
					giardinoNoraRosa.asignacionesActivasEn(null)
			).isInstanceOf(CampoObligatorioException.class);
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
					Set.of(titularGiardino)
			);

			Set<Asignacion> resultado = giardinoNoraRosa.asignacionesEnLicenciaEn(
					LocalDate.of(2026, MARCH, 5)
			);

			assertThat(resultado).contains(titularGiardino);
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

}





