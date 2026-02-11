package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

import static com.gestion.escuela.gestion_escolar.models.enums.RolEducativo.*;

@Entity
@DiscriminatorValue("PROVISIONAL")
public class AsignacionProvisional extends Asignacion {

	protected AsignacionProvisional() {
	}

	public AsignacionProvisional(
			Designacion designacion,
			EmpleadoEducativo empleado,
			LocalDate fechaTomaPosesion
	) {
		super(
				empleado,
				new Periodo(
						fechaTomaPosesion,
						calcularFechaFinSegunRol(designacion, fechaTomaPosesion)
				)
		);
	}

	private static LocalDate calcularFechaFinSegunRol(
			Designacion designacion,
			LocalDate fechaInicio
	) {
		RolEducativo rol = designacion.getRolEducativo();

		if (esSinFechaFinProvisional(rol)) {
			return null;
		}

		return calcularFechaFin(fechaInicio);
	}

	private static LocalDate calcularFechaFin(LocalDate fechaInicio) {
		LocalDate primeroDeMarzo = LocalDate.of(fechaInicio.getYear(), 3, 1);

		return fechaInicio.isBefore(primeroDeMarzo)
				? primeroDeMarzo
				: primeroDeMarzo.plusYears(1);
	}

	private static boolean esSinFechaFinProvisional(RolEducativo rolEducativo) {
		return rolEducativo == SECRETARIA
				|| rolEducativo == DIRECCION
				|| rolEducativo == VICEDIRECCION;
	}

	@Override
	public SituacionDeRevista getSituacionDeRevista() {
		return SituacionDeRevista.PROVISIONAL;
	}
}

