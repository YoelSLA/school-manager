package com.gestion.escuela.gestion_escolar.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "materia", uniqueConstraints = {@UniqueConstraint(columnNames = {"escuela_id", "nombre"})})
@Getter
@Setter
public class Materia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nombre;

	@Column(nullable = false)
	private String abreviatura;

	@Column(nullable = false)
	private Integer cantidadModulos;

	@ManyToOne(optional = false)
	@JoinColumn(name = "escuela_id")
	private Escuela escuela;

	public Materia() {
	}

	public Materia(String nombre, String abreviatura, Integer cantidadModulos) {
		this.nombre = nombre;
		this.abreviatura = abreviatura;
		this.cantidadModulos = cantidadModulos;
	}
}
