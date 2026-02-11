package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

public record RolCantidad(
		RolEducativo rol,
		int cantidad
) {
}