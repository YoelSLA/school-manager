package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

public interface RolCantidadProjection {
	RolEducativo getRol();

	Long getCantidad();
}