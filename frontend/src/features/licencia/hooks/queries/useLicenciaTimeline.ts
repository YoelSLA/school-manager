import { useQuery } from "@tanstack/react-query";
import { licenciaQueryKeys } from "../../constants";
import { licenciaService } from "../../services";

export const useLicenciaTimeline = (licenciaId?: number) => {
	return useQuery({
		queryKey: licenciaId ? licenciaQueryKeys.timeline(licenciaId) : [],
		queryFn: () => {
			if (!licenciaId) throw new Error("licenciaId requerido");
			return licenciaService.getLicenciaTimeline(licenciaId);
		},
		enabled: !!licenciaId,
	});
};
