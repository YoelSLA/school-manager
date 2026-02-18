import { useQuery } from "@tanstack/react-query";
import { obtenerCursos } from "../services/cursos.services";
import type { CursoFiltro } from "../types/cursos.types";
import type { CursoResponseDTO } from "../types/cursos.types";
import { cursosQueryKeys } from "../utils/cursos.queryKeys";
import type { PageResponse } from "@/utils/types";

export function useCursos(
	escuelaId?: number,
	filtro: CursoFiltro = "TODOS",
	page: number = 0,
	size: number = 10,
) {
	const turno = filtro === "TODOS" ? undefined : filtro;

	return useQuery<PageResponse<CursoResponseDTO>>({
		queryKey:
			escuelaId != null
				? cursosQueryKeys.byEscuelaYTurno(escuelaId, turno, page, size)
				: ["cursos", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId requerido");

			return obtenerCursos(escuelaId, turno, page, size);
		},

		enabled: escuelaId != null,

		// reemplazo keepPreviousData (v5)
		placeholderData: (previousData) => previousData,
	});
}
