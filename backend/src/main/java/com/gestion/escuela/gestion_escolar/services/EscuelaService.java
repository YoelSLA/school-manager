package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Escuela;

import java.util.List;

public interface EscuelaService {

	Escuela crear(Escuela escuela);

	List<Escuela> listarTodas();

	Escuela obtenerPorId(Long escuelaId);

}

