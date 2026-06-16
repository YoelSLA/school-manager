package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EstadoDesignacionService {

	public void recalcular(Designacion designacion) {

//		boolean cubierta =
//				designacion.getAsignaciones()
//						.stream()
//						.anyMatch(Asignacion::estaActiva);
//
//		designacion.setEstadoActual(
//				EstadoDesignacion.desdeCobertura(cubierta));
	}
}