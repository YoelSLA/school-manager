package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.controllers.dtos.CupofAdministrativoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.CupofCursoCreateDTO;
import com.gestion.escuela.gestion_escolar.mappers.FranjaHorariaMapper;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.cupof.Cupof;
import com.gestion.escuela.gestion_escolar.models.cupof.CupofAdministrativo;
import com.gestion.escuela.gestion_escolar.models.cupof.CupofCurso;
import com.gestion.escuela.gestion_escolar.persistence.CupofAdministrativoRepository;
import com.gestion.escuela.gestion_escolar.persistence.CupofRepository;
import com.gestion.escuela.gestion_escolar.services.CupofService;
import com.gestion.escuela.gestion_escolar.services.validators.CupofAdministrativoRules;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CupofServiceImpl implements CupofService {

  private final CupofRepository cupofRepository;
  private final CupofAdministrativoRules rules;

  @Override
  public CupofAdministrativo crearAdministrativo(CupofAdministrativo cupofAdministrativo) {

    Escuela escuela = cupofAdministrativo.getEscuela();

    rules.validarNumeroCupof(escuela, cupofAdministrativo.getNumeroCupof());
    rules.validarHorarios(cupofAdministrativo.getFranjasHorarias());

    System.out.println("HOLA DESDE EL SERVICIO");

    return cupofRepository.save(cupofAdministrativo);
  }

  @Override
  public CupofCurso crearCurso(CupofCurso cupofCurso) {
    return null;
  }


  @Override
  public List<CupofAdministrativo> getAllAdministrativos(Escuela escuela) {
    return null;
  }



  public List<Cupof> obtenerPorCuil(String cuil) {
    return null;
  }
}

