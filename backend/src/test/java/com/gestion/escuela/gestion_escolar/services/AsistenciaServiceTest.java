package com.gestion.escuela.gestion_escolar.services;


import com.gestion.escuela.gestion_escolar.models.*;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.enums.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class AsistenciaServiceTest {

	@Autowired
	private DesignacionService designacionService;

	@Autowired
	private EmpleadoEducativoService empleadoService;

	@Autowired
	private EscuelaService escuelaService;

	@Autowired
	private AsistenciaService asistenciaService;

	private Escuela escuela;
	private EmpleadoEducativo juanPerez;
	private DesignacionAdministrativa secretaria;
	private DesignacionAdministrativa preceptoria;

	private Escuela crearEscuela65Bernal() {
		escuela = new Escuela(
				"Escuela N°65",
				"Bernal",
				"Brown 5066",
				"42573309"
		);
		return escuelaService.crear(escuela);
	}

	private EmpleadoEducativo crearEmpleadoJuanPerez() {
		EmpleadoEducativo empleadoEducativo = new EmpleadoEducativo(
				escuela,
				"20-34567891-2",
				"Juan",
				"Pérez",
				"Mitre 1450",
				"1162347890",
				LocalDate.of(1982, 6, 18),
				LocalDate.of(2008, 4, 1),
				"juan.perez@test.com"
		);

		return empleadoService.crear(escuela.getId(), empleadoEducativo);
	}

	private DesignacionAdministrativa crearDesignacionAdministrativa(
			Integer cupof,
			RolEducativo rolEducativo,
			List<FranjaHoraria> franjasHorarias
	) {
		DesignacionAdministrativa designacion =
				new DesignacionAdministrativa(escuela, cupof, rolEducativo);

		franjasHorarias.forEach(designacion::agregarFranjaHoraria);

		return designacionService.crear(designacion);
	}


	@BeforeEach
	void setUp() {

		List<FranjaHoraria> franjasHorariasSecretaria = List.of(
				new FranjaHoraria(DiaDeSemana.LUNES, LocalTime.of(13, 0), LocalTime.of(17, 30)),
				new FranjaHoraria(DiaDeSemana.MARTES, LocalTime.of(14, 0), LocalTime.of(18, 30)),
				new FranjaHoraria(DiaDeSemana.MIERCOLES, LocalTime.of(14, 0), LocalTime.of(18, 30)),
				new FranjaHoraria(DiaDeSemana.JUEVES, LocalTime.of(13, 0), LocalTime.of(17, 30)),
				new FranjaHoraria(DiaDeSemana.VIERNES, LocalTime.of(7, 30), LocalTime.of(12, 0))
		);
		List<FranjaHoraria> franjasHorariasPreceptoria = List.of(
				new FranjaHoraria(DiaDeSemana.LUNES, LocalTime.of(7, 30), LocalTime.of(12, 0)),
				new FranjaHoraria(DiaDeSemana.MARTES, LocalTime.of(7, 30), LocalTime.of(12, 0)),
				new FranjaHoraria(DiaDeSemana.MIERCOLES, LocalTime.of(7, 30), LocalTime.of(12, 0)),
				new FranjaHoraria(DiaDeSemana.JUEVES, LocalTime.of(7, 30), LocalTime.of(12, 0)),
				new FranjaHoraria(DiaDeSemana.VIERNES, LocalTime.of(7, 30), LocalTime.of(12, 0))
		);

		escuela = crearEscuela65Bernal();
		juanPerez = crearEmpleadoJuanPerez();
		secretaria = crearDesignacionAdministrativa(2467832, RolEducativo.SECRETARIA, franjasHorariasSecretaria);
		preceptoria = crearDesignacionAdministrativa(2467833, RolEducativo.PRECEPTORIA, franjasHorariasPreceptoria);
	}

	@Test
	void impactarLicencia_creaAsistenciasEnDiasLaborables() {
		// Arrange
		LocalDate fechaInicio = LocalDate.of(2026, 1, 5);
		LocalDate fechaFin = LocalDate.of(2026, 1, 16);
		Periodo periodo = new Periodo(fechaInicio, fechaFin);
		Licencia licencia = juanPerez.crearLicencia(TipoLicencia.L_A1, periodo, null);

		LocalDate fechaTomaPosesion = LocalDate.of(2026, 1, 2);
		AsignacionTitular asignacionTitular1 = secretaria.cubrirConTitular(juanPerez, fechaTomaPosesion);
		AsignacionTitular asignacionTitular2 = preceptoria.cubrirConTitular(juanPerez, fechaTomaPosesion);

		// sanity check
		assertEquals(EstadoAsignacion.LICENCIA, asignacionTitular1.getEstadoEn(fechaInicio));
		assertEquals(EstadoAsignacion.LICENCIA, asignacionTitular2.getEstadoEn(fechaInicio));
		assertEquals(EstadoDesignacion.LICENCIA, secretaria.getEstadoEn(fechaInicio));
		assertEquals(EstadoDesignacion.LICENCIA, preceptoria.getEstadoEn(fechaInicio));

		// Act
		asistenciaService.impactarLicencia(licencia);

		// =======================
		// ASSERT
		// =======================

		List<Asistencia> asistencias = asistenciaService.asistenciasDe(juanPerez.getId());

		for (Asistencia a : asistencias) {
			System.out.println(a);
		}

		// 2 semanas → 10 días laborales
		assertEquals(10, asistencias.size());

		// Me armo un set de fechas reales creadas
		Set<LocalDate> fechasAsistidas = asistencias.stream()
				.map(Asistencia::getFecha)
				.collect(Collectors.toSet());

		// Recorro todo el período día por día
		for (LocalDate fecha = fechaInicio; !fecha.isAfter(fechaFin); fecha = fecha.plusDays(1)) {

			DayOfWeek dayOfWeek = fecha.getDayOfWeek();

			if (dayOfWeek == DayOfWeek.SATURDAY || dayOfWeek == DayOfWeek.SUNDAY) {
				// ❌ fines de semana → NO debe haber asistencia
				assertFalse(
						fechasAsistidas.contains(fecha),
						"No debería haber asistencia el " + fecha
				);
			} else {
				// ✅ día laboral → DEBE haber asistencia
				assertTrue(
						fechasAsistidas.contains(fecha),
						"Falta asistencia el " + fecha
				);
			}
		}

		// Verificación fina de cada asistencia
		asistencias.forEach(a -> {
			assertEquals(OrigenAsistencia.LICENCIA, a.getOrigenAsistencia());
			assertEquals(licencia.getId(), a.getLicencia().getId());
		});
	}

}
