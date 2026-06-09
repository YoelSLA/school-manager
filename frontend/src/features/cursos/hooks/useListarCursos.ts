import { useQuery } from "@tanstack/react-query";
import { listarCursos } from "@/services/curso.service";
import type {
	CursoDetalleDTO,
	CursoFiltro,
	PageResponse,
} from "@/shared/types";
import { cursosQueryKeys } from "../../../shared/utils/queryKeys/cursos.queryKeys";

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
				? cursosQueryKeys.byEscuelaYTurno(escuelaId, turno, page, size)
				: ["cursos", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId requerido");

			return listarCursos(escuelaId, turno, page, size);
		},

		enabled: escuelaId != null,
		placeholderData: (previousData) => previousData,
	});
}
