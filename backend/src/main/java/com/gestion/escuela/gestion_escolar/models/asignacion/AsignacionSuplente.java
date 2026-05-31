package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("SUPLENTE")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AsignacionSuplente extends Asignacion {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "licencia_id")
	private Licencia licencia;

	private AsignacionSuplente(
			EmpleadoEducativo empleadoEducativo,
			Designacion designacion,
			Periodo periodo,
			Integer secuencia,
			Licencia licencia
	) {
		super(empleadoEducativo, designacion, periodo, secuencia);
		this.licencia = licencia;
	}

	public static Builder builder() {
		return new Builder();
	}

	@Override
	public SituacionDeRevista getSituacionDeRevista() {
		return SituacionDeRevista.SUPLENTE;
	}

	public void convertirseEnProvisional(LocalDate fechaDesde, Integer secuencia) {

		LocalDate fechaFinSuplencia = fechaDesde.minusDays(1);

		this.finalizarPorBajaDefinitiva(
				CausaBaja.PASE_A_PROVISIONAL,
				fechaFinSuplencia
		);

		getDesignacion().cubrirConProvisionalAutomatico(
				this.getEmpleadoEducativo(),
				fechaDesde,
				secuencia
		);
	}

	public static class Builder {

		private EmpleadoEducativo empleadoEducativo;
		private Designacion designacion;
		private Periodo periodo;
		private Integer secuencia;
		private Licencia licencia;

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

		public Builder licencia(Licencia licencia) {
			this.licencia = licencia;
			return this;
		}

		public AsignacionSuplente build() {
			return new AsignacionSuplente(
					empleadoEducativo,
					designacion,
					periodo,
					secuencia,
					licencia
			);
		}
	}
}