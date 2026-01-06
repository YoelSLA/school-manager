package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionNormal;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DesignacionAdministrativaTest {

	@Mock
	private EmpleadoEducativo suplente;

	@Mock
	private Asignacion asignacionQueEjerce;

	@Mock
	private EmpleadoEducativo titular;

	private DesignacionAdministrativa designacion;

	@BeforeEach
	void setUp() {
		designacion = spy(new DesignacionAdministrativa(
				2467776,
				RolEducativo.DIRECCION
		));
	}

	@Test
	void solicitarLicenciaSeDelegadaALaAsignacionQueEjerce() {

		doReturn(Optional.of(asignacionQueEjerce))
				.when(designacion)
				.asignacionQueEjerceEn(any(LocalDate.class));

		designacion.solicitarLicencia(
				LocalDate.of(2025, 6, 1),
				LocalDate.of(2025, 6, 10),
				TipoLicencia.ENFERMEDAD,
				"Reposo"
		);

		verify(asignacionQueEjerce).solicitarLicencia(
				LocalDate.of(2025, 6, 1),
				LocalDate.of(2025, 6, 10),
				TipoLicencia.ENFERMEDAD,
				"Reposo"
		);
	}

	@Test
	void solicitarLicenciaSinAsignacionQueEjerceFalla() {

		doReturn(Optional.empty())
				.when(designacion)
				.asignacionQueEjerceEn(any(LocalDate.class));

		assertThrows(
				IllegalStateException.class,
				() -> designacion.solicitarLicencia(
						LocalDate.of(2025, 6, 1),
						LocalDate.of(2025, 6, 10),
						TipoLicencia.ENFERMEDAD,
						"Reposo"
				)
		);
	}

	@Test
	void solicitarLicenciaSinTipoLicenciaFalla() {

		assertThrows(
				IllegalArgumentException.class,
				() -> designacion.solicitarLicencia(
						LocalDate.of(2025, 6, 1),
						LocalDate.of(2025, 6, 10),
						null,
						"Reposo"
				)
		);
	}

	@Test
	void seCubreUnaLicenciaConSuplenteYElEjercicioDelCargoEsCorrectoEnElTiempo() {

		// 🔹 Asignación TITULAR
		Asignacion asignacionTitular = new AsignacionNormal(
				designacion,
				titular,
				LocalDate.of(2026, 3, 1),
				LocalDate.of(2026, 8, 1),
				SituacionDeRevista.TITULAR
		);

		designacion.getAsignaciones().add(asignacionTitular);

		// 🔹 Licencia (se solicita antes de que empiece)
		Licencia licencia = asignacionTitular.solicitarLicencia(
				LocalDate.of(2026, 4, 15),
				LocalDate.of(2026, 4, 30),
				TipoLicencia.ENFERMEDAD,
				"Reposo médico"
		);

		// 🔹 Se cubre la licencia ANTES de su inicio
		designacion.cubrirConSuplente(
				suplente,
				licencia
		);

		// 🔸 Antes de la licencia → ejerce el titular
		assertEquals(
				asignacionTitular,
				designacion.asignacionQueEjerceEn(
						LocalDate.of(2026, 4, 10)
				).orElseThrow()
		);

		// 🔸 Durante la licencia → ejerce el suplente
		Asignacion asignacionEnLicencia =
				designacion.asignacionQueEjerceEn(
						LocalDate.of(2026, 4, 20)
				).orElseThrow();

		assertEquals(
				SituacionDeRevista.SUPLENTE,
				asignacionEnLicencia.getSituacionDeRevista()
		);

		// 🔸 Después de la licencia → vuelve el titular
		assertEquals(
				asignacionTitular,
				designacion.asignacionQueEjerceEn(
						LocalDate.of(2026, 5, 2)
				).orElseThrow()
		);
	}


}


