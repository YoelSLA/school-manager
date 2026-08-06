import { useQuery } from "@tanstack/react-query";
import type { PageResponse } from "@/shared/types";
import { cursoQueryKeys } from "../../constants";
import { cursoService } from "../../services";
import type { CursoDetalleDTO, CursoFiltro } from "../../types";

export function useListarCursos(
	escuelaId?: number,
	filtro: CursoFiltro = "TODOS",
	page: number = 0,
	size: number = 10,
) {
	const turno = filtro === "TODOS" ? undefined : filtro;

	return useQuery<PageResponse<CursoDetalleDTO>>({
		queryKey:
			escuelaId != null
				? cursoQueryKeys.byEscuelaYTurno(escuelaId, turno, page, size)
				: ["cursos", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId requerido");

			return cursoService.listCursos(escuelaId, turno, page, size);
		},

		enabled: escuelaId != null,
		placeholderData: (previousData) => previousData,
	});
}
