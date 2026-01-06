package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;

import java.util.List;

public interface EmpleadoEducativoService {

	EmpleadoEducativo crear(EmpleadoEducativo empleado);

	EmpleadoEducativo obtenerPorId(Long id);

	List<EmpleadoEducativo> buscarPorEscuela(Long escuelaId, String search);


}