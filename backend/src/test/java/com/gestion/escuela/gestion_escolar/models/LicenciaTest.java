package com.gestion.escuela.gestion_escolar.models;

public class LicenciaTest {

//	@Test
//	void crearLicenciaValida() {
//		Licencia licencia = new Licencia(
//				TipoLicencia.ENFERMEDAD,
//				LocalDate.of(2026, 1, 1),
//				LocalDate.of(2026, 1, 5)
//		);
//
//		assertNotNull(licencia);
//	}
//
//	@Test
//	void noSePuedeCrearLicenciaSinTipo() {
//		assertThrows(
//				TipoLicenciaObligatorioException.class,
//				() -> new Licencia(
//						null,
//						LocalDate.of(2026, 1, 1),
//						LocalDate.of(2026, 1, 5)
//				)
//		);
//
//	}
//
//	@Test
//	void noSePuedeCrearLicenciaSinFechas() {
//
//		assertThrows(
//				FechasLicenciaObligatoriasException.class,
//				() -> new Licencia(
//						TipoLicencia.ENFERMEDAD,
//						null,
//						null
//				)
//		);
//
//	}
//
//	@Test
//	void fechaDesdeNoPuedeSerPosteriorAHasta() {
//
//		assertThrows(
//				RangoFechasLicenciaInvalidoException.class,
//				() -> new Licencia(
//						TipoLicencia.ENFERMEDAD,
//						LocalDate.of(2026, 1, 10),
//						LocalDate.of(2026, 1, 5)
//				)
//		);
//
//	}
//
//	@Test
//	void licenciaEstaActivaCuandoHoyEstaDentroDelRango() {
//		LocalDate hoy = LocalDate.now();
//
//		Licencia licencia = new Licencia(
//				TipoLicencia.ENFERMEDAD,
//				hoy.minusDays(1),
//				hoy.plusDays(1)
//		);
//
//		assertTrue(licencia.estaActivaHoy());
//	}
//
//	@Test
//	void licenciaNoEstaActivaSiEmpiezaEnElFuturo() {
//		Licencia licencia = new Licencia(
//				TipoLicencia.ENFERMEDAD,
//				LocalDate.now().plusDays(1),
//				LocalDate.now().plusDays(5)
//		);
//
//		assertFalse(licencia.estaActivaHoy());
//	}
//
//	@Test
//	void calculaCorrectamenteLaCantidadDeDias() {
//		Licencia licencia = new Licencia(
//				TipoLicencia.ENFERMEDAD,
//				LocalDate.of(2026, 1, 1),
//				LocalDate.of(2026, 1, 3)
//		);
//
//		assertEquals(3, licencia.dias());
//	}
//
//	@Test
//	void sePuedeDefinirElMotivoDeUnaLicencia() {
//		Licencia licencia = new Licencia(
//				TipoLicencia.ENFERMEDAD,
//				LocalDate.of(2026, 1, 1),
//				LocalDate.of(2026, 1, 3)
//		);
//
//		licencia.definirMotivo("Reposo médico");
//
//		assertEquals("Reposo médico", licencia.getMotivo());
//	}
//

}
