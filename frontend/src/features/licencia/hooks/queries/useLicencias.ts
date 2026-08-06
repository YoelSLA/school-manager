import { useQuery } from "@tanstack/react-query";
import { licenciaQueryKeys } from "../../constants";
import { licenciaService } from "../../services";

export function useLicencias(
	escuelaId?: number,
	page: number = 0,
	size: number = 10,
) {
	return useQuery({
		queryKey:
			escuelaId != null
				? licenciaQueryKeys.byEscuela(escuelaId, page, size)
				: ["licencias", "disabled"],

		queryFn: () => {
			if (escuelaId == null) throw new Error("escuelaId requerido");

			return licenciaService.getLicenciasPorEscuela(escuelaId, page, size);
		},

		enabled: escuelaId != null,

		// reemplazo keepPreviousData (v5)
		placeholderData: (previousData) => previousData,

		staleTime: 1000 * 60,
	});
}
