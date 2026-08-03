import { useQuery } from "@tanstack/react-query";
import { designacionQueryKeys } from "../../constants";
import { designacionService } from "../../services/";

export function useDesignacionesAdministrativas(
	escuelaId?: number,
	page: number = 0,
	size: number = 10,
) {
	const enabled = Boolean(escuelaId);

	const queryKey =
		escuelaId != null
			? designacionQueryKeys.administrativa.byEscuela(escuelaId, page, size)
			: designacionQueryKeys.administrativa.lists();

	return useQuery({
		queryKey,

		queryFn: async () => {
			if (escuelaId == null) throw new Error("escuelaId es requerido");

			return designacionService.listarDesignacionesAdministrativas(
				escuelaId,
				page,
				size,
			);
		},

		enabled,

		placeholderData: (prev) => prev,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
}
