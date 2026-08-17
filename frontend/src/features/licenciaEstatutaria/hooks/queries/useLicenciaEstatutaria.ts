import { useQuery } from "@tanstack/react-query";
import { licenciaEstatutariaQueryKeys } from "../../constants";
import { licenciaEstatutariaService } from "../../services";

export function useLicenciaEstatutaria(id?: number) {
	const enabled = id !== undefined;

	return useQuery({
		queryKey: enabled
			? licenciaEstatutariaQueryKeys.detail(id)
			: licenciaEstatutariaQueryKeys.all,
		queryFn: () => {
			if (id === undefined) {
				throw new Error("El ID de la licencia estatutaria es requerido");
			}

			return licenciaEstatutariaService.getLicenciaEstatutaria(id);
		},
		enabled,
	});
}
