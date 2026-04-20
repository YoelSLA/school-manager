import { useQuery } from "@tanstack/react-query";
import { licenciasQueryKeys } from "@/utils/queryKeys/licencias.queryKeys";
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
