package com.gestion.escuela.gestion_escolar.models;

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

public abstract class DomainTestFixture {

	protected Escuela escuelaN65;
	protected EmpleadoEducativo giardinoNoraRosa;
	protected EmpleadoEducativo billordoTomasa;
	protected EmpleadoEducativo marchettiRoman;
	protected DesignacionAdministrativa direccion2467830;
	protected DesignacionCurso plg2467775;
	protected Materia practicasDelLenguaje;
	protected Curso a1g1;
	protected Curso a1g2;

	@BeforeEach
	void setUpFixture() {

		escuelaN65 = new Escuela(
				"Escuela N°65",
				"Bernal",
				"Brown 5066",
				"42573309"
		);

		LocalDate fechaNacimientoGiardino = LocalDate.of(1961, NOVEMBER, 10);
		LocalDate fechaIngresoGiardino =  LocalDate.of(1998, Month.MARCH, 1);
		giardinoNoraRosa = EmpleadoEducativo.builder()
				.escuela(escuelaN65)
				.cuil("27-14762038-7")
				.nombre("Nora Rosa")
				.apellido("Giardino")
				.fechaDeNacimiento(fechaNacimientoGiardino)
				.fechaDeIngreso(fechaIngresoGiardino)
				.email("giardino@gmail.com")
				.build();

		LocalDate fechaNacimientoBillordo = LocalDate.of(1961, NOVEMBER, 10);
		LocalDate fechaIngresoBillordo =  LocalDate.of(1965, MAY, 7);
		billordoTomasa = EmpleadoEducativo.builder()
				.escuela(escuelaN65)
				.cuil("27-14762038-7")
				.nombre("Tomasa")
				.apellido("Billordo")
				.fechaDeNacimiento(fechaNacimientoBillordo)
				.fechaDeIngreso(fechaIngresoBillordo)
				.email("billordo@gmail.com")
				.build();

		LocalDate fechaNacimientoMarchetti = LocalDate.of(1961, NOVEMBER, 10);
		LocalDate fechaIngresoMarchetti =  LocalDate.of(1965, MAY, 7);
		marchettiRoman = EmpleadoEducativo.builder()
				.escuela(escuelaN65)
				.cuil("20-38156078-4")
				.nombre("Roman")
				.apellido("Marchetti")
				.fechaDeNacimiento(fechaNacimientoMarchetti)
				.fechaDeIngreso(fechaIngresoMarchetti)
				.email("marchetti@gmail.com")
				.build();

		practicasDelLenguaje = new Materia(
				"Practicas del Lenguaje",
				"PLG",
				4
		);

		a1g1 = new Curso(MANIANA, 1, 1);
		a1g2 = new Curso(TARDE, 1, 2);

		direccion2467830 = new DesignacionAdministrativa(escuelaN65, 2467830, DIRECCION);
		plg2467775 = new DesignacionCurso(
				escuelaN65,
				2467775,
				practicasDelLenguaje,
				a1g1,
				"Bachiller de Ciclo Básico"
		);

	}

}
