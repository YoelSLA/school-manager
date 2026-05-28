import { useQuery } from "@tanstack/react-query";
import { designacionesQueryKeys } from "@/shared/utils/queryKeys/designaciones.queryKeys";
import type { DesignacionCursoFilter } from "@/shared/utils/types";
import { listarDesignacionesCursos } from "../designaciones.services";

export function useDesignacionesCursos(
	escuelaId?: number,
	page: number = 0,
	size: number = 10,
	filter?: DesignacionCursoFilter,
) {
	const enabled = Boolean(escuelaId);

	const queryKey =
		escuelaId != null
			? designacionesQueryKeys.curso.byEscuela(escuelaId, page, size, filter)
			: designacionesQueryKeys.curso.lists();

	return useQuery({
		queryKey,

		queryFn: async () => {
			if (escuelaId == null) throw new Error("escuelaId es requerido");

			return listarDesignacionesCursos(escuelaId, page, size, filter);
		},

		enabled,

		placeholderData: (prev) => prev,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
}
