package com.gestion.escuela.gestion_escolar.web;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public final class PaginationUtils {

	private static final int MAX_PAGE_SIZE = 20;

	private PaginationUtils() {
	}

	public static Pageable limit(Pageable pageable) {
		int pageSize = Math.min(pageable.getPageSize(), MAX_PAGE_SIZE);

		return PageRequest.of(
				pageable.getPageNumber(),
				pageSize,
				pageable.getSort()
		);
	}
}