import { useQuery } from "@tanstack/react-query";
import { obtenerMaterias } from "../services/materias.services";
import { materiasQueryKeys } from "../types/materias.queryKeys";
import type { MateriaResponseDTO } from "../types/materias.types";
import type { PageResponse } from "@/utils/types";

export function useMaterias(
	escuelaId?: number,
	page: number = 0,
	size: number = 10,
) {
	return useQuery<PageResponse<MateriaResponseDTO>>({
		queryKey:
			escuelaId != null
				? materiasQueryKeys.byEscuela(escuelaId, page, size)
				: ["materias", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId requerido");

			return obtenerMaterias(escuelaId, page, size);
		},

		enabled: escuelaId != null,

		placeholderData: (previousData) => previousData,
	});
}
