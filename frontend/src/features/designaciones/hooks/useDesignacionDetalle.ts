import { useQuery } from "@tanstack/react-query";
import { obtenerDesignacionDetalle } from "../services/designaciones.services";
import type { DesignacionDetalleDTO } from "../types/designacion.types";
import { designacionesQueryKeys } from "../utils/designaciones.queryKeys";

export default function useDesignacionDetalle(designacionId?: number) {
	const query = useQuery<DesignacionDetalleDTO>({
		queryKey:
			designacionId != null
				? designacionesQueryKeys.detail(designacionId)
				: designacionesQueryKeys.all,

		queryFn: () => {
			if (designacionId == null) {
				throw new Error("designacionId is required");
			}
			return obtenerDesignacionDetalle(designacionId);
		},

		enabled: designacionId != null,
		retry: 1,
	});

	return {
		designacion: query.data ?? null,
		isLoading: query.isPending,
		error: query.isError ? "No se pudo cargar la designación" : null,
		refetch: query.refetch,
	};
}
