import { licenciasQueryKeys } from "@/shared/utils/queryKeys/licencias.queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getLicenciaTimeline } from "../services/licencias.services";

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
