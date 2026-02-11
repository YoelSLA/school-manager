import { useQuery } from "@tanstack/react-query";
import { listarDesignacionesAdministrativas } from "../services/designaciones.services";
import { designacionesQueryKeys } from "../utils/designaciones.queryKeys";

export function useDesignacionesAdministrativas(escuelaId?: number) {
	return useQuery({
		queryKey: designacionesQueryKeys.administrativa.byEscuela(escuelaId!),

		queryFn: () => listarDesignacionesAdministrativas(escuelaId!),

		enabled: escuelaId != null,
		staleTime: 0,
	});
}
