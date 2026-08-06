import { useQuery } from "@tanstack/react-query";
import { cursoQueryKeys } from "../../constants";
import { cursoService } from "../../services";
import type { CursoSelectDTO } from "../../types";

export function useListarCursosSelect(escuelaId?: number) {
	return useQuery<CursoSelectDTO[]>({
		queryKey:
			escuelaId != null
				? cursoQueryKeys.select(escuelaId)
				: ["cursos", "select", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId requerido");

			return cursoService.listCursosSelect(escuelaId);
		},

		enabled: escuelaId != null,
	});
}
