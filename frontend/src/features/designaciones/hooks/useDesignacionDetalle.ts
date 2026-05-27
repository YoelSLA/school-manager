import type { DesignacionDetalleDTO } from "@/shared/utils/types";
import { useQuery } from "@tanstack/react-query";
import { designacionesQueryKeys } from "../../../shared/utils/queryKeys/designaciones.queryKeys";
import { obtenerDesignacionDetalle } from "../services/designaciones.services";

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
