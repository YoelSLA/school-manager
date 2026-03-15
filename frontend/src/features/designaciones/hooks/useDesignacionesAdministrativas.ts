import { useQuery } from "@tanstack/react-query";
import { listarDesignacionesAdministrativas } from "../services/designaciones.services";
import { designacionesQueryKeys } from "../../../utils/queryKeys/designaciones.queryKeys";

type Options = {
	enabled?: boolean;
};

export function useDesignacionesAdministrativas(
	escuelaId?: number,
	page: number = 0,
	size: number = 10,
	options?: Options,
) {
	const enabled = escuelaId != null && (options?.enabled ?? true);

	return useQuery({
		queryKey:
			escuelaId != null
				? designacionesQueryKeys.administrativa.byEscuela(escuelaId, page, size)
				: designacionesQueryKeys.administrativa.lists(),

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId es requerido");

			return listarDesignacionesAdministrativas(escuelaId, page, size);
		},

		enabled,

		placeholderData: (previousData) => previousData,

		staleTime: 0,
	});
}
