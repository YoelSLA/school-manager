import { useQuery } from "@tanstack/react-query";
import { obtenerMaterias } from "../services/materias.services";
import { materiasQueryKeys } from "../types/materias.queryKeys";

export function useMaterias(escuelaId?: number) {
	return useQuery({
		queryKey:
			escuelaId != null
				? materiasQueryKeys.byEscuela(escuelaId)
				: materiasQueryKeys.lists(),

		queryFn: () => obtenerMaterias(escuelaId!),

		enabled: !!escuelaId,
	});
}
