import { useQuery } from "@tanstack/react-query";
import type { DesignacionCursoFilter } from "@/shared/types";
import { designacionQueryKeys } from "../../constants";
import { designacionService } from "../../services/";

export function useDesignacionesCursos(
	escuelaId?: number,
	page: number = 0,
	size: number = 10,
	filter?: DesignacionCursoFilter,
) {
	const enabled = Boolean(escuelaId);

	const queryKey =
		escuelaId != null
			? designacionQueryKeys.curso.byEscuela(escuelaId, page, size, filter)
			: designacionQueryKeys.curso.lists();

	return useQuery({
		queryKey,

		queryFn: async () => {
			if (escuelaId == null) throw new Error("escuelaId es requerido");

			return designacionService.listarDesignacionesCursos(
				escuelaId,
				page,
				size,
				filter,
			);
		},

		enabled,

		placeholderData: (prev) => prev,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
}
