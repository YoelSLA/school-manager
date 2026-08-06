import { useQuery } from "@tanstack/react-query";
import type { EstadoCargo } from "@/features/asignacion";
import { designacionQueryKeys } from "../../constants";
import { designacionService } from "../../services";

export function useCargosDesignacion(
	designacionId?: number,
	estado?: EstadoCargo,
) {
	const query = useQuery({
		queryKey:
			designacionId != null
				? designacionQueryKeys.cargos.list(designacionId, estado)
				: [],
		queryFn: () => {
			if (!designacionId) {
				throw new Error("designacionId requerido");
			}
			return designacionService.listarCargosPorDesignacion(
				designacionId,
				estado,
			);
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
