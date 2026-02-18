import { useQuery } from "@tanstack/react-query";
import { listarDesignacionesAdministrativas } from "../services/designaciones.services";
import { designacionesQueryKeys } from "../utils/designaciones.queryKeys";

export function useDesignacionesAdministrativas(
	escuelaId?: number,
	page: number = 0,
	size: number = 10,
) {
	return useQuery({
		queryKey:
			escuelaId != null
				? designacionesQueryKeys.administrativa.byEscuela(escuelaId, page, size)
				: ["designaciones", "administrativa", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId es requerido");

			return listarDesignacionesAdministrativas(escuelaId, page, size);
		},

		enabled: escuelaId != null,

		placeholderData: (previousData) => previousData,

		staleTime: 0,
	});
}
