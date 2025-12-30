package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.controllers.dtos.CupofCursoCreateDTO;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.cupof.Cupof;
import com.gestion.escuela.gestion_escolar.models.cupof.CupofAdministrativo;
import com.gestion.escuela.gestion_escolar.models.cupof.CupofCurso;

import java.util.List;

public interface CupofService {

  CupofAdministrativo crearAdministrativo(CupofAdministrativo cupofAdministrativo);

  CupofCurso crearCurso(CupofCurso cupofCurso);

  List<Cupof> obtenerPorCuil(String cuil);

  List<CupofAdministrativo> getAllAdministrativos(Escuela escuela);
}
