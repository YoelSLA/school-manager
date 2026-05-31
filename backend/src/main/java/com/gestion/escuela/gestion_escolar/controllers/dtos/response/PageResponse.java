package com.gestion.escuela.gestion_escolar.controllers.dtos.response;

import java.util.List;

public record PageResponse<T>(
		List<T> content,
		int page,
		int size,
		long totalElements,
		int totalPages,
		boolean first,
		boolean last,
		boolean hasNext,
		boolean hasPrevious,
		String sort
) {
}
