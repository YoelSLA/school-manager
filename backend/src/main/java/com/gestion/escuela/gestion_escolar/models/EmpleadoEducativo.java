package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.exceptions.EscuelaObligatoriaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.FechaIngresoInvalidaException;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(
		name = "empleados_educativos",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = {"cuil", "escuela_id"}),
				@UniqueConstraint(columnNames = {"email", "escuela_id"})
		}
)
@Getter
@Setter
public class EmpleadoEducativo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "escuela_id")
	private Escuela escuela;

	@Column(nullable = false)
	private String cuil;

	@Column(nullable = false)
	private String nombre;

	@Column(nullable = false)
	private String apellido;

	private String domicilio;

	private String telefono;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private boolean activo = true;

	@Column(nullable = false)
	private LocalDate fechaDeNacimiento;

	@Column(nullable = false)
	private LocalDate fechaDeIngreso;

	@OneToMany(mappedBy = "empleadoEducativo")
	private Set<Asignacion> asignaciones;

	protected EmpleadoEducativo() {
		this.asignaciones = new HashSet<>();
	}

	public EmpleadoEducativo(Escuela escuela, String cuil, String nombre, String apellido, String domicilio, String telefono, LocalDate fechaDeNacimiento, LocalDate fechaDeIngreso, String email) {

		if (escuela == null) {
			throw new EscuelaObligatoriaException();
		}

		if (fechaDeIngreso.isBefore(fechaDeNacimiento)) {
			throw new FechaIngresoInvalidaException(fechaDeNacimiento, fechaDeIngreso);
		}

		this.escuela = escuela;
		this.cuil = cuil;
		this.nombre = nombre;
		this.apellido = apellido;
		this.domicilio = domicilio;
		this.telefono = telefono;
		this.email = email;
		this.fechaDeNacimiento = fechaDeNacimiento;
		this.fechaDeIngreso = fechaDeIngreso;
		this.asignaciones = new HashSet<>();
	}

	public boolean estaActivo() {
		return activo;
	}

	public void agregarAsignacion(Asignacion asignacion) {
		this.asignaciones.add(asignacion);
	}


}

