package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
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
		validar(dia, horaDesde, horaHasta);

		this.dia = dia;
		this.horaDesde = horaDesde;
		this.horaHasta = horaHasta;
	}

	private void validar(DiaDeSemana dia, LocalTime horaDesde, LocalTime horaHasta) {
		if (dia == null) {
			throw new CampoObligatorioException("día");
		}
		if (horaDesde == null || horaHasta == null) {
			throw new CampoObligatorioException("horas desde y hasta");
		}
		if (!horaDesde.isBefore(horaHasta)) {
			throw new CampoObligatorioException(
					"hora desde debe ser anterior a la hora hasta"
			);
		}
	}
}
