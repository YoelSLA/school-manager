package com.gestion.escuela.gestion_escolar.models;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "cursos", uniqueConstraints = {@UniqueConstraint(columnNames = {"escuela_id", "anio", "grado"})})
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

	public Curso() {
	}

	public Curso(Integer anio, Integer grado, Escuela escuela) {
		this.anio = anio;
		this.grado = grado;
		this.escuela = escuela;
	}

	public String anioDivision() {
		return anio + "° " + grado;
	}
}

