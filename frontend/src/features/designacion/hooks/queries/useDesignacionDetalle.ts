import { useQuery } from "@tanstack/react-query";
import { designacionQueryKeys } from "../../constants";
import { designacionService } from "../../services/";
import type { DesignacionDetalleDTO } from "../../types";

export default function useDesignacionDetalle(designacionId?: number) {
	const query = useQuery<DesignacionDetalleDTO>({
		queryKey:
			designacionId != null
				? designacionQueryKeys.detail(designacionId)
				: designacionQueryKeys.all,

		queryFn: () => {
			if (designacionId == null) {
				throw new Error("designacionId is required");
			}
			return designacionService.obtenerDesignacionDetalle(designacionId);
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
