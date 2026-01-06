package com.gestion.escuela.gestion_escolar.services.validators;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.exceptions.CupofDuplicadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.HorariosInvalidosException;
import com.gestion.escuela.gestion_escolar.persistence.DesignacionAdministrativoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CupofAdministrativoRules {

	private final DesignacionAdministrativoRepository designacionAdministrativoRepository;

	public void validarHorarios(List<FranjaHoraria> horarios) {

		if (horarios == null || horarios.isEmpty()) {
			throw new HorariosInvalidosException(
					"La designación debe tener al menos una franja horaria"
			);
		}

		validarRangosIndividuales(horarios);
		validarDuplicadasOSolapadas(horarios);
	}

	private void validarRangosIndividuales(List<FranjaHoraria> horarios) {

		for (FranjaHoraria h : horarios) {
			if (!h.getHoraDesde().isBefore(h.getHoraHasta())) {
				throw new HorariosInvalidosException(
						"La hora desde debe ser menor que la hora hasta"
				);
			}
		}
	}

	private void validarDuplicadasOSolapadas(List<FranjaHoraria> horarios) {

		Map<DiaDeSemana, List<FranjaHoraria>> porDia =
				horarios.stream()
						.collect(Collectors.groupingBy(FranjaHoraria::getDia));

		for (Map.Entry<DiaDeSemana, List<FranjaHoraria>> entry : porDia.entrySet()) {

			DiaDeSemana dia = entry.getKey();
			List<FranjaHoraria> franjas = entry.getValue();

			for (int i = 0; i < franjas.size(); i++) {
				FranjaHoraria a = franjas.get(i);

				for (int j = i + 1; j < franjas.size(); j++) {
					FranjaHoraria b = franjas.get(j);

					if (sonDuplicadas(a, b)) {
						throw new HorariosInvalidosException(
								"No se permiten franjas horarias duplicadas el día " + dia
						);
					}

					if (seSolapan(a, b)) {
						throw new HorariosInvalidosException(
								"Las franjas horarias se solapan el día " + dia
						);
					}
				}
			}
		}
	}

	private boolean sonDuplicadas(FranjaHoraria a, FranjaHoraria b) {
		return a.getHoraDesde().equals(b.getHoraDesde())
				&& a.getHoraHasta().equals(b.getHoraHasta());
	}

	private boolean seSolapan(FranjaHoraria a, FranjaHoraria b) {
		return a.getHoraDesde().isBefore(b.getHoraHasta())
				&& b.getHoraDesde().isBefore(a.getHoraHasta());
	}

	public void validarCupof(Escuela escuela, Integer cupof) {

		if (designacionAdministrativoRepository
				.existsByEscuela_IdAndCupof(escuela.getId(), cupof)) {

			throw new CupofDuplicadoException(cupof);
		}
	}

}
