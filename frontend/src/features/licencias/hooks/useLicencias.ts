import { useQuery } from "@tanstack/react-query";
import { getLicenciasPorEscuela } from "../services/licencias.services";
import { licenciasQueryKeys } from "../utils/licencias.queryKeys";

export function useLicencias(
	escuelaId?: number,
	page: number = 0,
	size: number = 10,
) {
	return useQuery({
		queryKey:
			escuelaId != null
				? licenciasQueryKeys.byEscuela(escuelaId, page, size)
				: ["licencias", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId requerido");

			return getLicenciasPorEscuela(escuelaId, page, size);
		},

		enabled: escuelaId != null,

		// reemplazo keepPreviousData (v5)
		placeholderData: (previousData) => previousData,

		staleTime: 1000 * 60,
	});
}
