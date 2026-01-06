package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
		name = "escuela",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = {"nombre", "localidad"})
		}
)
@Getter
public class Escuela {

	@Id
	@GeneratedValue
	private Long id;

	private String direccion;
	private String telefono;

	@Column(nullable = false)
	private String localidad;

	@Column(nullable = false)
	private String nombre;

	@Column(nullable = false)
	private boolean activa;

	@OneToMany(mappedBy = "escuela", cascade = CascadeType.ALL)
	private List<EmpleadoEducativo> empleadosEducativos;

	@OneToMany(mappedBy = "escuela", cascade = CascadeType.ALL)
	private List<Designacion> designaciones;

	@OneToMany(mappedBy = "escuela", cascade = CascadeType.ALL)
	private List<Materia> materias;

	@OneToMany(mappedBy = "escuela", cascade = CascadeType.ALL)
	private List<Curso> cursos;

	protected Escuela() {
		this.activa = true;
		this.empleadosEducativos = new ArrayList<>();
		this.designaciones = new ArrayList<>();
		this.materias = new ArrayList<>();
		this.cursos = new ArrayList<>();

	}

	public Escuela(String nombre, String localidad, String direccion, String telefono) {
		this.nombre = nombre;
		this.localidad = localidad;
		this.direccion = direccion;
		this.telefono = telefono;
		this.activa = true;
		this.empleadosEducativos = new ArrayList<>();
		this.designaciones = new ArrayList<>();
		this.materias = new ArrayList<>();
		this.cursos = new ArrayList<>();

	}

	public void agregarDesignacion(Designacion designacion) {
		designacion.setEscuela(this);
		this.designaciones.add(designacion);
	}

//	/* ==========================
//	   COMPORTAMIENTO
//	   ========================== */
//
//	public void agregarEmpleado(EmpleadoEducativo empleado) {
//		if (empleado == null) {
//			throw new IllegalArgumentException("El empleado no puede ser null");
//		}
//
//		empleadosEducativos.add(empleado);
//		empleado.setEscuela(this);
//	}
//
//	public void quitarEmpleado(EmpleadoEducativo empleado) {
//		if (empleado.estaActivo()) {
//			throw new IllegalStateException(
//					"No se puede quitar un empleado activo; debe desactivarse primero"
//			);
//		}
//
//		empleadosEducativos.remove(empleado);
//		empleado.setEscuela(null);
//	}
//
//	public void agregarDesignacion(Designacion designacion) {
//		if (designacion == null) {
//			throw new IllegalArgumentException("La designación no puede ser null");
//		}
//
//		designaciones.add(designacion);
//		designacion.setEscuela(this);
//	}
//
//	public void quitarDesignacion(Designacion designacion) {
//		if (!designacion.estaVacante()) {
//			throw new IllegalStateException(
//					"No se puede quitar una designación con empleado asignado"
//			);
//		}
//
//		designaciones.remove(designacion);
//		designacion.setEscuela(null);
//	}
//
//	public void agregarMateria(Materia materia) {
//		if (materia == null) {
//			throw new IllegalArgumentException("La materia no puede ser null");
//		}
//
//		materias.add(materia);
//		materia.setEscuela(this);
//	}
//
//	public void quitarMateria(Materia materia) {
//		boolean usada = designaciones.stream()
//				.filter(DesignacionCurso.class::isInstance)
//				.map(DesignacionCurso.class::cast)
//				.anyMatch(d -> d.getMateria().equals(materia));
//
//		if (usada) {
//			throw new IllegalStateException(
//					"No se puede quitar una materia con designaciones asociadas"
//			);
//		}
//
//		materias.remove(materia);
//		materia.setEscuela(null);
//	}
//
//	public void agregarCurso(Curso curso) {
//		if (curso == null) {
//			throw new IllegalArgumentException("El curso no puede ser null");
//		}
//
//		cursos.add(curso);
//		curso.setEscuela(this);
//	}
//
//	public void quitarCurso(Curso curso) {
//		boolean usado = designaciones.stream()
//				.filter(DesignacionCurso.class::isInstance)
//				.map(DesignacionCurso.class::cast)
//				.anyMatch(d -> d.getCurso().equals(curso));
//
//		if (usado) {
//			throw new IllegalStateException(
//					"No se puede quitar un curso con designaciones asociadas"
//			);
//		}
//
//		cursos.remove(curso);
//		curso.setEscuela(null);
//	}
//
//
//	public List<EmpleadoEducativo> empleadosActivos() {
//		return empleadosEducativos.stream()
//				.filter(EmpleadoEducativo::estaActivo)
//				.toList();
//	}
//
//	public void desactivar() {
//		if (!empleadosActivos().isEmpty()) {
//			throw new IllegalStateException("No se puede desactivar una escuela con empleados activos");
//		}
//		this.activa = false;
//	}
//
//	public List<DesignacionAdministrativa> designacionesAdministrativas() {
//		return designaciones.stream()
//				.filter(DesignacionAdministrativa.class::isInstance)
//				.map(DesignacionAdministrativa.class::cast)
//				.toList();
//	}
//
//	public List<DesignacionCurso> designacionesDeCurso() {
//		return designaciones.stream()
//				.filter(DesignacionCurso.class::isInstance)
//				.map(DesignacionCurso.class::cast)
//				.toList();
//	}
}
