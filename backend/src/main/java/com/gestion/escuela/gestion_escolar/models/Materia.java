package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.materia.CantidadModulosInvalidaException;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(
		name = "materia",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = {"escuela_id", "nombre"})
		}
)
@Getter
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

	protected Materia() {
	}

	public Materia(
			String nombre,
			String abreviatura,
			Integer cantidadModulos
	) {

		validarCrearOActualizarMateria(nombre, abreviatura, cantidadModulos);

		this.nombre = nombre;
		this.abreviatura = abreviatura;
		this.cantidadModulos = cantidadModulos;

	}

	public void actualizar(String nombre, String abreviatura, Integer cantidadModulos) {

		validarCrearOActualizarMateria(nombre, abreviatura, cantidadModulos);

		this.nombre = nombre;
		this.abreviatura = abreviatura;
		this.cantidadModulos = cantidadModulos;
	}

	public void setEscuela(Escuela escuela) {
		Validaciones.noNulo(escuela, "escuela");
		this.escuela = escuela;
	}

	@Override
	public String toString() {
		String textoModulo = cantidadModulos == 1 ? "módulo" : "módulos";
		return nombre + " (" + abreviatura + ") - " + cantidadModulos + " " + textoModulo;
	}

	private void validarCrearOActualizarMateria(
			String nombre,
			String abreviatura,
			Integer cantidadModulos
	) {

		Validaciones.noBlank(nombre, "nombre");
		Validaciones.noBlank(abreviatura, "abreviatura");
		Validaciones.noNulo(cantidadModulos, "cantidadModulos");

		if (cantidadModulos <= 0) {
			throw new CantidadModulosInvalidaException(cantidadModulos);
		}
	}

}