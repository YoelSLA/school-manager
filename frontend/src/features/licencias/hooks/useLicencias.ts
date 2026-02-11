import { useQuery } from "@tanstack/react-query";
import { getLicenciasPorEscuela } from "../services/licencias.services";
import { licenciasQueryKeys } from "../utils/licencias.queryKeys";

export function useLicencias(escuelaId?: number) {
	return useQuery({
		queryKey: escuelaId
			? licenciasQueryKeys.byEscuela(escuelaId)
			: licenciasQueryKeys.all, // fallback seguro

		queryFn: () => getLicenciasPorEscuela(escuelaId!),

		enabled: !!escuelaId,
		staleTime: 1000 * 60, // 1 minuto
	});
}
