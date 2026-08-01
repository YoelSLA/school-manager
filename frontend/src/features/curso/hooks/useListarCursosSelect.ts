import { useQuery } from "@tanstack/react-query";
import { listarCursosSelect } from "@/features/cursos/services/curso.service";
import type { CursoSelectDTO } from "@/features/cursos/types/curso.types";
import { cursosQueryKeys } from "@/shared/utils/queryKeys/cursos.queryKeys";

export function useListarCursosSelect(escuelaId?: number) {
	return useQuery<CursoSelectDTO[]>({
		queryKey:
			escuelaId != null
				? cursosQueryKeys.select(escuelaId)
				: ["cursos", "select", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId requerido");

			return listarCursosSelect(escuelaId);
		},

		enabled: escuelaId != null,
	});
}
