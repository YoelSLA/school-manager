import { useQuery } from "@tanstack/react-query";
import { licenciasQueryKeys } from "@/shared/utils/queryKeys/licencias.queryKeys";
import { getLicenciaTimeline } from "../../../services/licencia.service";

export const useLicenciaTimeline = (licenciaId?: number) => {
	return useQuery({
		queryKey: licenciaId ? licenciasQueryKeys.timeline(licenciaId) : [],
		queryFn: () => {
			if (!licenciaId) throw new Error("licenciaId requerido");
			return getLicenciaTimeline(licenciaId);
		},
		enabled: !!licenciaId,
	});
};
