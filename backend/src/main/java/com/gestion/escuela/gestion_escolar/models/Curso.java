package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.curso.AnioInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.curso.GradoInvalidoException;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(
		name = "curso",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = {"escuela_id", "anio", "grado", "turno"})
		}
)
@Getter
public class Curso {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Integer anio;

	@Column(nullable = false)
	private Integer grado;

	@ManyToOne(optional = false)
	@JoinColumn(name = "escuela_id", nullable = false)
	private Escuela escuela;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Turno turno;

	protected Curso() {
	}

	public Curso(Turno turno, Integer anio, Integer grado, Escuela escuela) {
		validar(turno, anio, grado, escuela);

		this.turno = turno;
		this.anio = anio;
		this.grado = grado;
		this.escuela = escuela;
	}

	public void asignarAEscuela(Escuela escuela) {
		Validaciones.noNulo(escuela, "escuela");
		this.escuela = escuela;
	}

	public String anioDivision() {
		return anio + "° " + grado;
	}

	@Override
	public String toString() {
		return anioDivision() + " - " + turno;
	}

	private void validar(Turno turno, Integer anio, Integer grado, Escuela escuela) {

		Validaciones.noNulo(turno, "turno");
		Validaciones.noNulo(anio, "anio");
		Validaciones.noNulo(grado, "grado");
		Validaciones.noNulo(escuela, "escuela");

		if (anio <= 0) {
			throw new AnioInvalidoException(anio);
		}

		if (grado <= 0) {
			throw new GradoInvalidoException(grado);
		}
	}


}

