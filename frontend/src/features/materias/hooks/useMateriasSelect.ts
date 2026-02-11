import { useQuery } from "@tanstack/react-query";
import { obtenerMateriasNombres } from "../services/materias.services";
import type { MateriaNombreDTO } from "../types/materias.types";
import { materiasQueryKeys } from "../types/materias.queryKeys";

export function useMateriasSelect(escuelaId?: number) {
	const query = useQuery<MateriaNombreDTO[]>({
		queryKey:
			escuelaId != null
				? materiasQueryKeys.selectByEscuela(escuelaId)
				: materiasQueryKeys.selects(),

		queryFn: () => {
			if (!escuelaId) {
				throw new Error("escuelaId es requerido para obtener materias");
			}
			return obtenerMateriasNombres(escuelaId);
		},

		enabled: !!escuelaId,
		staleTime: 1000 * 60 * 5,
	});

	return {
		materias: query.data ?? [],
		isLoading: query.isPending,
		error: query.isError ? "No se pudieron cargar las materias" : null,
		refetch: query.refetch,
	};
}
