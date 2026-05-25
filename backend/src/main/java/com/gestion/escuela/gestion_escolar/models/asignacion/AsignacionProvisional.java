package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("PROVISIONAL")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AsignacionProvisional extends Asignacion {

	public AsignacionProvisional(
			EmpleadoEducativo empleadoEducativo,
			Designacion designacion,
			Periodo periodo,
			Integer secuencia
	) {
		super(
				empleadoEducativo,
				designacion,
				periodo,
				secuencia
		);
	}

	public static Builder builder() {
		return new Builder();
	}

	@Override
	public SituacionDeRevista getSituacionDeRevista() {
		return SituacionDeRevista.PROVISIONAL;
	}

	public static class Builder {

		private EmpleadoEducativo empleadoEducativo;
		private Designacion designacion;
		private Periodo periodo;
		private Integer secuencia;

		public Builder empleadoEducativo(EmpleadoEducativo empleadoEducativo) {
			this.empleadoEducativo = empleadoEducativo;
			return this;
		}

		public Builder designacion(Designacion designacion) {
			this.designacion = designacion;
			return this;
		}

		public Builder periodo(Periodo periodo) {
			this.periodo = periodo;
			return this;
		}

		public Builder secuencia(Integer secuencia) {
			this.secuencia = secuencia;
			return this;
		}

		public AsignacionProvisional build() {
			return new AsignacionProvisional(
					empleadoEducativo,
					designacion,
					periodo,
					secuencia
			);
		}
	}
}