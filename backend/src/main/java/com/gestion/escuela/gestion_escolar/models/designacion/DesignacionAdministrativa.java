package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "designacion_administrativa")
@Getter
@Setter
public class DesignacionAdministrativa extends Designacion {

	protected DesignacionAdministrativa() {
	}

	public DesignacionAdministrativa(Escuela escuela, Integer cupof, RolEducativo rolEducativo) {
		super(escuela, cupof, rolEducativo);
	}

}
