package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.response.PageResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.function.Function;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PageMapper {

	public static <E, D> PageResponse<D> toPageResponse(
			Page<E> page,
			Function<E, D> mapper
	) {

		return new PageResponse<>(
				page.map(mapper).getContent(),
				page.getNumber(),
				page.getSize(),
				page.getTotalElements(),
				page.getTotalPages(),
				page.isFirst(),        // ← faltaba
				page.isLast(),         // ← faltaba
				page.hasNext(),
				page.hasPrevious(),
				page.getSort().toString()
		);
	}
}

