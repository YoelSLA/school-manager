package com.gestion.escuela.gestion_escolar.models;

import static com.gestion.escuela.gestion_escolar.models.Periodo.cerrado;
import static java.time.Month.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.CuilInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmailInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionNoPerteneceAlEmpleadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo.EmpleadoInactivoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.LicenciaSuperpuestaException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

class EmpleadoEducativoTest extends DomainTestFixture {

  @Nested
  @DisplayName("Creación exitosa del empleado educativo")
  class CreacionExitosa {

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
    @DisplayName("Debe permitir fecha de ingreso null")
    void permiteIngresoNull() {

      EmpleadoEducativo empleado = builderValido().fechaDeIngreso(null).build();
      assertThat(empleado).isNotNull();
    }
  }

  @Nested
  @DisplayName("Validaciones de creación")
  class ValidacionesCreacion {

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
    @DisplayName("Debe fallar si escuela es null")
    void fallaSiEscuelaEsNull() {

      EmpleadoEducativo.Builder builder = builderValido().escuela(null);

      assertThrows(CampoObligatorioException.class, builder::build);
    }

    @ParameterizedTest(name = "Debe fallar con cuil = ''{0}''")
    @NullAndEmptySource
    @ValueSource(strings = {" "})
    @DisplayName("Debe fallar si el cuil es null, vacío o solo espacios")
    void fallaSiCuilInvalido(String cuilInvalido) {

      EmpleadoEducativo.Builder builder = builderValido().cuil(cuilInvalido);

      assertThrows(CampoObligatorioException.class, builder::build);
    }

    @ParameterizedTest(name = "CUIL inválido: {0}")
    @ValueSource(
        strings = {
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

      EmpleadoEducativo.Builder builder = builderValido().cuil(cuilInvalido);

      assertThrows(CuilInvalidoException.class, builder::build);
    }

    @ParameterizedTest(name = "Debe fallar con nombre = ''{0}''")
    @NullAndEmptySource
    @ValueSource(strings = {" "})
    @DisplayName("Debe fallar si el nombre es null, vacío o solo espacios")
    void fallaSiNombreInvalido(String nombreInvalido) {

      EmpleadoEducativo.Builder builder = builderValido().nombre(nombreInvalido);

      assertThrows(CampoObligatorioException.class, builder::build);
    }

    @ParameterizedTest(name = "Debe fallar con apellido = ''{0}''")
    @NullAndEmptySource
    @ValueSource(strings = {" "})
    @DisplayName("Debe fallar si el apellido es null, vacío o solo espacios")
    void fallaSiApellidoInvalido(String apellidoInvalido) {

      EmpleadoEducativo.Builder builder = builderValido().apellido(apellidoInvalido);

      assertThrows(CampoObligatorioException.class, builder::build);
    }

    @ParameterizedTest(name = "Debe fallar con email = ''{0}''")
    @NullAndEmptySource
    @ValueSource(strings = {" "})
    @DisplayName("Debe fallar si el email es null, vacío o solo espacios")
    void fallaSiEmailBlank(String emailInvalido) {

      EmpleadoEducativo.Builder builder = builderValido().email(emailInvalido);

      assertThrows(CampoObligatorioException.class, builder::build);
    }

    @ParameterizedTest(name = "Debe fallar con email inválido = {0}")
    @ValueSource(
        strings = {"nora", "nora@", "@mail.com", "nora@mail", "nora@mail.", "noramail.com"})
    @DisplayName("Debe fallar si el email no cumple el formato válido")
    void fallaSiEmailFormatoInvalido(String emailInvalido) {

      EmpleadoEducativo.Builder builder = builderValido().email(emailInvalido);

      assertThrows(EmailInvalidoException.class, builder::build);
    }

    @Test
    @DisplayName("Debe fallar si fecha de nacimiento es null")
    void fallaSiFechaNacimientoEsNull() {

      EmpleadoEducativo.Builder builder = builderValido().fechaDeNacimiento(null);

      assertThrows(CampoObligatorioException.class, builder::build);
    }

    @Test
    @DisplayName("Debe fallar si la fecha de ingreso es anterior a la fecha de nacimiento")
    void fallaSiFechaIngresoEsAnteriorANacimiento() {

      EmpleadoEducativo.Builder builder =
          builderValido()
              .fechaDeNacimiento(LocalDate.of(1990, JANUARY, 1))
              .fechaDeIngreso(LocalDate.of(1980, JANUARY, 1));

      assertThrows(RangoFechasInvalidoException.class, builder::build);
    }
  }

  @Nested
  @DisplayName("Licencias del empleadoEducativoBasico")
  class Licencias {

