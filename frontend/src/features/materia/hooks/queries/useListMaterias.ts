import { useQuery } from "@tanstack/react-query";
import type { PageResponse } from "@/shared/types";
import { materiaQueryKeys } from "../../constants";
import { materiaService } from "../../services";
import type { MateriaDetalleDTO } from "../../types";

export function useListMaterias(
	escuelaId?: number,
	page: number = 0,
	size: number = 10,
) {
	return useQuery<PageResponse<MateriaDetalleDTO>>({
		queryKey:
			escuelaId != null
				? materiaQueryKeys.byEscuela(escuelaId, page, size)
				: ["materias", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId requerido");

			return materiaService.listMaterias(escuelaId, page, size);
		},

		enabled: escuelaId != null,

		placeholderData: (previousData) => previousData,
	});
}
