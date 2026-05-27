import { licenciasQueryKeys } from "@/shared/utils/queryKeys/licencias.queryKeys";
import type { LicenciaDetalleDTO } from "@/shared/utils/types";
import { useQuery } from "@tanstack/react-query";
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