    private AsignacionTitular titularPerezJuan;

    @BeforeEach
    void setUp() {
      LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);
      titularPerezJuan = plg2467775.registrarTitular(perezJuan, fechaTomaPosesion, 1);
    }

    private LicenciaEstatutaria licenciaEstatutaria() {
      return mock(LicenciaEstatutaria.class);
    }

    private Periodo periodoValido() {
      return cerrado(LocalDate.of(2026, MARCH, 1), LocalDate.of(2026, MARCH, 15));
    }

    private Set<Asignacion> asignacionesValidas() {
      return Set.of(titularPerezJuan);
    }

    @Test
    @DisplayName("Debe agregar una licencia al empleado")
    void deberiaAgregarLicencia() {

      Licencia licencia = mock(Licencia.class);

      perezJuan.agregarLicencia(licencia);

      assertThat(perezJuan.getLicencias()).containsExactly(licencia);
    }

    @Test
    @DisplayName("Debe fallar si la licencia es null")
    void deberiaFallarSiAgregaLicenciaNull() {

      assertThatThrownBy(() -> perezJuan.agregarLicencia(null))
          .isInstanceOf(CampoObligatorioException.class);
    }

    @Test
    @DisplayName("Debe eliminar una licencia")
    void deberiaEliminarLicencia() {

      Licencia licencia = mock(Licencia.class);

      perezJuan.agregarLicencia(licencia);

      perezJuan.eliminarLicencia(licencia);

      assertThat(perezJuan.getLicencias()).isEmpty();
    }

    @Test
    @DisplayName("Debe retornar la licencia activa en la fecha indicada")
    void deberiaRetornarLicenciaActivaEnFecha() {

      Licencia licencia = mock(Licencia.class);

      when(licencia.estaVigenteEn(LocalDate.of(2026, MARCH, 10))).thenReturn(true);

      perezJuan.agregarLicencia(licencia);

      Optional<Licencia> resultado = perezJuan.licenciaActivaEn(LocalDate.of(2026, MARCH, 10));

      assertThat(resultado).contains(licencia);
    }

    @Test
    @DisplayName("Debe retornar true cuando existe una licencia superpuesta")
    void deberiaRetornarTrueCuandoHayLicenciaSuperpuesta() {

      Periodo periodo = cerrado(LocalDate.of(2026, MARCH, 10), LocalDate.of(2026, MARCH, 20));

      Licencia licencia = mock(Licencia.class);

      when(licencia.seSuperponeCon(periodo)).thenReturn(true);

      perezJuan.agregarLicencia(licencia);

      assertThat(perezJuan.tieneLicenciaSuperpuestaEn(periodo)).isTrue();
    }

    @Test
    @DisplayName("Debe retornar false cuando no existe una licencia superpuesta")
    void deberiaRetornarFalseCuandoNoHayLicenciaSuperpuesta() {

      Periodo periodo = cerrado(LocalDate.of(2026, MARCH, 10), LocalDate.of(2026, MARCH, 20));

      Licencia licencia = mock(Licencia.class);

      when(licencia.seSuperponeCon(periodo)).thenReturn(false);

      perezJuan.agregarLicencia(licencia);

      assertThat(perezJuan.tieneLicenciaSuperpuestaEn(periodo)).isFalse();
    }

    @Test
    @DisplayName("Debe retornar true cuando el empleado tiene una licencia vigente")
    void deberiaRetornarTrueCuandoTieneLicenciaEnFecha() {

      LocalDate fecha = LocalDate.of(2026, MARCH, 10);

      Licencia licencia = mock(Licencia.class);

      when(licencia.contiene(fecha)).thenReturn(true);

      perezJuan.agregarLicencia(licencia);

      assertThat(perezJuan.tieneLicenciaEn(fecha)).isTrue();
    }

    @Test
    @DisplayName("Debe retornar false cuando el empleado no tiene licencia vigente")
    void deberiaRetornarFalseCuandoNoTieneLicenciaEnFecha() {

      LocalDate fecha = LocalDate.of(2026, MARCH, 10);

      Licencia licencia = mock(Licencia.class);

      when(licencia.contiene(fecha)).thenReturn(false);

      perezJuan.agregarLicencia(licencia);

      assertThat(perezJuan.tieneLicenciaEn(fecha)).isFalse();
    }

    @Test
    @DisplayName("Debe retornar true cuando la licencia afecta a la asignación")
    void deberiaRetornarTrueCuandoEmpleadoEstaEnLicenciaParaAsignacion() {

      LocalDate fecha = LocalDate.of(2026, MARCH, 5);

      Licencia licencia = mock(Licencia.class);

      when(licencia.afectaA(titularPerezJuan, fecha)).thenReturn(true);

      perezJuan.agregarLicencia(licencia);

      assertThat(perezJuan.estaEnLicenciaPara(titularPerezJuan, fecha)).isTrue();
    }

