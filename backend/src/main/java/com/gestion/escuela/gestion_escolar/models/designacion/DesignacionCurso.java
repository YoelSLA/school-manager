package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "designacion_curso")
@Getter
@Setter
public class DesignacionCurso extends Designacion {

	@ManyToOne(optional = false)
	private Materia materia;

	@ManyToOne(optional = false)
	private Curso curso;

	protected DesignacionCurso() {
	}

	public DesignacionCurso(Escuela escuela, Integer cupof, Materia materia, Curso curso) {
		super(escuela, cupof, RolEducativo.DOCENTE);
		this.materia = materia;
		this.curso = curso;
	}

	public String getOrientacion() {
		return null;
	}

	@Override
	public String toString() {
		return super.toString().replace("}", ", materiaId=" + (materia != null ? materia.getId() : null) + ", cursoId=" + (curso != null ? curso.getId() : null) + ", orientacion='" + getOrientacion() + '\'' + '}');
	}

}
