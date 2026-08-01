import { useQuery } from "@tanstack/react-query";
import { materiaQueryKeys } from "../../constants";
import { materiaService } from "../../services";
import type { MateriaSelectDTO } from "../../types";

export function useListMateriasSelect(escuelaId?: number) {
	return useQuery<MateriaSelectDTO[]>({
		queryKey:
			escuelaId != null
				? materiaQueryKeys.select(escuelaId)
				: ["materias", "select", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId requerido");

			return materiaService.listMateriasSelect(escuelaId);
		},

		enabled: escuelaId != null,
	});
}
