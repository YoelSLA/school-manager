package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.AbstractIntegrationTest;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import org.junit.jupiter.api.BeforeEach;

import java.time.LocalDate;
import java.time.Month;

import static com.gestion.escuela.gestion_escolar.models.enums.RolEducativo.DIRECCION;
import static com.gestion.escuela.gestion_escolar.models.enums.Turno.MANIANA;
import static com.gestion.escuela.gestion_escolar.models.enums.Turno.TARDE;
import static java.time.Month.MAY;
import static java.time.Month.NOVEMBER;

public abstract class DomainServiceFixtureTest extends AbstractIntegrationTest  {

	protected Escuela m_escuelaN65;
	protected EmpleadoEducativo m_giardinoNoraRosa;
	protected EmpleadoEducativo m_billordoTomasa;
	protected EmpleadoEducativo m_marchettiRoman;
	protected DesignacionAdministrativa mDireccion2467830;
	protected DesignacionCurso m_plg2467775;
	protected Materia m_practicasDelLenguaje;
	protected Curso m_a1g1;
	protected Curso m_a1g2;

	@BeforeEach
	void setUpFixture() {

		m_escuelaN65 = new Escuela(
				"Escuela N°65",
				"Bernal",
				"Brown 5066",
				"42573309"
		);

		LocalDate fechaNacimientoGiardino = LocalDate.of(1961, NOVEMBER, 10);
		LocalDate fechaIngresoGiardino =  LocalDate.of(1998, Month.MARCH, 1);
		m_giardinoNoraRosa = EmpleadoEducativo.builder()
				.escuela(m_escuelaN65)
				.cuil("27-14762038-7")
				.nombre("Nora Rosa")
				.apellido("Giardino")
				.fechaDeNacimiento(fechaNacimientoGiardino)
				.fechaDeIngreso(fechaIngresoGiardino)
				.email("giardino@gmail.com")
				.build();

		LocalDate fechaNacimientoBillordo = LocalDate.of(1961, NOVEMBER, 10);
		LocalDate fechaIngresoBillordo =  LocalDate.of(1965, MAY, 7);
		m_billordoTomasa = EmpleadoEducativo.builder()
				.escuela(m_escuelaN65)
				.cuil("27-17303175-6")
				.nombre("Tomasa")
				.apellido("Billordo")
				.fechaDeNacimiento(fechaNacimientoBillordo)
				.fechaDeIngreso(fechaIngresoBillordo)
				.email("billordo@gmail.com")
				.build();

		LocalDate fechaNacimientoMarchetti = LocalDate.of(1961, NOVEMBER, 10);
		LocalDate fechaIngresoMarchetti =  LocalDate.of(1965, MAY, 7);
		m_marchettiRoman = EmpleadoEducativo.builder()
				.escuela(m_escuelaN65)
				.cuil("20-38156078-4")
				.nombre("Roman")
				.apellido("Marchetti")
				.fechaDeNacimiento(fechaNacimientoMarchetti)
				.fechaDeIngreso(fechaIngresoMarchetti)
				.email("marchetti@gmail.com")
				.build();

		m_practicasDelLenguaje = new Materia(
				"Practicas del Lenguaje",
				"PLG",
				4
		);

		m_a1g1 = new Curso(MANIANA, 1, 1);
		m_a1g2 = new Curso(TARDE, 1, 2);

		mDireccion2467830 = new DesignacionAdministrativa(m_escuelaN65, 2467830, DIRECCION);
		m_plg2467775 = new DesignacionCurso(
				m_escuelaN65,
				2467775,
				m_practicasDelLenguaje,
				m_a1g1,
				"Bachiller de Ciclo Básico"
		);

	}

}