    @Test
    @DisplayName("Debe retornar false cuando la licencia no afecta a la asignación")
    void deberiaRetornarFalseCuandoEmpleadoNoEstaEnLicenciaEnFecha() {

      LocalDate fecha = LocalDate.of(2026, APRIL, 1);

      Licencia licencia = mock(Licencia.class);

      when(licencia.afectaA(titularPerezJuan, fecha)).thenReturn(false);

      perezJuan.agregarLicencia(licencia);

      assertThat(perezJuan.estaEnLicenciaPara(titularPerezJuan, fecha)).isFalse();
    }

    @Test
    @DisplayName("Debe retornar false cuando la asignación no está afectada por la licencia")
    void deberiaRetornarFalseCuandoLaAsignacionNoPerteneceALaLicencia() {

      Asignacion asignacion = mock(Asignacion.class);

      LocalDate fecha = LocalDate.of(2026, MARCH, 5);

      Licencia licencia = mock(Licencia.class);

      when(licencia.afectaA(asignacion, fecha)).thenReturn(false);

      perezJuan.agregarLicencia(licencia);

      assertThat(perezJuan.estaEnLicenciaPara(asignacion, fecha)).isFalse();
    }

    //    @Test
    //    @DisplayName("Debe validar una nueva licencia")
    //    void deberiaValidarNuevaLicencia() {
    //
    //      assertThatCode(() ->
    //              perezJuan.validarNuevaLicencia(
    //                      licenciaEstatutaria(),
    //                      periodoValido(),
    //                      asignacionesValidas()))
    //              .doesNotThrowAnyException();
    //    }

    @Test
    @DisplayName("Debe fallar si la licencia estatutaria es null")
    void deberiaFallarSiLicenciaEstatutariaEsNull() {

      Periodo periodo = periodoValido();
      Set<Asignacion> asignaciones = asignacionesValidas();

      assertThatThrownBy(() -> perezJuan.validarNuevaLicencia(null, periodo, asignaciones))
          .isInstanceOf(CampoObligatorioException.class);
    }

    @Test
    @DisplayName("Debe fallar si el período es null")
    void deberiaFallarSiPeriodoEsNull() {

      LicenciaEstatutaria licenciaEstatutaria = licenciaEstatutaria();
      Set<Asignacion> asignaciones = asignacionesValidas();

      assertThatThrownBy(
              () -> perezJuan.validarNuevaLicencia(licenciaEstatutaria, null, asignaciones))
          .isInstanceOf(CampoObligatorioException.class);
    }

    @Test
    @DisplayName("Debe fallar si las asignaciones son null")
    void deberiaFallarSiAsignacionesSonNull() {

      LicenciaEstatutaria licenciaEstatutaria = licenciaEstatutaria();
      Periodo periodo = periodoValido();

      assertThatThrownBy(() -> perezJuan.validarNuevaLicencia(licenciaEstatutaria, periodo, null))
          .isInstanceOf(CampoObligatorioException.class);
    }

    @Test
    @DisplayName("Debe fallar si no hay asignaciones")
    void deberiaFallarSiAsignacionesEstanVacias() {

      LicenciaEstatutaria licenciaEstatutaria = licenciaEstatutaria();
      Periodo periodo = periodoValido();

      assertThatThrownBy(
              () -> perezJuan.validarNuevaLicencia(licenciaEstatutaria, periodo, Set.of()))
          .isInstanceOf(CampoObligatorioException.class);
    }

    @Test
    @DisplayName("Debe fallar si el empleado está inactivo")
    void deberiaFallarSiEmpleadoEstaInactivo() {

      perezJuan.darDeBajaDefinitiva(CausaBaja.RENUNCIA, LocalDate.of(2025, DECEMBER, 1));

      LicenciaEstatutaria licenciaEstatutaria = licenciaEstatutaria();
      Periodo periodo = periodoValido();
      Set<Asignacion> asignaciones = asignacionesValidas();

      assertThatThrownBy(
              () -> perezJuan.validarNuevaLicencia(licenciaEstatutaria, periodo, asignaciones))
          .isInstanceOf(EmpleadoInactivoException.class);
    }

