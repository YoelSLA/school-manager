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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String direccion;
	private String telefono;

	@Column(nullable = false)
	private String localidad;

	@Column(nullable = false)
	private String nombre;

	@Column(nullable = false)
	private boolean activa;

	@OneToMany(mappedBy = "escuela", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<EmpleadoEducativo> empleadosEducativos;

	@OneToMany(mappedBy = "escuela", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Designacion> designaciones;

	@OneToMany(mappedBy = "escuela", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Materia> materias;

	@OneToMany(mappedBy = "escuela", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Curso> cursos;

	/* ==========================
	   CONSTRUCTORES
	   ========================== */

	protected Escuela() {
		this.activa = true;
		inicializarColecciones();
	}

	public Escuela(String nombre, String localidad, String direccion, String telefono) {
		this.nombre = nombre;
		this.localidad = localidad;
		this.direccion = direccion;
		this.telefono = telefono;
		this.activa = true;
		inicializarColecciones();
	}

	private void inicializarColecciones() {
		this.empleadosEducativos = new ArrayList<>();
		this.designaciones = new ArrayList<>();
		this.materias = new ArrayList<>();
		this.cursos = new ArrayList<>();
	}

	/* ==========================
	   RELACIONES
	   ========================== */

	public void agregarDesignacion(Designacion designacion) {
		if (designacion == null) {
			throw new IllegalArgumentException("La designación no puede ser null");
		}
		designacion.setEscuela(this);
		this.designaciones.add(designacion);
	}

	public void removerDesignacion(Designacion designacion) {
		if (designacion == null) {
			return;
		}
		this.designaciones.remove(designacion);
		designacion.setEscuela(null);
	}

	public void agregarEmpleado(EmpleadoEducativo empleado) {
		if (empleado == null) {
			throw new IllegalArgumentException("El empleado no puede ser null");
		}
		empleado.setEscuela(this);
		this.empleadosEducativos.add(empleado);
	}

	public void removerEmpleado(EmpleadoEducativo empleado) {
		if (empleado == null) {
			return;
		}
		this.empleadosEducativos.remove(empleado);
		empleado.setEscuela(null);
	}

	public void agregarMateria(Materia materia) {
		if (materia == null) {
			throw new IllegalArgumentException("La materia no puede ser null");
		}
		materia.setEscuela(this);
		this.materias.add(materia);
	}

	public void removerMateria(Materia materia) {
		if (materia == null) {
			return;
		}
		this.materias.remove(materia);
		materia.setEscuela(null);
	}

	public void agregarCurso(Curso curso) {
		if (curso == null) {
			throw new IllegalArgumentException("El curso no puede ser null");
		}
		curso.setEscuela(this);
		this.cursos.add(curso);
	}

	public void removerCurso(Curso curso) {
		if (curso == null) {
			return;
		}
		this.cursos.remove(curso);
		curso.setEscuela(null);
	}

	/* ==========================
	   ESTADO
	   ========================== */

	public boolean estaActiva() {
		return activa;
	}

	public void desactivar() {
		this.activa = false;
	}
}

