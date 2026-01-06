package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Entity
@Table(name = "franjas_horarias")
@Getter
@Setter
public class FranjaHoraria {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "designacion_id", nullable = false)
	private Designacion designacion;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private DiaDeSemana dia;

	@Column(nullable = false)
	private LocalTime horaDesde;

	@Column(nullable = false)
	private LocalTime horaHasta;

	protected FranjaHoraria() {
	}

	public FranjaHoraria(DiaDeSemana dia, LocalTime horaDesde, LocalTime horaHasta) {
		this.dia = dia;
		this.horaDesde = horaDesde;
		this.horaHasta = horaHasta;
	}

	public void desasociarDesignacion() {
		this.designacion = null;
	}


}
