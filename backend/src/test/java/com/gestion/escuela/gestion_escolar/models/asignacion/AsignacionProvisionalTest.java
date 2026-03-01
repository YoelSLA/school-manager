package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion.CaracteristicaAsignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionYaDadaDeBajaException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@DisplayName("Tests de AsignacionProvisional")
class AsignacionProvisionalTest {

	private EmpleadoEducativo empleado;
	private Designacion designacion;
	private Periodo periodo;
	private AsignacionProvisional asignacion;

	@BeforeEach
	void setUp() {
		empleado = mock(EmpleadoEducativo.class);
		designacion = mock(Designacion.class);

		periodo = new Periodo(
				LocalDate.of(2025, 3, 1),
				LocalDate.of(2025, 3, 31)
		);

		asignacion = new AsignacionProvisional(
				empleado,
				designacion,
				periodo
		);
	}

	// =====================================================
	// 🔹 CREACIÓN
	// =====================================================

	@Nested
	@DisplayName("Creación de asignación")
	class Creacion {

		@Test
		@DisplayName("Debe crear correctamente la asignación provisional")
		void creaAsignacion() {
			assertEquals(empleado, asignacion.getEmpleadoEducativo());
			assertEquals(designacion, asignacion.getDesignacion());
			assertEquals(periodo, asignacion.getPeriodo());
			assertEquals(SituacionDeRevista.PROVISIONAL, asignacion.getSituacionDeRevista());
		}

		@Test
		@DisplayName("toString debe cubrir todos los ternarios")
		void toStringCompleto() {

			when(empleado.getId()).thenReturn(1L);
			when(designacion.getId()).thenReturn(2L);

			CaracteristicaAsignacion caracteristica =
					mock(CaracteristicaAsignacion.class);

			when(caracteristica.getId()).thenReturn(3L);

			// Forzamos característica usando subclase testable
			class Testable extends AsignacionProvisional {
				public Testable(EmpleadoEducativo e, Designacion d, Periodo p) {
					super(e, d, p);
				}

				public void setCar(CaracteristicaAsignacion c) {
					super.asignarCaracteristica(c);
				}
			}

			Testable a = new Testable(empleado, designacion, periodo);
			a.setCar(caracteristica);

			String texto = a.toString();

			assertTrue(texto.contains("empleadoId = 1"));
			assertTrue(texto.contains("designacionId = 2"));
			assertTrue(texto.contains("caracteristicaId = 3"));
		}
	}

	// =====================================================
	// 🔹 ESTADO
	// =====================================================

	@Nested
	@DisplayName("Estado de la asignación")
	class Estado {

		@Test
		@DisplayName("Debe lanzar excepción si fecha es null")
		void fallaSiFechaEsNull() {
			assertThrows(RuntimeException.class,
					() -> asignacion.getEstadoEn(null));
		}

		@Test
		@DisplayName("Debe estar ACTIVA dentro del período")
		void estaActiva() {
			when(empleado.estaEnLicenciaPara(any(), any())).thenReturn(false);

			assertEquals(
					EstadoAsignacion.ACTIVA,
					asignacion.getEstadoEn(LocalDate.of(2025, 3, 10))
			);
		}

		@Test
		@DisplayName("estaActiva() debe devolver true si está activa")
		void estaActivaMetodoDirecto() {
			when(empleado.estaEnLicenciaPara(any(), any())).thenReturn(false);

			assertTrue(
					asignacion.estaActivaEn(LocalDate.of(2025, 3, 10))
			);
		}

		@Test
		@DisplayName("Debe estar PENDIENTE antes del inicio")
		void estaPendiente() {
			assertEquals(
					EstadoAsignacion.PENDIENTE,
					asignacion.getEstadoEn(LocalDate.of(2025, 2, 20))
			);
		}

		@Test
		@DisplayName("Debe estar FINALIZADA después del período")
		void estaFinalizada() {
			when(empleado.estaEnLicenciaPara(any(), any())).thenReturn(false);

			assertEquals(
					EstadoAsignacion.FINALIZADA,
					asignacion.getEstadoEn(LocalDate.of(2025, 4, 1))
			);
		}