    @Test
    @DisplayName("Debe fallar si existe una licencia superpuesta")
    void deberiaFallarSiExisteLicenciaSuperpuesta() {

      LicenciaEstatutaria licenciaEstatutaria = licenciaEstatutaria();
      Periodo periodo = periodoValido();
      Set<Asignacion> asignaciones = asignacionesValidas();

      Licencia licencia = mock(Licencia.class);
      when(licencia.seSuperponeCon(periodo)).thenReturn(true);

      perezJuan.agregarLicencia(licencia);

      assertThatThrownBy(
              () -> perezJuan.validarNuevaLicencia(licenciaEstatutaria, periodo, asignaciones))
          .isInstanceOf(LicenciaSuperpuestaException.class);
    }

    @Test
    @DisplayName("Debe fallar si la asignación no pertenece al empleado")
    void deberiaFallarSiAsignacionNoPerteneceAlEmpleado() {

      LicenciaEstatutaria licenciaEstatutaria = licenciaEstatutaria();
      Periodo periodo = periodoValido();

      Asignacion asignacion = mock(Asignacion.class);

      assertThatThrownBy(
              () ->
                  perezJuan.validarNuevaLicencia(licenciaEstatutaria, periodo, Set.of(asignacion)))
          .isInstanceOf(AsignacionNoPerteneceAlEmpleadoException.class);
    }
  }

  @Nested
  @DisplayName("Asignaciones del empleado ")
  class Asignaciones {

    private AsignacionTitular titularPerez;

    @BeforeEach
    void setUp() {
      LocalDate fechaTomaPosesion = LocalDate.of(1998, FEBRUARY, 28);
      titularPerez = plg2467775.registrarTitular(perezJuan, fechaTomaPosesion, 1);
    }

    @Test
    @DisplayName("Debe fallar si la asignación es null")
    void deberiaFallarSiAsignacionEsNull() {

      assertThatThrownBy(() -> perezJuan.agregarAsignacion(null))
          .isInstanceOf(CampoObligatorioException.class);
    }

    //    @Test
    //    @DisplayName("Debe fallar si la asignación se superpone con otra")
    //    void deberiaFallarSiAsignacionSeSuperpone() {
    //
    //      Asignacion asignacion = mock(Asignacion.class);
    //      Designacion designacion = mock(Designacion.class);
    //
    //      when(asignacion.getDesignacion()).thenReturn(designacion);
    //      when(titularPerez.getDesignacion()).thenReturn(designacion);
    //      when(titularPerez.seSuperponeCon(asignacion)).thenReturn(true);
    //
    //      assertThatThrownBy(() -> perezJuan.agregarAsignacion(asignacion))
    //              .isInstanceOf(AsignacionSuperpuestaException.class);
    //    }

    @Test
    @DisplayName("Debe retornar un conjunto vacío cuando no hay asignaciones activas")
    void deberiaRetornarVacioCuandoNoHayAsignacionesActivas() {

      Set<Asignacion> resultado = perezJuan.asignacionesActivasEn(LocalDate.of(1990, JANUARY, 1));

      assertThat(resultado).isEmpty();
    }

    //    @Test
    //    @DisplayName("Debe retornar las asignaciones afectadas por la baja")
    //    void deberiaRetornarAsignacionesAfectadasPorBaja() {
    //
    //      Set<Asignacion> resultado = perezJuan.asignacionesAfectadasPorBaja(LocalDate.of(2026,
    // MARCH, 1));
    //
    //      assertThat(resultado).containsExactly(titularPerez);
    //    }

    //    @Test
    //    @DisplayName("Debe retornar los roles activos del empleado")
    //    void deberiaRetornarRolesActivos() {
    //
    //      List<RolEducativo> resultado = perezJuan.rolesActivosEn(LocalDate.of(2026, MARCH, 1));
    //
    //      assertThat(resultado).containsExactly(RolEducativo.DOCENTE);
    //    }

    @Test
    @DisplayName("Debe retornar una lista vacía cuando no existen roles activos")
    void deberiaRetornarRolesActivosVacios() {

      List<RolEducativo> resultado = perezJuan.rolesActivosEn(LocalDate.of(1990, JANUARY, 1));

      assertThat(resultado).isEmpty();
    }

    @Test
    @Disabled("Falta refactorizar este test")
    @DisplayName("Debe retornar las asignaciones que están en licencia")
    void deberiaRetornarAsignacionesEnLicencia() {

      Licencia licencia = mock(Licencia.class);

      when(licencia.afectaA(titularPerez, LocalDate.of(2026, MARCH, 5))).thenReturn(true);

      perezJuan.agregarLicencia(licencia);

      Set<Asignacion> resultado = perezJuan.asignacionesEnLicenciaEn(LocalDate.of(2026, MARCH, 5));

      assertThat(resultado).containsExactly(titularPerez);
    }
  }
}
