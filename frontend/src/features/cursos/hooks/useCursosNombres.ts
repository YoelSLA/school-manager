import { useQuery } from "@tanstack/react-query";
import type { CursoResponseDTO } from "@/shared/utils/types";
import { obtenerNombresCursos } from "../../../services/curso.service";
import { cursosQueryKeys } from "../../../shared/utils/queryKeys/cursos.queryKeys";

export function useCursosNombres(escuelaId?: number) {
	const query = useQuery<CursoResponseDTO[]>({
		queryKey:
			escuelaId != null
				? cursosQueryKeys.nombres(escuelaId)
				: cursosQueryKeys.all,

		queryFn: () => {
			if (!escuelaId) {
				throw new Error("escuelaId es requerido para obtener cursos");
			}
			return obtenerNombresCursos(escuelaId);
		},

		enabled: !!escuelaId,
		staleTime: 5 * 60 * 1000,
	});

	return {
		cursos: query.data ?? [],
		isLoading: query.isPending,
		error: query.isError ? "No se pudieron cargar los cursos" : null,
		refetch: query.refetch,
	};
}
