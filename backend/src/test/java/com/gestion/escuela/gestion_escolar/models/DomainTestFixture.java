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
  protected EmpleadoEducativo perezJuan;
  protected EmpleadoEducativo gomezMaria;
  protected EmpleadoEducativo fernandezLucas;
  protected DesignacionAdministrativa direccion2467830;
  protected DesignacionCurso plg2467775;
  protected Materia practicasDelLenguaje;
  protected Curso a1g1;
  protected Curso a1g2;

  @BeforeEach
  void setUpFixture() {

    escuelaN65 = new Escuela("Escuela N°65", "Bernal", "Brown 5066", "42573309");

    perezJuan = EmpleadoEducativo.builder()
                    .escuela(escuelaN65)
                    .cuil("20-30123456-7")
                    .nombre("Juan")
                    .apellido("Pérez")
                    .fechaDeNacimiento(LocalDate.of(1980, NOVEMBER, 10))
                    .fechaDeIngreso(LocalDate.of(2010, Month.MARCH, 1))
                    .email("juan.perez@gmail.com")
                    .build();

    gomezMaria = EmpleadoEducativo.builder()
                    .escuela(escuelaN65)
                    .cuil("27-28987654-3")
                    .nombre("María")
                    .apellido("Gómez")
                    .fechaDeNacimiento(LocalDate.of(1985, NOVEMBER, 10))
                    .fechaDeIngreso(LocalDate.of(2012, MAY, 7))
                    .email("maria.gomez@gmail.com")
                    .build();

    fernandezLucas = EmpleadoEducativo.builder()
            .escuela(escuelaN65)
            .cuil("20-35678901-2")
            .nombre("Lucas")
            .apellido("Fernández")
            .fechaDeNacimiento(LocalDate.of(1990, NOVEMBER, 10))
            .fechaDeIngreso(LocalDate.of(2018, MAY, 7))
            .email("lucas.fernandez@gmail.com")
            .build();

    practicasDelLenguaje = new Materia("Practicas del Lenguaje", "PLG", 4);

    a1g1 = new Curso(MANIANA, 1, 1);
    a1g2 = new Curso(TARDE, 1, 2);

    direccion2467830 = new DesignacionAdministrativa(escuelaN65, 2467830, DIRECCION);
    plg2467775 =
        new DesignacionCurso(
            escuelaN65, 2467775, practicasDelLenguaje, a1g1, "Bachiller de Ciclo Básico");
  }
}