		@Test
		@DisplayName("Debe estar en LICENCIA si el empleado está en licencia")
		void estaEnLicencia() {
			when(empleado.estaEnLicenciaPara(any(), any())).thenReturn(true);

			assertEquals(
					EstadoAsignacion.LICENCIA,
					asignacion.getEstadoEn(LocalDate.of(2025, 3, 10))
			);
		}

		@Test
		@DisplayName("estaActiva debe devolver false cuando no está activa")
		void estaActivaFalse() {

			when(empleado.estaEnLicenciaPara(any(), any())).thenReturn(true);

			assertFalse(
					asignacion.estaActivaEn(LocalDate.of(2025, 3, 10))
			);
		}

		@Test
		@DisplayName("No debe estar en BAJA si la fecha es anterior a la baja")
		void noEstaEnBajaSiFechaAnteriorALaBaja() {

			LocalDate fechaBaja = LocalDate.of(2025, 3, 15);

			asignacion.finalizarPorBajaDefinitiva(
					CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES,
					fechaBaja
			);

			when(empleado.estaEnLicenciaPara(any(), any()))
					.thenReturn(false);

			EstadoAsignacion estado =
					asignacion.getEstadoEn(LocalDate.of(2025, 3, 10));

			assertNotEquals(EstadoAsignacion.BAJA, estado);
		}
	}

	// =====================================================
	// 🔹 BAJA
	// =====================================================

	@Nested
	@DisplayName("Baja definitiva")
	class Baja {

//		@Test
//		@DisplayName("Debe quedar en BAJA luego de finalizar")
//		void quedaEnBaja() {
//
//			LocalDate fecha = LocalDate.of(2025, 3, 15);
//
//			asignacion.finalizarPorBajaDefinitiva(CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES, fecha);
//
//			assertEquals(EstadoAsignacion.BAJA, asignacion.getEstadoEn(fecha));
//
//			verify(designacion).notificarBajaDefinitivaDe(asignacion, fecha);
//		}

		@Test
		void noPermiteDobleBaja() {

			LocalDate fecha = LocalDate.of(2025, 3, 15);

			asignacion.finalizarPorBajaDefinitiva(
					CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES,
					fecha
			);

			assertThrows(
					AsignacionYaDadaDeBajaException.class,
					() -> asignacion.finalizarPorBajaDefinitiva(
							CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES,
							fecha
					)
			);
		}

		@Test
		void fechaBajaNull() {
			assertNull(asignacion.getFechaBaja());
		}

		@Test
		void causaBajaNull() {
			assertNull(asignacion.getCausaBaja());
		}

		@Test
		@DisplayName("No está dada de baja si la fecha es anterior a la baja")
		void noEstaDadaDeBajaSiFechaAnterior() {

			LocalDate fechaBaja = LocalDate.of(2025, 3, 15);

			asignacion.finalizarPorBajaDefinitiva(
					CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES,
					fechaBaja
			);

			assertFalse(
					asignacion.estaDadaDeBajaEn(LocalDate.of(2025, 3, 10))
			);
		}

		@Test
		@DisplayName("getFechaBaja debe devolver fecha cuando hay baja")
		void fechaBajaConValor() {

			LocalDate fecha = LocalDate.of(2025, 3, 15);

			asignacion.finalizarPorBajaDefinitiva(
					CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES,
					fecha
			);

			assertEquals(fecha, asignacion.getFechaBaja());
		}

		@Test
		@DisplayName("getCausaBaja debe devolver causa cuando hay baja")
		void causaBajaConValor() {

			LocalDate fecha = LocalDate.of(2025, 3, 15);

			asignacion.finalizarPorBajaDefinitiva(
					CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES,
					fecha
			);

			assertEquals(
					CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES,
					asignacion.getCausaBaja()
			);
		}


	}

	// =====================================================
	// 🔹 COBERTURA Y VACANTES
	// =====================================================

	@Nested
	@DisplayName("Cobertura y vacantes")
	class Cobertura {

		@Test
		void cubreDesignacion() {
			when(empleado.estaEnLicenciaPara(any(), any())).thenReturn(false);

			assertTrue(
					asignacion.estaActivaEn(
							LocalDate.of(2025, 3, 10)
					)
			);
		}

		@Test
		void noCubreSiLicencia() {
			when(empleado.estaEnLicenciaPara(any(), any())).thenReturn(true);

			assertFalse(
					asignacion.estaActivaEn(
							LocalDate.of(2025, 3, 10)
					)
			);
		}

