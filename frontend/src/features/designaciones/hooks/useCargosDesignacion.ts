import { useQuery } from "@tanstack/react-query";
import { listarCargosPorDesignacion } from "../services/designaciones.services";
import { designacionesQueryKeys } from "../utils/designaciones.queryKeys";
import type { EstadoCargo } from "../types/designacion.types";

export function useCargosDesignacion(
	designacionId?: number,
	estado?: EstadoCargo,
) {
	const query = useQuery({
		queryKey:
			designacionId != null
				? designacionesQueryKeys.cargos.list(designacionId, estado)
				: [],
		queryFn: () => {
			if (!designacionId) {
				throw new Error("designacionId requerido");
			}
			return listarCargosPorDesignacion(designacionId, estado);
		},
		enabled: !!designacionId,
	});

	return {
		cargos: query.data ?? [],
		isLoading: query.isPending,
		error: query.isError ? "No se pudieron cargar los cargos" : null,
		refetch: query.refetch,
	};
}
