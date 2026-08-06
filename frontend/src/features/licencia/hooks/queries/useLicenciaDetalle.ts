import { useQuery } from "@tanstack/react-query";
import { licenciaQueryKeys } from "../../constants";
import { licenciaService } from "../../services";
import type { LicenciaDetalleDTO } from "../../types";


export function useLicenciaDetalle(licenciaId?: number) {
	const query = useQuery<LicenciaDetalleDTO>({
		queryKey:
			licenciaId != null
				? licenciaQueryKeys.detail(licenciaId)
				: licenciaQueryKeys.all,

		queryFn: () => {
			if (licenciaId == null) {
				throw new Error("licenciaId requerido");
			}

			return licenciaService.getLicenciaDetalle(licenciaId);
		},

		enabled: licenciaId != null,
		retry: 1,
	});

	return {
		licencia: query.data ?? null,
		isLoading: query.isPending,
		isError: query.isError ? "No se pudo cargar la licencia" : null,
	};
}
