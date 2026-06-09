package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.*;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionNoVacantePorLicenciaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionYaCubiertaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionYaTieneTitularException;
import com.gestion.escuela.gestion_escolar.models.exceptions.franjaHoraria.RangoHorarioInvalidoException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
import java.util.Set;

import static com.gestion.escuela.gestion_escolar.models.Periodo.abierto;
import static com.gestion.escuela.gestion_escolar.models.Periodo.cerrado;
import static com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana.*;
import static java.time.Month.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class DesignacionCursoTest extends DomainTestFixture {

	@Nested
	class Constructor {

		@Test
		void deberiaCrearDesignacionCursoCorrectamente() {

			DesignacionCurso plg24677783 = new DesignacionCurso(
					escuelaN65,
					24677783,
					practicasDelLenguaje,
					a1g2,
					"Bachiller de Ciclo Básico"
			);

			assertAll(
					() -> assertEquals(escuelaN65, plg24677783.getEscuela()),
					() -> assertEquals(24677783, plg24677783.getCupof()),
					() -> assertEquals(RolEducativo.DOCENTE, plg24677783.getRolEducativo()),

					() -> assertEquals(practicasDelLenguaje, plg24677783.getMateria()),
					() -> assertEquals(a1g2, plg24677783.getCurso()),
					() -> assertEquals("Bachiller de Ciclo Básico", plg24677783.getOrientacion()),

					() -> assertTrue(plg24677783.getAsignaciones().isEmpty()),
					() -> assertTrue(plg24677783.getFranjasHorarias().isEmpty())
			);
		}

		@Test
		void noDeberiaPermitirEscuelaNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new DesignacionCurso(
							null,
							24677783,
							practicasDelLenguaje,
							a1g2,
							"Bachiller de Ciclo Básico"
					)
			);
		}

		@Test
		void noDeberiaPermitirCupofNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new DesignacionCurso(
							escuelaN65,
							null,
							practicasDelLenguaje,
							a1g2,
							"Bachiller de Ciclo Básico"
					)
			);
		}

		@Test
		void noDeberiaPermitirMateriaNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new DesignacionCurso(
							escuelaN65,
							1234,
							null,
							a1g2,
							"Bachiller de Ciclo Básico"
					)
			);
		}

		@Test
		void noDeberiaPermitirCursoNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new DesignacionCurso(
							escuelaN65,
							1234,
							practicasDelLenguaje,
							null,
							"Bachiller de Ciclo Básico"
					)
			);
		}

		@Test
		void noDeberiaPermitirOrientacionNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new DesignacionCurso(
							escuelaN65,
							1234,
							practicasDelLenguaje,
							a1g2,
							null
					)
			);
		}

		@Test
		void noDeberiaPermitirOrientacionVacia() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new DesignacionCurso(
							escuelaN65,
							1234,
							practicasDelLenguaje,
							a1g2,
							""
					)
			);
		}

		@Test
		void noDeberiaPermitirOrientacionConSoloEspacios() {

			assertThrows(
					CampoObligatorioException.class,
					() -> new DesignacionCurso(
							escuelaN65,
							1234,
							practicasDelLenguaje,
							a1g2,
							"   "
					)
			);
		}
	}

	@Nested
	class GestionDeFranjasHorarias {

		private DesignacionCurso plg24677783;

		@BeforeEach
		void setUp() {

			plg24677783 = new DesignacionCurso(
					escuelaN65,
					24677783,
					practicasDelLenguaje,
					a1g2,
					"Bachiller de Ciclo Básico"
			);
		}

		@Test
		void deberiaAgregarFranjaHoraria() {

			plg24677783.agregarFranjaHoraria(lunes730a930());

			assertAll(
					() -> assertTrue(plg24677783.getFranjasHorarias().contains(lunes730a930())),
					() -> assertEquals(1, plg24677783.getFranjasHorarias().size())
			);
		}

		@Test
		void noDeberiaPermitirAgregarFranjaNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> plg24677783.agregarFranjaHoraria(null)
			);
		}

		@Test
		void noDeberiaPermitirFranjasSolapadas() {

			FranjaHoraria primera = lunes730a930();

			FranjaHoraria solapada = lunes800a1000();

			plg24677783.agregarFranjaHoraria(primera);

			assertThrows(
					RangoHorarioInvalidoException.class,
					() -> plg24677783.agregarFranjaHoraria(solapada)
			);
		}

		@Test
		void deberiaReemplazarFranjasHorarias() {

			FranjaHoraria lunes = lunes730a930();

			FranjaHoraria martes = martes1000a1200();

			plg24677783.agregarFranjaHoraria(lunes);

			plg24677783.setFranjasHorarias(Set.of(martes));

			assertAll(
					() -> assertFalse(plg24677783.getFranjasHorarias().contains(lunes)),
					() -> assertTrue(plg24677783.getFranjasHorarias().contains(martes)),
					() -> assertEquals(1, plg24677783.getFranjasHorarias().size())
			);
		}

		@Test
		void noDeberiaPermitirSetearFranjasNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> plg24677783.setFranjasHorarias(null)
			);
		}

		@Test
		void deberiaIndicarQueTrabajaElDia() {

			plg24677783.agregarFranjaHoraria(lunes730a930());

			assertTrue(
					plg24677783.trabajaElDia(
							LocalDate.of(2026, MAY, 25)
					)
			);
		}

		@Test
		void deberiaIndicarQueNoTrabajaElDia() {

			plg24677783.agregarFranjaHoraria(lunes730a930());

			assertFalse(plg24677783.trabajaElDia(LocalDate.of(2026, 5, 26)));
		}

		@Test
		void deberiaRetornarFalseSiFechaEsNull() {

			assertFalse(plg24677783.trabajaElDia(null));
		}

		private FranjaHoraria lunes730a930() {
			return new FranjaHoraria(
					LUNES,
					LocalTime.of(7,30),
					LocalTime.of(9,30)
			);
		}

		private FranjaHoraria lunes800a1000() {
			return new FranjaHoraria(
					LUNES,
					LocalTime.of(8,0),
					LocalTime.of(10,0)
			);
		}

		private FranjaHoraria martes1000a1200() {
			return new FranjaHoraria(
					MARTES,
					LocalTime.of(10,0),
					LocalTime.of(12,0)
			);
		}

		private FranjaHoraria miercoles1330a1530() {
			return new FranjaHoraria(
					MIERCOLES,
					LocalTime.of(13,30),
					LocalTime.of(15,30)
			);
		}

		private FranjaHoraria jueves1400a1600() {
			return new FranjaHoraria(
					JUEVES,
					LocalTime.of(14,0),
					LocalTime.of(16,0)
			);
		}

		private FranjaHoraria viernes0800a1000() {
			return new FranjaHoraria(
					VIERNES,
					LocalTime.of(8,0),
					LocalTime.of(10,0)
			);
		}
	}

	@Nested
	class GestionDeAsignaciones {

		private DesignacionCurso plg2467783;

		@BeforeEach
		void setUp() {
			plg2467783 = new DesignacionCurso(
					escuelaN65,
					2467783,
					practicasDelLenguaje,
					a1g2,
					"Bachiller de Ciclo Básico"
			);
		}

		@Test
		void deberiaAgregarAsignacion() {

			AsignacionTitular titular = new AsignacionTitular(
					marchettiRoman,
					plg2467783,
					abierto(LocalDate.of(1998, MARCH, 1)),
					1
			);

			plg2467783.agregarAsignacion(titular);

			assertAll(
					() -> assertTrue(plg2467783.getAsignaciones().contains(titular)),
					() -> assertEquals(plg2467783, titular.getDesignacion()),
					() -> assertTrue(marchettiRoman.getAsignaciones().contains(titular)),
					() -> assertEquals(1, plg2467783.getAsignaciones().size())
			);
		}

		@Test
		void noDeberiaPermitirAgregarAsignacionNull() {

			assertThrows(CampoObligatorioException.class, () -> plg2467783.agregarAsignacion(null));
		}

		@Test
		void noDeberiaPermitirAgregarAsignacionSiYaExisteUnaQueEjerceEnLaMismaFecha() {

			AsignacionTitular titular = new AsignacionTitular(
					marchettiRoman,
					plg2467783,
					abierto(LocalDate.of(2026, MARCH, 1)),
					1
			);

			AsignacionProvisional provisional = new AsignacionProvisional(
					giardinoNoraRosa,
					plg2467783,
					abierto(LocalDate.of(2026, MARCH, 1)),
					2
			);

			plg2467783.agregarAsignacion(titular);

			assertThrows(
					DesignacionYaCubiertaException.class,
					() -> plg2467783.agregarAsignacion(provisional)
			);
		}

		@Test
		void deberiaEliminarAsignacion() {

			AsignacionTitular titular = new AsignacionTitular(
					marchettiRoman,
					plg2467783,
					abierto(LocalDate.of(2026, MARCH, 1)),
					1
			);

			plg2467783.agregarAsignacion(titular);

			plg2467783.eliminarAsignacion(titular);

			assertAll(
					() -> assertFalse(plg2467783.getAsignaciones().contains(titular)),
					() -> assertFalse(marchettiRoman.getAsignaciones().contains(titular))
			);
		}

		@Test
		void deberiaRetornarAsignacionQueEjerceEnFecha() {

			LocalDate fechaTomaPosesion = LocalDate.of(2026, MARCH, 1);
			AsignacionTitular titular = new AsignacionTitular(
					marchettiRoman,
					plg2467783,
					abierto(fechaTomaPosesion),
					1
			);

			plg2467783.agregarAsignacion(titular);

			Optional<Asignacion> resultado = plg2467783.asignacionQueEjerceEn(fechaTomaPosesion);

			assertTrue(resultado.isPresent());
			assertEquals(titular, resultado.get());
		}

		@Test
		void deberiaRetornarOptionalVacioSiNoHayAsignacionQueEjerce() {

			Optional<Asignacion> resultado =
					plg2467783.asignacionQueEjerceEn(LocalDate.of(2026, MARCH, 10));

			assertTrue(resultado.isEmpty());
		}

		@Test
		void deberiaRetornarOptionalVacioSiFechaEsNull() {

			Optional<Asignacion> resultado = plg2467783.asignacionQueEjerceEn((LocalDate) null);

			assertTrue(resultado.isEmpty());
		}

		@Test
		void deberiaRetornarEmpleadoActivoEnFecha() {

			AsignacionTitular titular = new AsignacionTitular(
					marchettiRoman,
					plg2467783,
					abierto(LocalDate.of(2026, MARCH, 1)),
					1
			);

			plg2467783.agregarAsignacion(titular);

			Optional<EmpleadoEducativo> resultado =
					plg2467783.getEmpleadoActivoEn(LocalDate.of(2026, MARCH, 10));

			assertTrue(resultado.isPresent());
			assertEquals(marchettiRoman, resultado.get());
		}

		@Test
		void deberiaIndicarQueTieneTitularActivo() {

			AsignacionTitular titular = new AsignacionTitular(
					marchettiRoman,
					plg2467783,
					abierto(LocalDate.of(2026, MARCH, 1)),
					1
			);

			plg2467783.agregarAsignacion(titular);

			assertTrue(plg2467783.tieneTitularActivo(LocalDate.of(2026, MARCH, 10)));
		}

		@Test
		void deberiaIndicarQueNoTieneTitularActivo() {
			assertFalse(plg2467783.tieneTitularActivo(LocalDate.of(2026, MARCH, 10)));
		}

		@Test
		void deberiaIndicarQueEstaCubiertaEnFecha() {

			AsignacionTitular titular = new AsignacionTitular(
					marchettiRoman,
					plg2467783,
					abierto(LocalDate.of(2026, MARCH, 1)),
					1
			);

			plg2467783.agregarAsignacion(titular);

			assertTrue(plg2467783.estaCubiertaEn(LocalDate.of(2026, MARCH, 10))
			);
		}

		@Test
		void deberiaIndicarQueNoEstaCubiertaEnFecha() {
			assertFalse(plg2467783.estaCubiertaEn(LocalDate.of(2026, 3, 10)));
		}

		@Test
		void deberiaIndicarQueTieneAsignacionSuperpuesta() {

			AsignacionTitular titular = new AsignacionTitular(
					marchettiRoman,
					plg2467783,
					cerrado(LocalDate.of(2026, MARCH, 1),
							LocalDate.of(2026, JUNE, 1)
					),
					1
			);

			plg2467783.agregarAsignacion(titular);

			boolean resultado = plg2467783.tieneAsignacionQueSeSuperponeCon(
							cerrado(LocalDate.of(2026, MAY, 1),
									LocalDate.of(2026, JULY, 1))
			);

			assertTrue(resultado);
		}

		@Test
		void deberiaIndicarQueNoTieneAsignacionSuperpuesta() {

			AsignacionTitular titular = new AsignacionTitular(
					marchettiRoman,
					plg2467783,
					cerrado(LocalDate.of(2026, MARCH, 1),
							LocalDate.of(2026, APRIL, 1)
					),
					1
			);

			plg2467783.agregarAsignacion(titular);

			boolean resultado = plg2467783.tieneAsignacionQueSeSuperponeCon(
					cerrado(LocalDate.of(2026, MAY, 1),
							LocalDate.of(2026, JULY, 1)
					)
			);

			assertFalse(resultado);
		}
	}

	@Nested
	class Cobertura {

		private DesignacionCurso plg2467783;

		@BeforeEach
		void setUp() {
			plg2467783 = new DesignacionCurso(
					escuelaN65,
					2467783,
					practicasDelLenguaje,
					a1g2,
					"Bachiller de Ciclo Básico"
			);
		}

		@Test
		void deberiaCubrirConTitular() {

			AsignacionTitular titular = plg2467783.cubrirConTitular(
					marchettiRoman,
					LocalDate.of(2026, MARCH, 1),
					1
			);

			assertAll(
					() -> assertEquals(marchettiRoman, titular.getEmpleadoEducativo()),
					() -> assertEquals(plg2467783, titular.getDesignacion()),
					() -> assertEquals(
							LocalDate.of(2026, MARCH, 1),
							titular.getPeriodo().getFechaDesde()
					),
					() -> assertNull(titular.getPeriodo().getFechaHasta()),
					() -> assertEquals(1, titular.getSecuencia()),
					() -> assertTrue(plg2467783.getAsignaciones().contains(titular)),
					() -> assertTrue(marchettiRoman.getAsignaciones().contains(titular))
			);
		}

		@Test
		void deberiaCubrirConProvisionalAutomatico() {

			AsignacionProvisional provisional =
					plg2467783.cubrirConProvisionalAutomatico(
							marchettiRoman,
							LocalDate.of(2026, MARCH, 1),
							1
					);

			assertAll(
					() -> assertEquals(marchettiRoman, provisional.getEmpleadoEducativo()),
					() -> assertEquals(plg2467783, provisional.getDesignacion()),
					() -> assertEquals(
							LocalDate.of(2026, MARCH, 1),
							provisional.getPeriodo().getFechaDesde()
					),
					() -> assertNotNull(provisional.getPeriodo().getFechaHasta()),
					() -> assertEquals(1, provisional.getSecuencia()),

					() -> assertTrue(plg2467783.getAsignaciones().contains(provisional)),
					() -> assertTrue(marchettiRoman.getAsignaciones().contains(provisional))
			);
		}

		@Test
		void deberiaCubrirConProvisionalManual() {

			Periodo periodo = cerrado(
					LocalDate.of(2026, MARCH, 1),
					LocalDate.of(2026, JULY, 1)
			);

			AsignacionProvisional provisional =
					plg2467783.cubrirConProvisionalManual(
							marchettiRoman,
							periodo,
							1
					);

			assertAll(
					() -> assertEquals(marchettiRoman, provisional.getEmpleadoEducativo()),
					() -> assertEquals(plg2467783, provisional.getDesignacion()),
					() -> assertEquals(periodo, provisional.getPeriodo()),
					() -> assertEquals(1, provisional.getSecuencia()),

					() -> assertTrue(plg2467783.getAsignaciones().contains(provisional)),
					() -> assertTrue(marchettiRoman.getAsignaciones().contains(provisional))
			);
		}

		@Test
		void deberiaCubrirConSuplente() {
			// Arrange
			LocalDate fechaTomaPosesionTitular = LocalDate.of(2026, MARCH, 1);
			AsignacionTitular titular = plg2467783.cubrirConTitular(
					marchettiRoman,
					fechaTomaPosesionTitular,
					1
			);

			LocalDate fechaInicioLicencia = LocalDate.of(2026, APRIL, 1);
			LocalDate fechaFinLicencia = LocalDate.of(2026, MAY, 1);
			Periodo unPeriodo = cerrado(fechaInicioLicencia, fechaFinLicencia);
			Licencia unaLicencia = marchettiRoman.crearLicencia(
					TipoLicencia.L_A1,
					unPeriodo,
					null,
					Set.of(plg2467783));

			// Act
			AsignacionSuplente suplente = plg2467783.cubrirConSuplente(
							unaLicencia,
							giardinoNoraRosa,
							LocalDate.of(2026, APRIL, 1),
							2
			);

			assertAll(
					() -> assertEquals(giardinoNoraRosa, suplente.getEmpleadoEducativo()),
					() -> assertEquals(plg2467783, suplente.getDesignacion()),
					() -> assertEquals(unaLicencia, suplente.getLicencia()),
					() -> assertEquals(2, suplente.getSecuencia()),
					() -> assertTrue(plg2467783.getAsignaciones().contains(suplente)),
					() -> assertTrue(giardinoNoraRosa.getAsignaciones().contains(suplente))
			);
		}

		@Test
		void noDeberiaCubrirConTitularSiEmpleadoEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> plg2467783.cubrirConTitular(
							null,
							LocalDate.of(2026, MARCH, 1),
							1
					)
			);
		}

		@Test
		void noDeberiaCubrirConTitularSiYaHayTitularActivo() {

			plg2467783.cubrirConTitular(
					marchettiRoman,
					LocalDate.of(2026, MARCH, 1),
					1
			);

			assertThrows(
					DesignacionYaTieneTitularException.class,
					() -> plg2467783.cubrirConTitular(
							giardinoNoraRosa,
							LocalDate.of(2026, MARCH, 10),
							2
					)
			);
		}

		@Test
		void noDeberiaCubrirConProvisionalSiSeSuperpone() {

			plg2467783.cubrirConProvisionalManual(
					marchettiRoman,
					cerrado(
							LocalDate.of(2026, MARCH, 1),
							LocalDate.of(2026, JULY, 1)
					),
					1
			);

			assertThrows(
					DesignacionYaCubiertaException.class,
					() -> plg2467783.cubrirConProvisionalManual(
							giardinoNoraRosa,
							cerrado(
									LocalDate.of(2026, APRIL, 1),
									LocalDate.of(2026, AUGUST, 1)
							),
							2
					)
			);
		}

		@Test
		void noDeberiaCubrirConSuplenteSiNoExisteVacantePorLicencia() {

			plg2467783.cubrirConTitular(
					marchettiRoman,
					LocalDate.of(2026, MARCH, 1),
					1
			);

			Licencia licencia = new Licencia.Builder()
					.empleadoEducativo(marchettiRoman)
					.tipoLicencia(TipoLicencia.L_A1)
					.periodo(
							cerrado(
									LocalDate.of(2026, APRIL, 1),
									LocalDate.of(2026, MAY, 1)
							)
					)
					.descripcion("Licencia médica")
					.agregarDesignacion(plg2467783)
					.build();

			assertThrows(
					DesignacionNoVacantePorLicenciaException.class,
					() -> plg2467783.cubrirConSuplente(
							licencia,
							giardinoNoraRosa,
							LocalDate.of(2026, APRIL, 1),
							2
					)
			);
		}
	}

	@Nested
	class Renovaciones {

		private DesignacionCurso plg2467783;

		@BeforeEach
		void setUp() {
			plg2467783 = new DesignacionCurso(
					escuelaN65,
					2467783,
					practicasDelLenguaje,
					a1g2,
					"Bachiller de Ciclo Básico"
			);
		}

		@Test
		void deberiaRenovarProvisionalAutomaticamente() {

			AsignacionProvisional anterior =
					plg2467783.cubrirConProvisionalManual(
							marchettiRoman,
							cerrado(
									LocalDate.of(2025, MARCH, 3),
									LocalDate.of(2026, FEBRUARY, 26)
							),
							1
					);

			AsignacionProvisional renovada = plg2467783.renovarProvisionalAutomatica(anterior, 2);

			assertAll(
					() -> assertEquals(marchettiRoman, renovada.getEmpleadoEducativo()),
					() -> assertEquals(plg2467783, renovada.getDesignacion()),
					() -> assertEquals(2, renovada.getSecuencia()),
					() -> assertEquals(
							LocalDate.of(2026, MARCH, 1),
							renovada.getPeriodo().getFechaDesde()
					),
					() -> assertEquals(
							LocalDate.of(2027, FEBRUARY, 26),
							renovada.getPeriodo().getFechaHasta()
					),
					() -> assertTrue(plg2467783.getAsignaciones().contains(renovada))
			);
		}

		@Test
		void noDeberiaRenovarProvisionalAutomaticamenteSiAsignacionAnteriorEsNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> plg2467783.renovarProvisionalAutomatica(null, 2)
			);
		}

		@Test
		void deberiaRenovarProvisionalDesdeMarzo() {

			AsignacionProvisional anterior =
					plg2467783.cubrirConProvisionalManual(
							marchettiRoman,
							cerrado(
									LocalDate.of(2025, MARCH, 1),
									LocalDate.of(2025, DECEMBER, 31)
							),
							1
					);

			AsignacionProvisional renovada =
					plg2467783.renovarProvisionalDesdeMarzo(
							anterior,
							LocalDate.of(2026, JULY, 31),
							2
					);

			assertAll(
					() -> assertEquals(marchettiRoman, renovada.getEmpleadoEducativo()),

					() -> assertEquals(plg2467783, renovada.getDesignacion()
					),

					() -> assertEquals(
							LocalDate.of(2026, MARCH, 1),
							renovada.getPeriodo().getFechaDesde()
					),

					() -> assertEquals(
							LocalDate.of(2026, JULY, 31),
							renovada.getPeriodo().getFechaHasta()
					),

					() -> assertEquals(2, renovada.getSecuencia()
					)
			);
		}

		@Test
		void noDeberiaRenovarDesdeMarzoSiFechaHastaEsNull() {

			AsignacionProvisional anterior =
					plg2467783.cubrirConProvisionalManual(
							marchettiRoman,
							cerrado(
									LocalDate.of(2025, MARCH, 1),
									LocalDate.of(2025, DECEMBER, 31)
							),
							1
					);

			assertThrows(
					CampoObligatorioException.class,
					() -> plg2467783.renovarProvisionalDesdeMarzo(anterior, null, 2)
			);
		}

		@Test
		void deberiaRenovarProvisionalManual() {

			AsignacionProvisional anterior =
					plg2467783.cubrirConProvisionalManual(
							marchettiRoman,
							cerrado(
									LocalDate.of(2025, MARCH, 1),
									LocalDate.of(2025, DECEMBER, 31)
							),
							1
					);

			Periodo nuevoPeriodo = cerrado(
					LocalDate.of(2026, MARCH, 1),
					LocalDate.of(2026, JULY, 31)
			);

			AsignacionProvisional renovada = plg2467783.renovarProvisionalManual(anterior, nuevoPeriodo, 2);

			assertAll(
					() -> assertEquals(marchettiRoman, renovada.getEmpleadoEducativo()),

					() -> assertEquals(plg2467783, renovada.getDesignacion()),

					() -> assertEquals(nuevoPeriodo, renovada.getPeriodo()),

					() -> assertEquals(2, renovada.getSecuencia()),

					() -> assertTrue(plg2467783.getAsignaciones().contains(renovada))
			);
		}

		@Test
		void noDeberiaRenovarProvisionalManualSiPeriodoEsNull() {

			AsignacionProvisional anterior =
					plg2467783.cubrirConProvisionalManual(
							marchettiRoman,
							cerrado(
									LocalDate.of(2025, MARCH, 1),
									LocalDate.of(2025, DECEMBER, 31)
							),
							1
					);

			assertThrows(
					CampoObligatorioException.class,
					() -> plg2467783.renovarProvisionalManual(anterior, null, 2)
			);
		}
	}

	@Nested
	class EstadoYVigencia {

		private DesignacionCurso plg2467783;

		@BeforeEach
		void setUp() {
			plg2467783 = new DesignacionCurso(
					escuelaN65,
					2467783,
					practicasDelLenguaje,
					a1g2,
					"Bachiller de Ciclo Básico"
			);
		}

		@Test
		void deberiaIndicarQueTieneVacantePorLicencia() {

			AsignacionTitular titular =
					plg2467783.cubrirConTitular(
							marchettiRoman,
							LocalDate.of(2026, MARCH, 1),
							1
					);

			LocalDate fechaInicioLicencia = LocalDate.of(2026, APRIL, 1);
			LocalDate fechaFinLicencia = LocalDate.of(2026, MAY, 1);
			Periodo unPeriodo = cerrado(fechaInicioLicencia, fechaFinLicencia);
			Licencia unaLicencia = marchettiRoman.crearLicencia(
					TipoLicencia.L_A1,
					unPeriodo,
					null,
					Set.of(plg2467783));

			assertTrue(plg2467783.tieneVacantePorLicenciaEn(LocalDate.of(2026, APRIL, 10)));
		}

		@Test
		void deberiaIndicarQueNoTieneVacantePorLicencia() {

			plg2467783.cubrirConTitular(
					marchettiRoman,
					LocalDate.of(2026, MARCH, 1),
					1
			);

			assertFalse(plg2467783.tieneVacantePorLicenciaEn(LocalDate.of(2026, APRIL, 10)));
		}

		@Test
		void deberiaRetornarEstadoCubierta() {

			plg2467783.cubrirConTitular(
					marchettiRoman,
					LocalDate.of(2026, MARCH, 1),
					1
			);

			EstadoDesignacion estado =
					plg2467783.getEstadoEn(
							LocalDate.of(2026, APRIL, 1)
					);

			assertEquals(
					EstadoDesignacion.CUBIERTA,
					estado
			);
		}

		@Test
		void deberiaRetornarEstadoVacante() {

			EstadoDesignacion estado =
					plg2467783.getEstadoEn(
							LocalDate.of(2026, APRIL, 1)
					);

			assertEquals(
					EstadoDesignacion.VACANTE,
					estado
			);
		}

		@Test
		void deberiaRetornarSuplenciaActiva() {
			// Arrange
			LocalDate fechaTomaPosesion = LocalDate.of(2026, MARCH, 1);
			AsignacionTitular titular = plg2467783.cubrirConTitular(
					marchettiRoman,
					fechaTomaPosesion,
					1
			);

			LocalDate fechaInicioLicencia = LocalDate.of(2026, APRIL, 1);
			LocalDate fechaFinLicencia = LocalDate.of(2026, MAY, 1);
			Periodo unPeriodo = cerrado(fechaInicioLicencia, fechaFinLicencia);
			Licencia unaLicencia = marchettiRoman.crearLicencia(
					TipoLicencia.L_A1,
					unPeriodo,
					"Licencia médica",
					Set.of(plg2467783)
			);

			AsignacionSuplente suplencia = plg2467783.cubrirConSuplente(
					unaLicencia,
					giardinoNoraRosa,
					fechaInicioLicencia,
					2
			);

			Optional<AsignacionSuplente> suplenciaEncontrada = plg2467783.getSuplenciaActivaEn(
					LocalDate.of(2026, APRIL, 10)
			);

			assertThat(suplenciaEncontrada.isPresent()).isTrue();
			assertThat(suplenciaEncontrada.get()).isEqualTo(suplencia);
		}

		@Test
		void deberiaRetornarOptionalVacioSiNoHaySuplenciaActiva() {

			Optional<AsignacionSuplente> resultado =
					plg2467783.getSuplenciaActivaEn(
							LocalDate.of(2026, APRIL, 10)
					);

			assertTrue(resultado.isEmpty());
		}
	}

	@Nested
	class GestionInstitucional {

		private DesignacionCurso plg2467783;

		@BeforeEach
		void setUp() {
			plg2467783 = new DesignacionCurso(
					escuelaN65,
					2467783,
					practicasDelLenguaje,
					a1g2,
					"Bachiller de Ciclo Básico"
			);
		}

		@Test
		void deberiaCambiarEscuela() {
			plg2467783.setEscuela(escuelaN65);
			assertEquals(escuelaN65, plg2467783.getEscuela());
		}

		@Test
		void noDeberiaPermitirEscuelaNull() {
			assertThrows(CampoObligatorioException.class, () -> plg2467783.setEscuela(null));
		}

		@Test
		void deberiaCambiarCupof() {
			plg2467783.setCupof(999999);
			assertEquals(999999, plg2467783.getCupof());
		}

		@Test
		void noDeberiaPermitirCupofNull() {
			assertThrows(CampoObligatorioException.class, () -> plg2467783.setCupof(null));
		}

	}

	@Nested
	class TransicionesDeCobertura {

		private DesignacionCurso plg2467783;

		@BeforeEach
		void setUp() {
			plg2467783 = new DesignacionCurso(
					escuelaN65,
					2467783,
					practicasDelLenguaje,
					a1g2,
					"Bachiller de Ciclo Básico"
			);
		}

		@Test
		void noDeberiaPermitirAsignacionNull() {

			assertThrows(
					CampoObligatorioException.class,
					() -> plg2467783.notificarBajaDefinitivaDe(
							null,
							LocalDate.of(2026, APRIL, 1)
					)
			);
		}

		@Test
		void noDeberiaPermitirFechaBajaNull() {

			AsignacionTitular titular =
					plg2467783.cubrirConTitular(
							marchettiRoman,
							LocalDate.of(2026, MARCH, 1),
							1
					);

			assertThrows(
					CampoObligatorioException.class,
					() -> plg2467783.notificarBajaDefinitivaDe(
							titular,
							null
					)
			);
		}

		@Test
		void noDeberiaHacerNadaSiLaAsignacionNoPuedeGenerarVacanteDefinitiva() {

			AsignacionProvisional provisional =
					plg2467783.cubrirConProvisionalManual(
							marchettiRoman,
							cerrado(
									LocalDate.of(2026, MARCH, 1),
									LocalDate.of(2026, JULY, 1)
							),
							1
					);

			plg2467783.notificarBajaDefinitivaDe(
					provisional,
					LocalDate.of(2026, APRIL, 1)
			);

			assertTrue(
					plg2467783.getAsignaciones()
							.contains(provisional)
			);
		}

		@Test
		void deberiaConvertirSuplenteEnProvisional() {
			// Arrange
			LocalDate fechaTomaPosesion = LocalDate.of(2026, MARCH, 1);
			AsignacionTitular titular = plg2467783.cubrirConTitular(
					marchettiRoman,
					fechaTomaPosesion,
					1
			);

			LocalDate fechaInicioLicencia = LocalDate.of(2026, APRIL, 1);
			LocalDate fechaFinLicencia = LocalDate.of(2026, MAY, 1);
			Licencia licencia = marchettiRoman.crearLicencia(
					TipoLicencia.L_A1,
					cerrado(fechaInicioLicencia, fechaFinLicencia),
					"Licencia médica",
					Set.of(plg2467783)
			);

			plg2467783.cubrirConSuplente(
					licencia,
					giardinoNoraRosa,
					fechaInicioLicencia,
					2
			);

			// Act
			LocalDate fechaDeBaja = LocalDate.of(2026, APRIL, 10);
			titular.finalizarPorBajaDefinitiva(
					CausaBaja.RENUNCIA,
					fechaDeBaja
			);

			// Assert
			Asignacion asignacion = plg2467783.getAsignacionActivaDe(
					giardinoNoraRosa,
					fechaDeBaja.plusDays(1)
			).orElseThrow();

			assertAll(
					() -> assertInstanceOf(
							AsignacionProvisional.class,
							asignacion
					),
					() -> assertEquals(
							fechaDeBaja.plusDays(1),
							asignacion.getPeriodo().getFechaDesde()
					)
			);
		}

		@Test
		void noDeberiaFallarSiNoHaySuplenciaActiva() {

			AsignacionTitular titular =
					plg2467783.cubrirConTitular(
							marchettiRoman,
							LocalDate.of(2026, MARCH, 1),
							1
					);

			assertDoesNotThrow(
					() -> plg2467783.notificarBajaDefinitivaDe(
							titular,
							LocalDate.of(2026, APRIL, 1)
					)
			);
		}
	}

	@Nested
	class InfraestructuraYUtilitarios {

		private DesignacionCurso plg2467783;

		@BeforeEach
		void setUp() {
			plg2467783 = new DesignacionCurso(
					escuelaN65,
					2467783,
					practicasDelLenguaje,
					a1g2,
					"Bachiller de Ciclo Básico"
			);
		}

		@Test
		void deberiaRetornarRepresentacionTextual() {

			String resultado = plg2467783.toString();

			assertAll(
					() -> assertTrue(resultado.contains("DesignacionCurso")),
					() -> assertTrue(resultado.contains("cupof = 2467783")),
					() -> assertTrue(resultado.contains("rolEducativo = DOCENTE")),
					() -> assertTrue(resultado.contains("asignacion = 0"))
			);
		}

		@Test
		void deberiaMostrarCantidadDeAsignaciones() {

			plg2467783.cubrirConTitular(
					marchettiRoman,
					LocalDate.of(2026, MARCH, 1),
					1
			);

			String resultado = plg2467783.toString();

			assertTrue(resultado.contains("asignacion = 1"));
		}
	}

}