import { useQuery } from "@tanstack/react-query";
import { listMateriasSelect } from "@/services/materia.service";
import type { MateriaSelectDTO } from "@/shared/types";
import { materiasQueryKeys } from "@/shared/utils/queryKeys/materias.queryKeys";

export function useListMateriasSelect(escuelaId?: number) {
	return useQuery<MateriaSelectDTO[]>({
		queryKey:
			escuelaId != null
				? materiasQueryKeys.select(escuelaId)
				: ["materias", "select", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId requerido");

			return listMateriasSelect(escuelaId);
		},

		enabled: escuelaId != null,
	});
}