//	@Test
//	void desginacinAdministrativatitularEnLicenciaRenunciaConSuplenteGeneraProvisional() {
//
//		// ---------- Arrange ----------
//		DesignacionAdministrativa designacion =
//				new DesignacionAdministrativa(123456, escuela, RolEducativo.PRECEPTORIA);
//
//		LocalDate hoy = LocalDate.now();
//
//		// Asignación TITULAR
//		Asignacion asignacionTitular = new Asignacion(
//				titular,
//				hoy.minusYears(2),
//				hoy.plusYears(2),
//				SituacionDeRevista.TITULAR
//		);
//
//		// Licencia vigente HOY
//		asignacionTitular.registrarLicencia(
//				hoy.minusDays(5),
//				hoy.plusDays(5),
//				TipoLicencia.B1
//		);
//
//		// Asignación SUPLENTE (ejerciendo)
//		Asignacion asignacionSuplente = new Asignacion(
//				suplente,
//				hoy.minusMonths(3),
//				hoy.plusMonths(3),
//				SituacionDeRevista.SUPLENTE
//		);
//
//		// Asociación
//		designacion.agregarAsignacion(asignacionTitular);
//		designacion.agregarAsignacion(asignacionSuplente);
//
//		// ---------- Act ----------
//		designacion.darBajaAsignacion(asignacionTitular, CausaBaja.RENUNCIA);
//
//		// ---------- Assert — TITULAR ----------
//		assertEquals(TipoAsignacion.BAJA_DEFINITIVA, asignacionTitular.getTipoEstadoAsignacion());
//		assertEquals(CausaBaja.RENUNCIA, asignacionTitular.getCausaBaja());
//		assertEquals(hoy, asignacionTitular.getFechaCese());
//
//		// ---------- Assert — SUPLENTE ----------
//		assertEquals(TipoAsignacion.BAJA_DEFINITIVA, asignacionSuplente.getTipoEstadoAsignacion());
//		assertEquals(CausaBaja.REORGANIZACION_DEL_CARGO, asignacionSuplente.getCausaBaja());
//		assertEquals(hoy, asignacionSuplente.getFechaCese());
//
//		// ---------- Assert — PROVISIONAL ----------
//		Optional<Asignacion> provisionalQueEjerce = designacion.provisionalQueEjerceEn(hoy);
//
//		assertTrue(provisionalQueEjerce.isPresent());
//
//		Asignacion provisional = provisionalQueEjerce.get();
//
//		assertEquals(suplente, provisional.getEmpleadoEducativo());
//		assertEquals(hoy, provisional.getFechaTomaPosesion());
//
//		LocalDate primeroDeMarzo = LocalDate.of(hoy.getYear(), 3, 1);
//
//		LocalDate fechaEsperada = hoy.isBefore(primeroDeMarzo)
//				? primeroDeMarzo
//				: LocalDate.of(hoy.getYear() + 1, 3, 1);
//
//		assertEquals(fechaEsperada, provisional.getFechaCese());
//
//		// ---------- Assert — EJERCICIO ----------
//		Optional<Asignacion> ejerciendo = designacion.asignacionQueEjerceEn(hoy);
//
//		assertTrue(ejerciendo.isPresent());
//		assertEquals(provisional, ejerciendo.get());
//	}
//
//	@Test
//	void designacionAdministrativaTitularRenunciaSinSuplenteDejaDesignacionPendiente() {
//
//		// ---------- Arrange ----------
//		DesignacionAdministrativa designacion = new DesignacionAdministrativa(654321, escuela, RolEducativo.PRECEPTORIA);
//
//		LocalDate hoy = LocalDate.now();
//
//		Asignacion asignacionTitular = new Asignacion(titular, hoy.minusYears(3), hoy.plusYears(3), SituacionDeRevista.TITULAR);
//
//		designacion.agregarAsignacion(asignacionTitular);
//
//		// Sanity check
//		assertTrue(designacion.titularQueEjerceEn(hoy).isPresent());
//		assertTrue(designacion.suplentes().isEmpty());
//
//		// ---------- Act ----------
//		designacion.darBajaAsignacion(asignacionTitular, CausaBaja.RENUNCIA);
//
//		// ---------- Assert — TITULAR ----------
//		assertEquals(TipoAsignacion.BAJA_DEFINITIVA, asignacionTitular.getTipoEstadoAsignacion());
//		assertEquals(CausaBaja.RENUNCIA, asignacionTitular.getCausaBaja());
//		assertEquals(hoy, asignacionTitular.getFechaCese());
//
//		// ---------- Assert — NO PROVISIONAL ----------
//		assertTrue(designacion.provisionales().isEmpty());
//
//		// ---------- Assert — NO EJERCICIO ----------
//		assertTrue(designacion.asignacionQueEjerceEn(hoy).isEmpty());
//	}
//
//	@Test
//	void designacionAdministrativaProvisionalRenunciaSinTitularDejaDesignacionPendiente() {
//
//		// ---------- Arrange ----------
//		DesignacionAdministrativa designacion =
//				new DesignacionAdministrativa(
//						777777,
//						escuela,
//						RolEducativo.PRECEPTORIA
//				);
//
//		LocalDate hoy = LocalDate.now();
//
//		Asignacion asignacionProvisional = new Asignacion(
//				provisional,
//				hoy.minusMonths(6),
//				LocalDate.of(hoy.getYear(), 3, 1),
//				SituacionDeRevista.PROVISIONAL
//		);
//
//		designacion.agregarAsignacion(asignacionProvisional);
//
//		// Sanity check
//		assertTrue(designacion.provisionalQueEjerceEn(hoy).isPresent());
//		assertTrue(designacion.titulares().isEmpty());
//
//		// ---------- Act ----------
//		designacion.darBajaAsignacion(asignacionProvisional, CausaBaja.RENUNCIA);
//
//		// ---------- Assert — PROVISIONAL ----------
//		assertEquals(
//				TipoAsignacion.BAJA_DEFINITIVA,
//				asignacionProvisional.getTipoEstadoAsignacion()
//		);
//		assertEquals(CausaBaja.RENUNCIA, asignacionProvisional.getCausaBaja());
//		assertEquals(hoy, asignacionProvisional.getFechaCese());
//
//		// ---------- Assert — DESIGNACIÓN ----------
//		assertTrue(designacion.asignacionQueEjerceEn(hoy).isEmpty());
//	}
//
//	@Test
//	void titularEnVigenciaPideLicencia_yLaDesignacionQuedaPendiente() {
//
//		// ---------- Arrange ----------
//
//
//		DesignacionAdministrativa designacion = new DesignacionAdministrativa(2467836, escuela, RolEducativo.PRECEPTORIA);
//
//		Asignacion asignacionTitular = new Asignacion(
//				titular,
//				LocalDate.now().minusMonths(6),
//				LocalDate.now().plusYears(5),
//				SituacionDeRevista.TITULAR
//		);
//
//		designacion.agregarAsignacion(asignacionTitular);
//
//		LocalDate desde = LocalDate.now().plusDays(1);
//		LocalDate hasta = LocalDate.now().plusDays(10);
//
//		// Precondición: hoy el titular ejerce
//		assertTrue(designacion.asignacionQueEjerceEn(LocalDate.now()).isPresent());
//
//		// ---------- Act ----------
//		designacion.pedirLicencia(desde, hasta, TipoLicencia.B1);
//
//		// ---------- Assert ----------
//
//		// 1️⃣ La asignación titular tiene la licencia registrada
//		assertTrue(asignacionTitular.tieneLicencias());
//
//		// 3️⃣ La designación queda pendiente
//		assertTrue(designacion.estaPendienteEn(desde));
//
//		// 4️⃣ No se crean nuevas asignaciones
//		assertEquals(1, designacion.getAsignaciones().size());
//	}
//
//	@Test
//	void provisionalEnVigenciaPideLicencia_yLaDesignacionQuedaPendiente() {
//
//
//		DesignacionAdministrativa designacion =
//				new DesignacionAdministrativa(123, escuela, RolEducativo.PRECEPTORIA);
//
//		Asignacion asignacionProvisional = new Asignacion(
//				provisional,
//				LocalDate.now().minusMonths(3),
//				LocalDate.now().plusMonths(6),
//				SituacionDeRevista.PROVISIONAL
//		);
//
//		designacion.agregarAsignacion(asignacionProvisional);
//
//		LocalDate desde = LocalDate.now().plusDays(1);
//		LocalDate hasta = LocalDate.now().plusDays(5);
//
//		// Precondición
//		assertTrue(designacion.asignacionQueEjerceEn(LocalDate.now()).isPresent());
//
//		// Act
//		designacion.pedirLicencia(desde, hasta, TipoLicencia.ENFERMEDAD);
//
//		// Assert
//		assertTrue(asignacionProvisional.tieneLicencias());
//		assertTrue(designacion.estaPendienteEn(desde));
//		assertEquals(1, designacion.getAsignaciones().size());
//	}
//
//	@Test
//	void suplenteEjerciendoPideLicencia_yLaDesignacionQuedaPendiente() {
//
//		// Arrange
//		DesignacionAdministrativa designacion =
//				new DesignacionAdministrativa(456, escuela, RolEducativo.PRECEPTORIA);
//
//		Asignacion asignacionTitular = new Asignacion(
//				titular,
//				LocalDate.now().minusMonths(6),
//				LocalDate.now().plusMonths(6),
//				SituacionDeRevista.TITULAR
//		);
//
//		Asignacion asignacionSuplente = new Asignacion(
//				suplente,
//				LocalDate.now().minusDays(10),
//				LocalDate.now().plusDays(10),
//				SituacionDeRevista.SUPLENTE
//		);
//
//		// El titular ya está en licencia
//		asignacionTitular.pedirLicencia(
//				LocalDate.now().minusDays(5),
//				LocalDate.now().plusDays(5),
//				TipoLicencia.ENFERMEDAD
//		);
//
//		designacion.agregarAsignacion(asignacionTitular);
//		designacion.agregarAsignacion(asignacionSuplente);
//
//		// Precondición
//		assertTrue(designacion.asignacionQueEjerceEn(LocalDate.now()).isPresent());
//
//		// Act
//		designacion.pedirLicencia(
//				LocalDate.now().plusDays(1),
//				LocalDate.now().plusDays(3),
//				TipoLicencia.B1
//
//		);
//
//		// Assert
//		assertTrue(asignacionSuplente.tieneLicencias());
//		assertTrue(designacion.estaPendienteEn(LocalDate.now().plusDays(1)));
//		assertEquals(2, designacion.getAsignaciones().size());
//	}

