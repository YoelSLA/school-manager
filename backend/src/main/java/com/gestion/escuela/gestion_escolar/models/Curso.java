package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
		name = "cursos",
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
	@Setter
	private Escuela escuela;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Turno turno;

	public Curso() {
	}

	public Curso(Turno turno, Integer anio, Integer grado) {
		this.turno = turno;
		this.anio = anio;
		this.grado = grado;
	}

	public String anioDivision() {
		return anio + "° " + grado;
	}
}

