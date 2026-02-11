import { useQuery } from "@tanstack/react-query";
import type { LicenciaDetalleDTO } from "../types/licencia.types";
import { licenciasQueryKeys } from "../utils/licencias.queryKeys";
import { getLicenciaDetalle } from "../services/licencias.services";

export function useLicenciaDetalle(licenciaId?: number) {
	const query = useQuery<LicenciaDetalleDTO>({
		queryKey:
			licenciaId != null
				? licenciasQueryKeys.detail(licenciaId)
				: licenciasQueryKeys.all,

		queryFn: () => {
			if (licenciaId == null) {
				throw new Error("licenciaId requerido");
			}

			return getLicenciaDetalle(licenciaId);
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