		@Test
		void generaVacante() {
			when(empleado.estaEnLicenciaPara(any(), any())).thenReturn(true);

			assertTrue(
					asignacion.estaEnLicenciaEn(
							LocalDate.of(2025, 3, 10)
					)
			);
		}

		@Test
		void noGeneraVacante() {
			when(empleado.estaEnLicenciaPara(any(), any())).thenReturn(false);

			assertFalse(
					asignacion.estaEnLicenciaEn(
							LocalDate.of(2025, 3, 10)
					)
			);
		}

		@Test
		@DisplayName("No cubre designación si la fecha está fuera del período")
		void noCubreFueraDelPeriodo() {

			when(empleado.estaEnLicenciaPara(any(), any())).thenReturn(false);

			assertFalse(
					asignacion.estaActivaEn(
							LocalDate.of(2025, 4, 10)
					)
			);
		}

		@Test
		@DisplayName("No genera vacante si la fecha está fuera del período")
		void noGeneraVacanteFueraDelPeriodo() {

			when(empleado.estaEnLicenciaPara(any(), any())).thenReturn(true);

			assertFalse(
					asignacion.estaEnLicenciaEn(
							LocalDate.of(2025, 4, 10)
					)
			);
		}

		@Test
		@DisplayName("No cubre designación si está dada de baja")
		void noCubreSiEstaDadaDeBaja() {

			LocalDate fechaBaja = LocalDate.of(2025, 3, 15);

			asignacion.finalizarPorBajaDefinitiva(
					CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES,
					fechaBaja
			);

			when(empleado.estaEnLicenciaPara(any(), any())).thenReturn(false);

			assertFalse(
					asignacion.estaActivaEn(
							LocalDate.of(2025, 3, 20) // después de la baja
					)
			);
		}

		@Test
		@DisplayName("No genera vacante si está dada de baja")
		void noGeneraVacanteSiEstaDadaDeBaja() {

			LocalDate fechaBaja = LocalDate.of(2025, 3, 15);

			asignacion.finalizarPorBajaDefinitiva(
					CausaBaja.RENUNCIA_POR_CAUSAS_PARTICULARES,
					fechaBaja
			);

			when(empleado.estaEnLicenciaPara(any(), any())).thenReturn(true);

			assertFalse(
					asignacion.estaEnLicenciaEn(
							LocalDate.of(2025, 3, 20)
					)
			);
		}
	}

	// =====================================================
	// 🔹 CARACTERÍSTICA
	// =====================================================

	@Nested
	@DisplayName("Característica")
	class CaracteristicaTest {

		@Test
		void noTieneCaracteristica() {
			assertFalse(asignacion.tieneCaracteristica());
		}

		@Test
		void aplicarCaracteristicaNoPermitido() {
			CaracteristicaAsignacion c = mock(CaracteristicaAsignacion.class);

			assertThrows(
					UnsupportedOperationException.class,
					() -> asignacion.aplicarCaracteristica(c)
			);
		}

		@Test
		void asignarCaracteristicaInterna() {

			TestableAsignacion a =
					new TestableAsignacion(empleado, designacion, periodo);

			CaracteristicaAsignacion c =
					mock(CaracteristicaAsignacion.class);

			a.forzarCaracteristica(c);

			assertTrue(a.tieneCaracteristica());
		}

		static class TestableAsignacion extends AsignacionProvisional {

			public TestableAsignacion(
					EmpleadoEducativo e,
					Designacion d,
					Periodo p
			) {
				super(e, d, p);
			}

			public void forzarCaracteristica(CaracteristicaAsignacion c) {
				super.asignarCaracteristica(c);
			}
		}
	}

	// =====================================================
	// 🔹 OTROS
	// =====================================================

	@Nested
	@DisplayName("Otros comportamientos")
	class Otros {

		@Test
		void asignarEmpleado() {

			EmpleadoEducativo nuevo = mock(EmpleadoEducativo.class);

			asignacion.asignarEmpleado(nuevo);

			assertEquals(nuevo, asignacion.getEmpleadoEducativo());
		}

		@Test
		void noGeneraVacanteDefinitiva() {
			assertFalse(asignacion.puedeGenerarVacanteDefinitiva());
		}
	}
}