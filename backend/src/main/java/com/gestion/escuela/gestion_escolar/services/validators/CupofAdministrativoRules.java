package com.gestion.escuela.gestion_escolar.services.validators;

import com.gestion.escuela.gestion_escolar.controllers.dtos.FranjaHorariaDTO;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.persistence.CupofAdministrativoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CupofAdministrativoRules {

  private final CupofAdministrativoRepository cupofAdministrativoRepository;

  public void validarHorarios(List<FranjaHoraria> horarios) {
    for (FranjaHoraria h : horarios) {
      if (!h.getHoraDesde().isBefore(h.getHoraHasta())) {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "La hora desde debe ser menor que la hora hasta"
        );
      }
    }
  }

  public void validarNumeroCupof(Escuela escuela, Long numeroCupof) {
    if (cupofAdministrativoRepository
            .existsByEscuela_IdAndNumeroCupof(escuela.getId(), numeroCupof)) {

      throw new ResponseStatusException(
              HttpStatus.CONFLICT,
              "Ya existe un cupof con ese número en la escuela seleccionada"
      );
    }
  }

}
