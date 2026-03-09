package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name = "designacion_curso")
@Getter
public class DesignacionCurso extends Designacion {

	@ManyToOne(optional = false)
	private Materia materia;

	@ManyToOne(optional = false)
	private Curso curso;

	@Column(nullable = false)
	private String orientacion;

	protected DesignacionCurso() {
	}

	public DesignacionCurso(Escuela escuela, Integer cupof, Materia materia, Curso curso, String orientacion) {
		super(escuela, cupof, RolEducativo.DOCENTE);

		Validaciones.noNulo(materia, "materia");
		Validaciones.noNulo(curso, "curso");
		Validaciones.noBlank(orientacion, "orientacion");

		this.materia = materia;
		this.curso = curso;
		this.orientacion = orientacion;
	}

	@Override
	public String toString() {
		return super.toString().replace("}", ", materiaId=" + (materia != null ? materia.getId() : null) + ", cursoId=" + (curso != null ? curso.getId() : null) + ", orientacion='" + getOrientacion() + '\'' + '}');
	}

	public void actualizar(Integer cupof, Materia materia, Curso curso, String orientacion) {

		Validaciones.noNulo(cupof, "cupof");
		Validaciones.noNulo(materia, "materia");
		Validaciones.noNulo(curso, "curso");
		Validaciones.noBlank(orientacion, "orientacion");

		actualizarCupof(cupof);
		this.materia = materia;
		this.curso = curso;
		this.orientacion = orientacion;
	}
}
