package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.enums.*;
import com.gestion.escuela.gestion_escolar.models.exceptions.*;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionNoActivaDelEmpleadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.LicenciaSuperpuestaException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Month;
import java.util.Optional;
import java.util.Set;

import static com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana.*;
import static com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion.ACTIVA;
import static com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion.LICENCIA;
import static com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion.CUBIERTA;
import static com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion.VACANTE;
import static com.gestion.escuela.gestion_escolar.models.enums.Turno.MANIANA;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class EmpleadoEducativoTest {

	private Escuela escuela;
	private EmpleadoEducativo leguizamonMarina;
	private EmpleadoEducativo giardinoNoraRosa;
	private EmpleadoEducativo vallejosValeria;
	private DesignacionAdministrativa direccion2467830;
	private DesignacionAdministrativa auxiliar2330001;
	private DesignacionCurso designacion2467775;
	private DesignacionCurso designacion2467791;
	private DesignacionCurso designacion2467811;
	private LocalDate fechaNacimientoGiardino;

	@BeforeEach
	void setUp() {
		escuela = crearEscuela65Bernal();

		fechaNacimientoGiardino = LocalDate.of(1961, Month.NOVEMBER, 10);

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
				fechaNacimientoGiardino,
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
	@DisplayName("Creación de empleado")
	class Creacion {

		@Test
		@DisplayName("Debe crear empleado válido")
		void creaEmpleadoValido() {

			assertTrue(giardinoNoraRosa.isActivo());
			assertEquals("Nora Rosa", giardinoNoraRosa.getNombre());

		}

		@Test
		@DisplayName("Debe fallar si escuela es null")
		void fallaSiEscuelaEsNull() {
			assertThrows(
					CampoObligatorioException.class,
					() -> new EmpleadoEducativo(
							null,
							"27-14762038-7",
							"Nora Rosa",
							"Giardino",
							null,
							null,
							fechaNacimientoGiardino,
							null,
							"mail@test.com"
					)
			);
		}

		@ParameterizedTest(name = "Debe fallar con cuil = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el cuil es null, vacío o solo espacios")
		void fallaSiCuilInvalido(String cuilInvalido) {
			assertThrows(
					CampoObligatorioException.class,
					() -> new EmpleadoEducativo(
							mock(Escuela.class),
							cuilInvalido,
							"Juan",
							"Perez",
							null,
							null,
							fechaNacimientoGiardino,
							null,
							"mail@test.com"
					)
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
					() -> new EmpleadoEducativo(
							mock(Escuela.class),
							cuilInvalido,
							"Juan",
							"Perez",
							null,
							null,
							fechaNacimientoGiardino,
							null,
							"mail@test.com"
					)
			);
		}

		@ParameterizedTest(name = "Debe fallar con nombre = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el nombre es null, vacío o solo espacios")
		void fallaSiNombreInvalido(String nombreInvalido) {

			assertThrows(
					CampoObligatorioException.class,
					() -> new EmpleadoEducativo(
							mock(Escuela.class),
							"27-14762038-7",
							nombreInvalido,
							"Perez",
							null,
							null,
							fechaNacimientoGiardino,
							null,
							"mail@test.com"
					)
			);
		}

		@ParameterizedTest(name = "Debe fallar con apellido = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el apellido es null, vacío o solo espacios")
		void fallaSiApellidoInvalido(String apellidoInvalido) {

			assertThrows(
					CampoObligatorioException.class,
					() -> new EmpleadoEducativo(
							mock(Escuela.class),
							"27-14762038-7",
							"Nora Rosa",
							apellidoInvalido,
							null,
							null,
							fechaNacimientoGiardino,
							null,
							"mail@test.com"
					)
			);
		}

		@ParameterizedTest(name = "Debe fallar con email = ''{0}''")
		@NullAndEmptySource
		@ValueSource(strings = {" "})
		@DisplayName("Debe fallar si el email es null, vacío o solo espacios")
		void fallaSiEmailBlank(String emailInvalido) {

			assertThrows(
					CampoObligatorioException.class,
					() -> new EmpleadoEducativo(
							mock(Escuela.class),
							"27-14762038-7",
							"Nora Rosa",
							"Giardino",
							null,
							null,
							fechaNacimientoGiardino,
							null,
							emailInvalido
					)
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
					() -> new EmpleadoEducativo(
							mock(Escuela.class),
							"27-14762038-7",
							"Nora Rosa",
							"Giardino",
							null,
							null,
							fechaNacimientoGiardino,
							null,
							emailInvalido
					)
			);
		}

		@Test
		@DisplayName("Debe fallar si fecha de nacimiento es null")
		void fallaSiFechaNacimientoEsNull() {
			assertThrows(
					CampoObligatorioException.class,
					() -> new EmpleadoEducativo(
							mock(Escuela.class),
							"27-14762038-7",
							"Nora Rosa",
							"Giardino",
							null,
							null,
							null,
							null,
							"mail@test.com"
					)
			);
		}

		@Test
		@DisplayName("Debe fallar si la fecha de ingreso es anterior a la fecha de nacimiento")
		void fallaSiFechaIngresoEsAnteriorANacimiento() {

			assertThrows(
					RangoFechasInvalidoException.class,
					() -> new EmpleadoEducativo(
							mock(Escuela.class),
							"27-14762038-7",
							"Nora Rosa",
							"Giardino",
							null,
							null,
							LocalDate.of(1990, Month.JANUARY, 1),  // nacimiento
							LocalDate.of(1980, Month.JANUARY, 1),  // ingreso anterior ❌
							"mail@test.com"
					)
			);
		}

		@Test
		@DisplayName("Debe permitir fecha de ingreso null")
		void permiteIngresoNull() {

			EmpleadoEducativo emp = new EmpleadoEducativo(
					mock(Escuela.class),
					"27-14762038-7",
					"Nora Rosa",
					"Giardino",
					null,
					null,
					LocalDate.of(1990, Month.JANUARY, 1),
					null,
					"mail@test.com"
			);

			assertNotNull(emp);
		}

	}

	@Nested
	@DisplayName("Crear licencia")
	class CrearLicencia {

		private Periodo periodo;

		@BeforeEach
		void setUp() {
			periodo = new Periodo(
					LocalDate.of(2025, 3, 1),
					LocalDate.of(2025, 3, 10)
			);
		}

		@Test
		@DisplayName("Debe crear una licencia válida y agregarla al empleado")
		void creaLicenciaValida() {

			Periodo periodo = new Periodo(
					LocalDate.of(2025, 3, 1),
					LocalDate.of(2025, 3, 10)
			);

			// 🔹 Creamos designación y asignación activa
			Designacion designacion = mock(Designacion.class);
			Asignacion asignacion = mock(Asignacion.class);

			when(asignacion.estaActivaEn(periodo.getFechaDesde()))
					.thenReturn(true);

			when(asignacion.getDesignacion())
					.thenReturn(designacion);

			giardinoNoraRosa.agregarAsignacion(asignacion);

			Licencia licencia = giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_115D1,
					periodo,
					"Descanso médico",
					Set.of(designacion)
			);

			assertNotNull(licencia);
			assertEquals(1, giardinoNoraRosa.getLicencias().size());
			assertTrue(giardinoNoraRosa.getLicencias().contains(licencia));
			assertEquals(periodo, licencia.getPeriodo());
			assertEquals(TipoLicencia.L_115D1, licencia.getTipoLicencia());
		}

		@Test
		@DisplayName("Debe fallar si tipo de licencia es null")
		void fallaSiTipoEsNull() {
			assertThrows(
					CampoObligatorioException.class,
					() -> giardinoNoraRosa.crearLicencia(
							null,
							periodo,
							"Descanso",
							Set.of(mock(Designacion.class))
					)
			);
		}

		@Test
		@DisplayName("Debe fallar si periodo es null")
		void fallaSiPeriodoEsNull() {
			assertThrows(
					CampoObligatorioException.class,
					() -> giardinoNoraRosa.crearLicencia(
							TipoLicencia.L_115D1,
							null,
							"Descanso",
							Set.of(mock(Designacion.class))
					)
			);
		}

		@Test
		@DisplayName("Debe fallar si el empleado está inactivo")
		void fallaSiEmpleadoInactivo() {

			giardinoNoraRosa.setActivo(false); // TODO: Cambiar esto por darBajaDefinitiva despues, ES MOMENTANEO

			assertThrows(
					EmpleadoInactivoException.class,
					() -> giardinoNoraRosa.crearLicencia(
							TipoLicencia.L_115D1,
							periodo,
							"Descanso",
							Set.of(mock(Designacion.class))
					)
			);
		}

		@Test
		@DisplayName("Debe fallar si la licencia se superpone con otra existente")
		void fallaSiLicenciaSuperpuesta() {

			Periodo p1 = new Periodo(
					LocalDate.of(2025, 3, 1),
					LocalDate.of(2025, 3, 10)
			);

			Periodo p2 = new Periodo(
					LocalDate.of(2025, 3, 5),
					LocalDate.of(2025, 3, 15)
			);

			Designacion designacion = mock(Designacion.class);
			Asignacion asignacion = mock(Asignacion.class);

			when(asignacion.estaActivaEn(any())).thenReturn(true);
			when(asignacion.getDesignacion()).thenReturn(designacion);

			giardinoNoraRosa.agregarAsignacion(asignacion);

			giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_115D1,
					p1,
					"Primera",
					Set.of(designacion)
			);

			assertThrows(
					LicenciaSuperpuestaException.class,
					() -> giardinoNoraRosa.crearLicencia(
							TipoLicencia.L_115D1,
							p2,
							"Segunda",
							Set.of(designacion)
					)
			);
		}

		@Test
		@DisplayName("Debe fallar si designaciones está vacía")
		void fallaSiDesignacionesVacia() {

			assertThrows(
					IllegalArgumentException.class,
					() -> giardinoNoraRosa.crearLicencia(
							TipoLicencia.L_115D1,
							periodo,
							"Descanso",
							Set.of()
					)
			);
		}

		@Test
		@DisplayName("Debe fallar si designaciones es null")
		void fallaSiDesignacionesNull() {

			assertThrows(
					IllegalArgumentException.class,
					() -> giardinoNoraRosa.crearLicencia(
							TipoLicencia.L_115D1,
							periodo,
							"Descanso",
							null
					)
			);
		}


		@Test
		@DisplayName("Debe fallar si la designación no está activa en la fecha")
		void fallaSiDesignacionNoActiva() {

			Designacion designacion = mock(Designacion.class);

			assertThrows(
					DesignacionNoActivaDelEmpleadoException.class,
					() -> giardinoNoraRosa.crearLicencia(
							TipoLicencia.L_115D1,
							periodo,
							"Descanso",
							Set.of(designacion)
					)
			);
		}

	}

	@Nested
	@DisplayName("Baja definitiva")
	class BajaDefinitiva {

		@Test
		@DisplayName("Debe fallar si causa de baja es null")
		void fallaSiCausaBajaEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> giardinoNoraRosa.darDeBajaDefinitiva(
							null,
							LocalDate.now()
					)
			);
		}

		@Test
		@DisplayName("Debe fallar si fecha de baja es null")
		void fallaSiFechaBajaEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> giardinoNoraRosa.darDeBajaDefinitiva(
							CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES,
							null
					)
			);
		}

