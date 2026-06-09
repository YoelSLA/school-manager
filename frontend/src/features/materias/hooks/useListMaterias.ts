import { useQuery } from "@tanstack/react-query";
import { listMaterias } from "@/services/materia.service";
import type { MateriaDetalleDTO, PageResponse } from "@/shared/types";
import { materiasQueryKeys } from "@/shared/utils/queryKeys/materias.queryKeys";

export function useListMaterias(
	escuelaId?: number,
	page: number = 0,
	size: number = 10,
) {
	return useQuery<PageResponse<MateriaDetalleDTO>>({
		queryKey:
			escuelaId != null
				? materiasQueryKeys.byEscuela(escuelaId, page, size)
				: ["materias", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId requerido");

			return listMaterias(escuelaId, page, size);
		},

		enabled: escuelaId != null,

		placeholderData: (previousData) => previousData,
	});
}
