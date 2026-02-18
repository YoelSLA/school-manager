import { useQuery } from "@tanstack/react-query";
import { listarDesignacionesCursos } from "../services/designaciones.services";
import { designacionesQueryKeys } from "../utils/designaciones.queryKeys";

export function useDesignacionesCursos(
	escuelaId?: number,
	page: number = 0,
	size: number = 10,
) {
	return useQuery({
		queryKey:
			escuelaId != null
				? designacionesQueryKeys.curso.byEscuela(escuelaId, page, size)
				: ["designaciones", "curso", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId es requerido");

			return listarDesignacionesCursos(escuelaId, page, size);
		},

		enabled: escuelaId != null,

		// 🔥 reemplazo de keepPreviousData
		placeholderData: (previousData) => previousData,

		staleTime: 0,
	});
}
