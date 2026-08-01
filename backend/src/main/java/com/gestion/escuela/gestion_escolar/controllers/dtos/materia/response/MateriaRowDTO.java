package com.gestion.escuela.gestion_escolar.controllers.dtos.materia.response;

public record MateriaRowDTO(
		Long id, String nombre, String abreviatura, Integer cantidadModulos) {}

