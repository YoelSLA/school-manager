import { useQuery } from "@tanstack/react-query";
import { obtenerMateriasNombres } from "../services/materias.services";
import { MateriaNombreDTO } from "@/utils/types";
import { materiasQueryKeys } from "@/utils/queryKeys/materias.queryKeys";

export function useMateriasSelect(escuelaId?: number) {
	const query = useQuery<MateriaNombreDTO[]>({
		queryKey: materiasQueryKeys.selectByEscuela(escuelaId ?? 0),

		queryFn: async () => {
			if (!escuelaId) {
				throw new Error("escuelaId es requerido");
			}

			const data = await obtenerMateriasNombres(escuelaId);

			return data;
		},

		enabled: !!escuelaId,

		// cache
		staleTime: 1000 * 60 * 10,
		gcTime: 1000 * 60 * 30,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});

	return {
		materias: query.data ?? [],
		isLoading: query.isPending,
		error: query.isError ? "No se pudieron cargar las materias" : null,
		refetch: query.refetch,
	};
}
