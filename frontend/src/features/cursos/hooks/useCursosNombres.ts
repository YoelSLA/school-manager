import type { CursoNombreDTO } from "@/shared/utils/types";
import { useQuery } from "@tanstack/react-query";
import { cursosQueryKeys } from "../../../shared/utils/queryKeys/cursos.queryKeys";
import { obtenerNombresCursos } from "../services/cursos.services";

export function useCursosNombres(escuelaId?: number) {
	const query = useQuery<CursoNombreDTO[]>({
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
		staleTime: 5 * 60 * 1000, // 🧠 casi no cambian
	});

	return {
		cursos: query.data ?? [],
		isLoading: query.isPending,
		error: query.isError ? "No se pudieron cargar los cursos" : null,
		refetch: query.refetch,
	};
}
