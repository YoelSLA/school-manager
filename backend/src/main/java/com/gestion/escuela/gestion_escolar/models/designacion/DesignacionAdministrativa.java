package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "designaciones_administrativas")
@Getter
@Setter
public class DesignacionAdministrativa extends Designacion {

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private RolEducativo rolEducativo;

	protected DesignacionAdministrativa() {
	}

	public DesignacionAdministrativa(Escuela escuela, Integer cupof, RolEducativo rolEducativo) {
		super(escuela, cupof);
		this.rolEducativo = rolEducativo;
	}

}
