package com.gestion.escuela.gestion_escolar.models.desginacion;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AsignacionNormalTest {

//	@Mock
//	private EmpleadoEducativo empleadoEducativo;
//
//	@Mock
//	private Designacion designacion;
//
//	private AsignacionNormal asignacion;
//
//	@BeforeEach
//	void setUp() {
//		asignacion = new AsignacionNormal(
//				designacion,
//				empleadoEducativo,
//				LocalDate.of(2025, 1, 1),
//				LocalDate.of(2025, 12, 31),
//				SituacionDeRevista.TITULAR
//		);
//	}
//
//	@Test
//	void asignacionNormalDentroDelPeriodoEstaVigente() {
//		assertTrue(asignacion.estaVigenteEn(LocalDate.of(2025, 6, 1)));
//	}
//
//	@Test
//	void asignacionNormalFueraDelPeriodoNoEstaVigente() {
//		assertFalse(asignacion.estaVigenteEn(LocalDate.of(2030, 1, 1)));
//	}
//
//	@Test
//	void asignacionConLicenciaVigenteEstaEnLicencia() {
//		asignacion.solicitarLicencia(
//				LocalDate.of(2025, 6, 1),
//				LocalDate.of(2025, 6, 10),
//				TipoLicencia.ENFERMEDAD,
//				"Reposo"
//		);
//
//		assertTrue(asignacion.estaEnLicenciaEn(LocalDate.of(2025, 6, 5)));
//		assertEquals(1, asignacion.getLicencias().size());
//	}
//
//	@Test
//	void asignacionVigenteSinLicenciaEjerceCargo() {
//		assertTrue(asignacion.ejerceCargoEn(LocalDate.of(2025, 6, 1)));
//	}
//
//	@Test
//	void asignacionVigenteConLicenciaNoEjerceCargo() {
//		asignacion.solicitarLicencia(
//				LocalDate.of(2025, 6, 1),
//				LocalDate.of(2025, 6, 10),
//				TipoLicencia.ENFERMEDAD,
//				"Reposo"
//		);
//
//		assertFalse(asignacion.ejerceCargoEn(LocalDate.of(2025, 6, 5)));
//	}
//
//	@Test
//	void darDeBajaDejaLaAsignacionNoVigente() {
//
//		asignacion.registrarBaja(CausaBaja.RENUNCIA);
//
//		assertFalse(asignacion.estaVigenteEn(LocalDate.now()));
//	}
//
//	@Test
//	void darDeBajaImpideEjercerElCargo() {
//
//		asignacion.registrarBaja(CausaBaja.RENUNCIA);
//
//		assertFalse(asignacion.ejerceCargoEn(LocalDate.now()));
//	}
//
//	@Test
//	void noSePuedeDarDeBajaSinCausa() {
//
//		assertThrows(
//				IllegalArgumentException.class,
//				() -> asignacion.registrarBaja(null)
//		);
//	}
//
//	@Test
//	void noSePuedeDarDeBajaDosVeces() {
//
//		asignacion.registrarBaja(CausaBaja.RENUNCIA);
//
//		assertThrows(
//				IllegalStateException.class,
//				() -> asignacion.registrarBaja(CausaBaja.JUBILACION)
//		);
//	}


}