package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.BajaAsignacion;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmpleadoEducativoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.FechasAsignacionObligatoriasException;
import com.gestion.escuela.gestion_escolar.models.exceptions.PeriodoAsignacionInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.SituacionDeRevistaObligatoriaException;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import static jakarta.persistence.CascadeType.ALL;

@Entity
@Table(name = "asignacion")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "tipo_asignacion")
@Getter
public abstract class Asignacion {

	@OneToMany(mappedBy = "asignacion", cascade = ALL, orphanRemoval = true)
	private final Set<Licencia> licencias = new HashSet<>();

	@ManyToOne(optional = false)
	@JoinColumn(name = "empleado_id")
	private EmpleadoEducativo empleadoEducativo;

	@ManyToOne(optional = false)
	@JoinColumn(name = "designacion_id")
	private Designacion designacion;

	@Embedded
	private BajaAsignacion bajaAsignacion;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private LocalDate fechaTomaPosesion;

	@Column(nullable = false)
	private LocalDate fechaCese;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private SituacionDeRevista situacionDeRevista;

	protected Asignacion() {
	}

	public Asignacion(Designacion designacion, EmpleadoEducativo empleadoEducativo, LocalDate fechaTomaPosesion, LocalDate fechaCese, SituacionDeRevista situacionDeRevista
	) {
		validarCreacion(empleadoEducativo, fechaTomaPosesion, fechaCese, situacionDeRevista);

		this.designacion = designacion;
		this.empleadoEducativo = empleadoEducativo;
		this.fechaTomaPosesion = fechaTomaPosesion;
		this.fechaCese = fechaCese;
		this.situacionDeRevista = situacionDeRevista;
		this.bajaAsignacion = null;

	}

	public Licencia solicitarLicencia(
			LocalDate fechaDesde,
			LocalDate fechaHasta,
			TipoLicencia tipoLicencia,
			String descripcion
	) {
		validarOperativa();

		if (fechaDesde == null || fechaHasta == null) {
			throw new IllegalArgumentException("Las fechas de la licencia son obligatorias");
		}

		if (fechaHasta.isBefore(fechaDesde)) {
			throw new IllegalArgumentException(
					"La fecha hasta no puede ser anterior a la fecha desde"
			);
		}

		boolean seSuperpone = licencias.stream().anyMatch(l -> l.seSuperponeCon(fechaDesde, fechaHasta));

		if (seSuperpone) {
			throw new IllegalStateException(
					"Ya existe una licencia que se superpone en ese período"
			);
		}

		Licencia licencia = new Licencia(this, tipoLicencia, fechaDesde, fechaHasta, descripcion);

		licencias.add(licencia);
		return licencia;
	}

	public void registrarBaja(CausaBaja causa) {
		if (causa == null) {
			throw new IllegalArgumentException("La causa de baja es obligatoria");
		}

		if (this.bajaAsignacion != null) {
			throw new IllegalStateException("La asignación ya fue dada de baja");
		}

		this.bajaAsignacion = new BajaAsignacion(LocalDate.now(), causa);
	}

	public void setDesignacion(Designacion designacion) {
		this.designacion = designacion;
	}

	private void validarOperativa() {
		if (bajaAsignacion != null) {
			throw new IllegalStateException("La asignación está dada de baja");
		}
	}

	private void validarCreacion(
			EmpleadoEducativo empleado,
			LocalDate fechaTomaPosesion,
			LocalDate fechaCese,
			SituacionDeRevista situacionDeRevista
	) {
		if (empleado == null) {
			throw new EmpleadoEducativoObligatorioException();
		}
		if (situacionDeRevista == null) {
			throw new SituacionDeRevistaObligatoriaException();
		}
		if (fechaTomaPosesion == null || fechaCese == null) {
			throw new FechasAsignacionObligatoriasException();
		}
		if (fechaCese.isBefore(fechaTomaPosesion)) {
			throw new PeriodoAsignacionInvalidoException();
		}
	}

	public boolean estaVigenteEn(LocalDate fecha) {
		return fecha != null && bajaAsignacion == null && !fecha.isBefore(fechaTomaPosesion) && !fecha.isAfter(fechaCese);
	}

	public boolean ejerceCargoEn(LocalDate fecha) {
		return estaVigenteEn(fecha) && !estaEnLicenciaEn(fecha);
	}

	public boolean estaEnLicenciaEn(LocalDate fecha) {
		return licencias.stream().anyMatch(l -> l.estaVigenteEnFecha(fecha));
	}

}
