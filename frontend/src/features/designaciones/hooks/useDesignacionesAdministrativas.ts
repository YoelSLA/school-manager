import { useQuery } from "@tanstack/react-query";
import { designacionesQueryKeys } from "../../../shared/utils/queryKeys/designaciones.queryKeys";
import { listarDesignacionesAdministrativas } from "../services/designaciones.services";

export function useDesignacionesAdministrativas(
	escuelaId?: number,
	page: number = 0,
	size: number = 10,
) {
	const enabled = Boolean(escuelaId);

	const queryKey =
		escuelaId != null
			? designacionesQueryKeys.administrativa.byEscuela(escuelaId, page, size)
			: designacionesQueryKeys.administrativa.lists();

	return useQuery({
		queryKey,

		queryFn: async () => {
			if (escuelaId == null) throw new Error("escuelaId es requerido");

			return listarDesignacionesAdministrativas(escuelaId, page, size);
		},

		enabled,

		placeholderData: (prev) => prev,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
}
