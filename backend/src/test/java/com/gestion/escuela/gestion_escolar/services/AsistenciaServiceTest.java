package com.gestion.escuela.gestion_escolar.services;


import com.gestion.escuela.gestion_escolar.models.*;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;

import static com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana.MARTES;
import static com.gestion.escuela.gestion_escolar.models.enums.EstadoAsistencia.AUSENTE;
import static com.gestion.escuela.gestion_escolar.models.enums.EstadoAsistencia.PRESENTE;
import static com.gestion.escuela.gestion_escolar.models.enums.RolEducativo.DIRECCION;
import static com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia.*;
import static java.time.Month.MARCH;
import static java.time.Month.MAY;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class AsistenciaServiceTest extends DomainServiceFixtureTest {

	@Autowired
	private EscuelaService escuelaService;

	@Autowired
	private EmpleadoEducativoService empleadoEducativoService;

	@Autowired
	private DesignacionService designacionService;

	@Autowired
	private AsistenciaService asistenciaService;

	private Escuela pEscuelaN65;
	private EmpleadoEducativo pGiardinoNoraRosa;

	@BeforeEach
	void setUp() {
		pEscuelaN65 = escuelaService.crear(m_escuelaN65);
		pGiardinoNoraRosa = empleadoEducativoService.crear(pEscuelaN65.getId(), m_giardinoNoraRosa);

		FranjaHoraria martes12a18 = new FranjaHoraria(
				MARTES,
				LocalTime.of(12,0),
				LocalTime.of(18,0)
		);
		mDireccion2467830.agregarFranjaHoraria(martes12a18);

		DesignacionAdministrativa pDireccion2467830 = designacionService.crear(mDireccion2467830);

		designacionService.cubrirConTitular(
				pDireccion2467830.getId(),
				pGiardinoNoraRosa.getId(),
				LocalDate.of(1998,MARCH, 1),
				null,
				1
				);
	}

	@Test
	void obtieneElResumenDeAsistenciaDelEmpleado() {

		LocalDate mayo10 = LocalDate.of(2026, MAY, 10);
		LocalDate mayo12 = LocalDate.of(2026, MAY, 12);
		LocalDate mayo15 = LocalDate.of(2026, MAY, 15);

		asistenciaService.registrarInasistencia(
				pEscuelaN65.getId(),
				pGiardinoNoraRosa.getId(),
				mayo10,
				L_A1,
				null
		);

		asistenciaService.registrarInasistencia(
				pEscuelaN65.getId(),
				pGiardinoNoraRosa.getId(),
				mayo12,
				L_A1,
				null
		);

		asistenciaService.registrarInasistencia(
				pEscuelaN65.getId(),
				pGiardinoNoraRosa.getId(),
				mayo15,
				L_A2,
				null
		);

		LocalDate mayo28 = LocalDate.of(2026, MAY, 28);
		EmpleadoAsistenciaResumen resumen = asistenciaService.getResumenAsistenciaEmpleado(
				pGiardinoNoraRosa,
						mayo28
		);

		assertThat(resumen.faltasUltimoMes()).isEqualTo(3);
		assertThat(resumen.licenciaMasFrecuente()).isEqualTo(L_A1);
		assertThat(resumen.rolesActivos()).hasSize(1);
		assertThat(resumen.rolesActivos()).containsExactly(DIRECCION);

	}

	@Test
	void obtieneElEstadoMensualDeAsistenciaDelEmpleado() {

		LocalDate fechaInasistencia = LocalDate.of(2026, MAY, 12);

		asistenciaService.registrarInasistencia(
				pEscuelaN65.getId(),
				pGiardinoNoraRosa.getId(),
				fechaInasistencia,
				L_A1,
				null
		);

		List<EstadoAsistenciaDia> estados =
				asistenciaService.obtenerEstadoAsistenciaMensual(
						pEscuelaN65.getId(),
						pGiardinoNoraRosa.getId(),
						YearMonth.of(2026, MAY)
				);

		assertThat(estados).hasSize(4);

		EstadoAsistenciaDia mayo5 = estados.get(0);
		EstadoAsistenciaDia mayo12 = estados.get(1);
		EstadoAsistenciaDia mayo19 = estados.get(2);
		EstadoAsistenciaDia mayo26 = estados.get(3);

		assertThat(mayo5.getEstadoAsistencia()).isEqualTo(PRESENTE);
		assertThat(mayo12.getEstadoAsistencia()).isEqualTo(AUSENTE);
		assertThat(mayo12.getTipoLicencia()).isEqualTo(L_A1);
		assertThat(mayo19.getEstadoAsistencia()).isEqualTo(PRESENTE);
		assertThat(mayo26.getEstadoAsistencia()).isEqualTo(PRESENTE);
	}

	@Nested
	class RegistrarAsistencia {

		@Test
		void seRegistraUnaAsistenciaAlEmpleado() {

			LocalDate fechaInasistencia = LocalDate.of(2026, MAY, 10);

			asistenciaService.registrarInasistencia(
					pEscuelaN65.getId(),
					pGiardinoNoraRosa.getId(),
					fechaInasistencia,
					L_A1,
					null
			);

			List<Asistencia> asistencias =
					asistenciaService.obtenerAsistenciasDelMes(
							pEscuelaN65.getId(),
							pGiardinoNoraRosa.getId(),
							YearMonth.of(2026, MAY)
					);

			assertThat(asistencias).hasSize(1);
			Asistencia asistencia = asistencias.getFirst();
			assertThat(fechaInasistencia).isEqualTo(asistencia.getFecha());
			assertThat(asistencia.getEstadoAsistencia()).isEqualTo(AUSENTE);
			assertThat(asistencia.getTipoLicencia()).isEqualTo(L_A1);

		}

		@Test
		void actualizaUnaInasistenciaExistente() {

			LocalDate fechaInasistencia = LocalDate.of(2026, MAY, 10);
			asistenciaService.registrarInasistencia(
					pEscuelaN65.getId(),
					pGiardinoNoraRosa.getId(),
					fechaInasistencia,
					L_A1,
					null
			);

			asistenciaService.registrarInasistencia(
					pEscuelaN65.getId(),
					pGiardinoNoraRosa.getId(),
					fechaInasistencia,
					L_A22,
					"Cambio de licencia"
			);

			List<Asistencia> asistencias =
					asistenciaService.obtenerAsistenciasDelMes(
							pEscuelaN65.getId(),
							pGiardinoNoraRosa.getId(),
							YearMonth.of(2026, MAY)
					);

			assertThat(asistencias).hasSize(1);

			Asistencia asistencia = asistencias.getFirst();

			assertThat(asistencia.getTipoLicencia()).isEqualTo(L_A22);
			assertThat(asistencia.getObservacion()).isEqualTo("Cambio de licencia");

		}

		@Test
		void registraMultiplesInasistenciasEnDistintasFechas() {

			asistenciaService.registrarInasistencia(
					pEscuelaN65.getId(),
					pGiardinoNoraRosa.getId(),
					LocalDate.of(2026, MAY, 10),
					L_A1,
					null
			);

			asistenciaService.registrarInasistencia(
					pEscuelaN65.getId(),
					pGiardinoNoraRosa.getId(),
					LocalDate.of(2026, MAY, 12),
					L_A1,
					null
			);

			List<Asistencia> asistencias =
					asistenciaService.obtenerAsistenciasDelMes(
							pEscuelaN65.getId(),
							pGiardinoNoraRosa.getId(),
							YearMonth.of(2026, MAY)
					);

			assertThat(asistencias).hasSize(2);
		}

		@Test
		void registraUnaInasistenciaConObservacion() {

			LocalDate fechaInasistencia = LocalDate.of(2026, MAY, 10);

			asistenciaService.registrarInasistencia(
					pEscuelaN65.getId(),
					pGiardinoNoraRosa.getId(),
					fechaInasistencia,
					L_A1,
					"Licencia médica"
			);

			Asistencia asistencia = asistenciaService.obtenerAsistenciasDelMes(
							pEscuelaN65.getId(),
							pGiardinoNoraRosa.getId(),
							YearMonth.of(2026, MAY))
							.getFirst();

			assertThat(asistencia.getObservacion()).isEqualTo("Licencia médica");
		}

		@Test
		void deberiaLanzarExcepcionCuandoNoExisteEmpleadoEducativo() {
			Long escuelaId = pEscuelaN65.getId();
			Long empleadoId = 999L;
			LocalDate fecha = LocalDate.of(2026, MAY, 10);

			assertThatThrownBy(
					() -> asistenciaService.registrarInasistencia(
							escuelaId,
							empleadoId,
							fecha,
							L_A1,
							null
					)
			)
			.isInstanceOf(RecursoNoEncontradoException.class)
			.hasMessageContaining("empleado educativo");
		}

	}

	@Nested
	class RegistrarInasistencias {

		@Test
		void noHaceNadaSiLasFechasSonNull() {
			asistenciaService.registrarInasistencias(
					pEscuelaN65.getId(),
					pGiardinoNoraRosa,
					null,
					L_A1,
					null
			);

			List<Asistencia> asistencias =
					asistenciaService.obtenerAsistenciasDelMes(
							pEscuelaN65.getId(),
							pGiardinoNoraRosa.getId(),
							YearMonth.of(2026, MAY)
					);

			assertThat(asistencias).isEmpty();
		}

		@Test
		void noHaceNadaSiLaListaDeFechasEstaVacia() {

			asistenciaService.registrarInasistencias(
					pEscuelaN65.getId(),
					pGiardinoNoraRosa,
					List.of(),
					L_A1,
					null
			);

			List<Asistencia> asistencias =
					asistenciaService.obtenerAsistenciasDelMes(
							pEscuelaN65.getId(),
							pGiardinoNoraRosa.getId(),
							YearMonth.of(2026, MAY)
					);

			assertThat(asistencias).isEmpty();
		}
	}



}
