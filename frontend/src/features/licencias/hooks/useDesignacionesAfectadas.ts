import { useQuery } from "@tanstack/react-query";
import { licenciasQueryKeys } from "@/utils/queryKeys/licencias.queryKeys";
import { getDesignacionesAfectadas } from "../services/licencias.services";

export const useDesignacionesAfectadas = (licenciaId?: number) => {
	return useQuery({
		queryKey: licenciaId ? licenciasQueryKeys.designaciones(licenciaId) : [],
		queryFn: () => {
			if (!licenciaId) throw new Error("licenciaId requerido");
			return getDesignacionesAfectadas(licenciaId);
		},
		enabled: !!licenciaId,
	});
};