//		@Test
//		@DisplayName("Titular en licencia renuncia y el suplente activo se convierte en provisional")
//		void titularEnLicenciaRenunciaYSuplenteSeConvierteEnProvisional() {
//
//			// Arrange
//			LocalDate fechaTomaPosesion = LocalDate.of(2004, Month.JULY, 21);
//			AsignacionTitular titular = auxiliar2330001.cubrirConTitular(leguizamonMarina, fechaTomaPosesion);
//
//			assertEquals(CUBIERTA, auxiliar2330001.getEstadoEn(fechaTomaPosesion));
//			assertEquals(ACTIVA, titular.getEstadoEn(fechaTomaPosesion));
//
//			LocalDate fechaInicio = LocalDate.of(2025, Month.MARCH, 1);
//			LocalDate fechaFin = LocalDate.of(2025, Month.JUNE, 1);
//			Periodo periodoLicencia = new Periodo(fechaInicio, fechaFin);
//
//			Licencia licencia = leguizamonMarina.crearLicencia(
//					TipoLicencia.L_115A1,
//					periodoLicencia,
//					"Reposo",
//					Set.of(auxiliar2330001)
//			);
//
//			assertEquals(LICENCIA, titular.getEstadoEn(periodoLicencia.getFechaDesde()));
//			assertEquals(VACANTE, auxiliar2330001.getEstadoEn(licencia.getPeriodo().getFechaDesde()));
//			assertTrue((leguizamonMarina.getLicencias().contains(licencia)));
//
//			AsignacionSuplente suplente =
//					auxiliar2330001.cubrirConSuplente(
//							licencia,
//							vallejosValeria,
//							periodoLicencia.getFechaDesde()
//					);
//
//			assertEquals(ACTIVA, suplente.getEstadoEn(periodoLicencia.getFechaDesde()));
//			assertEquals(CUBIERTA, auxiliar2330001.getEstadoEn(licencia.getPeriodo().getFechaDesde()));
//
//			// Act
//			LocalDate fechaBaja = LocalDate.of(2025, Month.APRIL, 1);
//			leguizamonMarina.darDeBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);
//
//			// Assert
//			assertEquals(EstadoAsignacion.BAJA, titular.getEstadoEn(fechaBaja));
//			assertEquals(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, titular.getBajaAsignacion().getCausa());
//			assertEquals(fechaBaja, titular.getBajaAsignacion().getFechaBaja());
//
//			assertEquals(EstadoAsignacion.BAJA, suplente.getEstadoEn(fechaBaja));
//			assertEquals(CausaBaja.PASE_DE_SUPLENTE_A_PROVISIONAL, suplente.getBajaAsignacion().getCausa());
//			assertEquals(fechaBaja, suplente.getBajaAsignacion().getFechaBaja());
//
//			LocalDate fechaBajaDiaSiguiente = fechaBaja.plusDays(1);
//
//			assertEquals(CUBIERTA, auxiliar2330001.getEstadoEn(fechaBajaDiaSiguiente));
//
//			Asignacion asignacionActual = auxiliar2330001.asignacionQueEjerceEn(fechaBajaDiaSiguiente).orElseThrow();
//
//			assertEquals(ACTIVA, asignacionActual.getEstadoEn(fechaBajaDiaSiguiente));
//			assertEquals(SituacionDeRevista.PROVISIONAL, asignacionActual.getSituacionDeRevista());
//			assertEquals(vallejosValeria, asignacionActual.getEmpleadoEducativo());
//			assertFalse(asignacionActual.estaDadaDeBajaEn(fechaBajaDiaSiguiente));
//
//			assertFalse(leguizamonMarina.isActivo());
//
//		}

		@Test
		@DisplayName("Provisional activo renuncia definitivamente y la designación queda vacante")
		void provisionalActivoRenunciaYLaDesignacionQuedaVacante() {

			// Arrange
			LocalDate fechaTomaPosesion = LocalDate.of(2017, Month.JUNE, 7);
			LocalDate fechaCese = LocalDate.of(2018, Month.FEBRUARY, 28);
			Periodo periodoProvisional = new Periodo(fechaTomaPosesion, fechaCese);
			AsignacionProvisional provisional = direccion2467830.cubrirConProvisionalManual(giardinoNoraRosa, periodoProvisional);

			assertEquals(CUBIERTA, direccion2467830.getEstadoEn(fechaTomaPosesion));
			assertEquals(ACTIVA, provisional.getEstadoEn(fechaTomaPosesion));

			// Act
			LocalDate fechaBaja = LocalDate.of(2017, Month.AUGUST, 1);
			giardinoNoraRosa.darDeBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fechaBaja);

			// Assert
			assertFalse(giardinoNoraRosa.isActivo());

			assertEquals(EstadoAsignacion.BAJA, provisional.getEstadoEn(fechaBaja));
			assertEquals(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, provisional.getBajaAsignacion().getCausa());
			assertEquals(fechaBaja, provisional.getBajaAsignacion().getFechaBaja());

			assertEquals(VACANTE, direccion2467830.getEstadoEn(fechaBaja));

		}


	}

	@Nested
	@DisplayName("Actualización de empleado")
	class Actualizacion {

		@Test
		@DisplayName("Debe actualizar correctamente los datos del empleado")
		void actualizaCorrectamenteLosDatos() {

			// Arrange
			LocalDate nuevaFechaNacimiento = LocalDate.of(1991, 5, 10);
			LocalDate nuevaFechaIngreso = LocalDate.of(2020, 3, 1);

			// Act
			giardinoNoraRosa.actualizar(
					"20-12345678-9",
					"Nuevo Nombre",
					"Nuevo Apellido",
					"Nueva dirección",
					"123456",
					nuevaFechaNacimiento,
					nuevaFechaIngreso,
					"nuevo@mail.com"
			);

			// Assert
			assertEquals("20-12345678-9", giardinoNoraRosa.getCuil());
			assertEquals("Nuevo Nombre", giardinoNoraRosa.getNombre());
			assertEquals("Nuevo Apellido", giardinoNoraRosa.getApellido());
			assertEquals("Nueva dirección", giardinoNoraRosa.getDomicilio());
			assertEquals("123456", giardinoNoraRosa.getTelefono());
			assertEquals(nuevaFechaNacimiento, giardinoNoraRosa.getFechaDeNacimiento());
			assertEquals(nuevaFechaIngreso, giardinoNoraRosa.getFechaDeIngreso());
			assertEquals("nuevo@mail.com", giardinoNoraRosa.getEmail());
		}

	}

	@Nested
	@DisplayName("Consultas con fecha null")
	class ConsultasConFechaNull {

		@Test
		@DisplayName("licenciaActivaEn debe devolver Optional.empty si fecha es null")
		void licenciaActivaEnFechaNull() {

			Optional<Licencia> resultado = giardinoNoraRosa.licenciaActivaEn(null);

			assertTrue(resultado.isEmpty());
		}

		@Test
		@DisplayName("asignacionesActivasEn debe devolver Set vacío si fecha es null")
		void asignacionesActivasEnFechaNull() {

			Set<Asignacion> resultado = giardinoNoraRosa.asignacionesActivasEn(null);

			assertTrue(resultado.isEmpty());
		}

		@Test
		@DisplayName("designacionesActivasEn debe devolver Set vacío si fecha es null")
		void designacionesActivasEnFechaNull() {

			Set<Designacion> resultado = giardinoNoraRosa.designacionesActivasEn(null);

			assertTrue(resultado.isEmpty());
		}

		@Test
		@DisplayName("asignacionesEnLicenciaEn debe devolver Set vacío si fecha es null")
		void asignacionesEnLicenciaEnFechaNull() {

			Set<Asignacion> resultado = giardinoNoraRosa.asignacionesEnLicenciaEn(null);

			assertTrue(resultado.isEmpty());
		}

	}

	@Nested
	@DisplayName("Dias que no trabaja por licencia")
	class DiasQueNoTrabajaPorLicencia {

		private DesignacionCurso crearDesignacionCurso(
				Integer cupof,
				Materia materia,
				Curso curso
		) {
			return new DesignacionCurso(escuela, cupof, materia, curso);
		}

		private FranjaHoraria crearFranja(
				DiaDeSemana dia,
				int hDesde,
				int mDesde,
				int hHasta,
				int mHasta
		) {
			return new FranjaHoraria(
					dia,
					LocalTime.of(hDesde, mDesde),
					LocalTime.of(hHasta, mHasta)
			);
		}

		@BeforeEach
		void setUp() {

			Materia practicasDelLenguaje = new Materia("Practicas del Lenguaje", "PLG", 4);

			Curso a1g1 = new Curso(MANIANA, 1, 1);
			Curso a2g1 = new Curso(MANIANA, 2, 1);
			Curso a3g1 = new Curso(MANIANA, 3, 1);

			designacion2467775 = crearDesignacionCurso(2467775, practicasDelLenguaje, a1g1);
			designacion2467791 = crearDesignacionCurso(2467791, practicasDelLenguaje, a2g1);
			designacion2467811 = crearDesignacionCurso(2467811, practicasDelLenguaje, a3g1);

			designacion2467775.agregarFranjaHoraria(crearFranja(LUNES, 12, 0, 13, 0));
			designacion2467775.agregarFranjaHoraria(crearFranja(VIERNES, 9, 45, 10, 45));
			designacion2467775.agregarFranjaHoraria(crearFranja(VIERNES, 11, 0, 12, 0));
			designacion2467775.agregarFranjaHoraria(crearFranja(VIERNES, 12, 0, 13, 0));

			designacion2467791.agregarFranjaHoraria(crearFranja(LUNES, 7, 30, 8, 30));
			designacion2467791.agregarFranjaHoraria(crearFranja(LUNES, 8, 45, 9, 45));
			designacion2467791.agregarFranjaHoraria(crearFranja(VIERNES, 9, 45, 10, 45));
			designacion2467791.agregarFranjaHoraria(crearFranja(VIERNES, 11, 0, 12, 0));

			designacion2467811.agregarFranjaHoraria(crearFranja(JUEVES, 9, 45, 10, 45));
			designacion2467811.agregarFranjaHoraria(crearFranja(JUEVES, 11, 0, 12, 0));
			designacion2467811.agregarFranjaHoraria(crearFranja(JUEVES, 12, 0, 13, 0));
			designacion2467811.agregarFranjaHoraria(crearFranja(VIERNES, 11, 0, 12, 0));

		}

		@Test
		@DisplayName("cuando toma licencia en varias designaciones activas libera todas y calcula los dias afectados")
		void tomaLicenciaEnVariasDesignacionesYCalculaDiasAfectados() {

			LocalDate fechaTomaPosesion = LocalDate.of(1998, Month.MARCH, 1);

			AsignacionTitular asignacionTitular1 = designacion2467775.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion);
			AsignacionTitular asignacionTitular2 = designacion2467791.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion);
			AsignacionTitular asignacionTitular3 = designacion2467811.cubrirConTitular(giardinoNoraRosa, fechaTomaPosesion);

			assertEquals(CUBIERTA, designacion2467775.getEstadoEn(fechaTomaPosesion));
			assertEquals(CUBIERTA, designacion2467791.getEstadoEn(fechaTomaPosesion));
			assertEquals(CUBIERTA, designacion2467811.getEstadoEn(fechaTomaPosesion));

			assertEquals(ACTIVA, asignacionTitular1.getEstadoEn(fechaTomaPosesion));
			assertEquals(ACTIVA, asignacionTitular2.getEstadoEn(fechaTomaPosesion));
			assertEquals(ACTIVA, asignacionTitular3.getEstadoEn(fechaTomaPosesion));

			Periodo periodoLicencia = new Periodo(fechaTomaPosesion, null);

			Licencia licencia = giardinoNoraRosa.crearLicencia(
					TipoLicencia.L_115D1,
					periodoLicencia,
					null,
					Set.of(designacion2467775, designacion2467791, designacion2467811)
			);

			assertEquals(VACANTE, designacion2467775.getEstadoEn(fechaTomaPosesion));
			assertEquals(VACANTE, designacion2467791.getEstadoEn(fechaTomaPosesion));
			assertEquals(VACANTE, designacion2467811.getEstadoEn(fechaTomaPosesion));

			assertEquals(LICENCIA, asignacionTitular1.getEstadoEn(fechaTomaPosesion));
			assertEquals(LICENCIA, asignacionTitular2.getEstadoEn(fechaTomaPosesion));
			assertEquals(LICENCIA, asignacionTitular3.getEstadoEn(fechaTomaPosesion));

			Licencia licenciaActiva = giardinoNoraRosa.licenciaActivaEn(fechaTomaPosesion).orElseThrow();

			assertEquals(licenciaActiva, licencia);

			assertEquals(Set.of(LUNES, JUEVES, VIERNES), giardinoNoraRosa.diasQueNoTrabajaPorLicencia(fechaTomaPosesion));

		}


	}


}