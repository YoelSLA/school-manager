import { useQuery } from "@tanstack/react-query";
import { obtenerCargoActivo } from "../services/designaciones.services";
import { designacionesQueryKeys } from "../utils/designaciones.queryKeys";

export function useCargoActivo(designacionId?: number) {
	const query = useQuery({
		queryKey:
			designacionId != null
				? designacionesQueryKeys.cargos.activo(designacionId)
				: [],
		queryFn: () => {
			if (!designacionId) {
				throw new Error("designacionId requerido");
			}
			return obtenerCargoActivo(designacionId);
		},
		enabled: !!designacionId,
		retry: false,
	});

	return {
		cargoActivo: query.data ?? null,
		isLoading: query.isPending,
		error: query.isError ? "No se pudo cargar el cargo activo" : null,
		refetch: query.refetch,
	};
}
