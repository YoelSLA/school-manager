import { useQuery } from "@tanstack/react-query";
import { getLicenciaTimeline } from "../services/licencias.services";
import { licenciasQueryKeys } from "@/utils/queryKeys/licencias.queryKeys";

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
