package com.gestion.escuela.gestion_escolar.models.desginacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionCambioDeFuncion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertFalse;

public class AsignacionCambioDeFuncionTest {

	private EmpleadoEducativo empleadoEducativo;
	private Designacion designacion;

	@BeforeEach
	void setUp() {
		Escuela escuela = new Escuela("Escuela N°65", "Bernal", "Av. Siempre Viva 123", "1145-6789");
		empleadoEducativo = new EmpleadoEducativo(escuela, "27-11111111-1", "Ventoso", "Yoel", "Calle 123", "11-1111-1111", LocalDate.of(1985, 1, 1), LocalDate.of(2010, 3, 1), "yoel@mail.com"
		);
		designacion = new DesignacionAdministrativa(123456, RolEducativo.PRECEPTORIA);
		designacion.asignarAEscuela(escuela);
	}


	@Test
	void unaAsignacionEnCambioDeFuncionNuncaEjerceElCargo() {
		// given
		LocalDate desde = LocalDate.of(2024, 1, 1);
		LocalDate hasta = LocalDate.of(2024, 12, 31);

		AsignacionCambioDeFuncion asignacion = new AsignacionCambioDeFuncion(
				designacion,
				empleadoEducativo,
				desde,
				hasta
		);

		LocalDate fechaConsulta = LocalDate.of(2024, 6, 1);

		boolean ejerce = asignacion.ejerceCargoEn(fechaConsulta);

		assertFalse(ejerce);
	}

	@Test
	void unaAsignacionEnCambioDeFuncionNoEjerceNiConLicenciaNiSinLicencia() {

		AsignacionCambioDeFuncion asignacion = new AsignacionCambioDeFuncion(
				designacion,
				empleadoEducativo,
				LocalDate.of(2024, 1, 1),
				LocalDate.of(2024, 12, 31)
		);

		asignacion.solicitarLicencia(
				LocalDate.of(2024, 3, 1),
				LocalDate.of(2024, 3, 10),
				TipoLicencia.ENFERMEDAD, "Se enfermo"
		);

		assertFalse(asignacion.ejerceCargoEn(LocalDate.of(2024, 3, 5)));
	}

}

