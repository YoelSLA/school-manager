package com.gestion.escuela.gestion_escolar.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
		name = "curso",
		uniqueConstraints = {
				@UniqueConstraint(
						columnNames = {"escuela_id", "anio", "grado"}
				)
		}
)
@Getter
@Setter
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
}

