import { useQuery } from "@tanstack/react-query";
import { obtenerCursos } from "../services/cursos.services";
import type { CursoFiltro } from "../types/cursos.types";
import { cursosQueryKeys } from "../utils/cursos.queryKeys";

export function useCursos(escuelaId?: number, filtro: CursoFiltro = "TODOS") {
	const turno = filtro === "TODOS" ? undefined : filtro;

	return useQuery({
		queryKey:
			escuelaId != null
				? cursosQueryKeys.byEscuelaYTurno(escuelaId, turno)
				: cursosQueryKeys.all,

		queryFn: () => obtenerCursos(escuelaId!, turno),

		enabled: !!escuelaId,
	});
}
