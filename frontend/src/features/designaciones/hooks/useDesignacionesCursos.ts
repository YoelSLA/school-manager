import { useQuery } from "@tanstack/react-query";
import { listarDesignacionesCursos } from "../services/designaciones.services";
import { designacionesQueryKeys } from "../utils/designaciones.queryKeys";

export function useDesignacionesCursos(escuelaId?: number) {
	return useQuery({
		queryKey: designacionesQueryKeys.curso.byEscuela(escuelaId!),

		queryFn: () => listarDesignacionesCursos(escuelaId!),

		enabled: escuelaId != null,
		staleTime: 0,
	});
}