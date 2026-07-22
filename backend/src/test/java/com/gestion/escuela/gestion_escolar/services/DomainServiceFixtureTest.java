package com.gestion.escuela.gestion_escolar.services;

import static com.gestion.escuela.gestion_escolar.models.enums.RolEducativo.DIRECCION;
import static com.gestion.escuela.gestion_escolar.models.enums.Turno.MANIANA;
import static com.gestion.escuela.gestion_escolar.models.enums.Turno.TARDE;
import static java.time.Month.MAY;
import static java.time.Month.NOVEMBER;

import com.gestion.escuela.gestion_escolar.AbstractIntegrationTest;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import java.time.LocalDate;
import java.time.Month;
import org.junit.jupiter.api.BeforeEach;

public abstract class DomainServiceFixtureTest extends AbstractIntegrationTest {

  protected Escuela escuelaN65M;
  protected EmpleadoEducativo giardinoNoraRosaM;
  protected EmpleadoEducativo billordoTomasaM;
  protected EmpleadoEducativo marchettiRomanM;
  protected DesignacionAdministrativa direccion2467830M;
  protected DesignacionCurso plg2467775M;
  protected Materia practicasDelLenguajeM;
  protected Curso a1g1M;
  protected Curso a1g2M;

  @BeforeEach
  void setUpFixture() {

    escuelaN65M = new Escuela("Escuela N°65", "Bernal", "Brown 5066", "42573309");

    LocalDate fechaNacimientoGiardino = LocalDate.of(1961, NOVEMBER, 10);
    LocalDate fechaIngresoGiardino = LocalDate.of(1998, Month.MARCH, 1);
    giardinoNoraRosaM =
        EmpleadoEducativo.builder()
            .escuela(escuelaN65M)
            .cuil("27-14762038-7")
            .nombre("Nora Rosa")
            .apellido("Giardino")
            .fechaDeNacimiento(fechaNacimientoGiardino)
            .fechaDeIngreso(fechaIngresoGiardino)
            .email("giardino@gmail.com")
            .build();

    LocalDate fechaNacimientoBillordo = LocalDate.of(1961, NOVEMBER, 10);
    LocalDate fechaIngresoBillordo = LocalDate.of(1965, MAY, 7);
    billordoTomasaM =
        EmpleadoEducativo.builder()
            .escuela(escuelaN65M)
            .cuil("27-17303175-6")
            .nombre("Tomasa")
            .apellido("Billordo")
            .fechaDeNacimiento(fechaNacimientoBillordo)
            .fechaDeIngreso(fechaIngresoBillordo)
            .email("billordo@gmail.com")
            .build();

    LocalDate fechaNacimientoMarchetti = LocalDate.of(1961, NOVEMBER, 10);
    LocalDate fechaIngresoMarchetti = LocalDate.of(1965, MAY, 7);
    marchettiRomanM =
        EmpleadoEducativo.builder()
            .escuela(escuelaN65M)
            .cuil("20-38156078-4")
            .nombre("Roman")
            .apellido("Marchetti")
            .fechaDeNacimiento(fechaNacimientoMarchetti)
            .fechaDeIngreso(fechaIngresoMarchetti)
            .email("marchetti@gmail.com")
            .build();

    practicasDelLenguajeM = new Materia("Practicas del Lenguaje", "PLG", 4);

    a1g1M = new Curso(MANIANA, 1, 1);
    a1g2M = new Curso(TARDE, 1, 2);

    direccion2467830M = new DesignacionAdministrativa(escuelaN65M, 2467830, DIRECCION);
    plg2467775M =
        new DesignacionCurso(
            escuelaN65M, 2467775, practicasDelLenguajeM, a1g1M, "Bachiller de Ciclo Básico");
  }
}
