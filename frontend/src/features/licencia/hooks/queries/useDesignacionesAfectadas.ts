import { useQuery } from "@tanstack/react-query";
import { licenciaQueryKeys } from "../../constants";
import { licenciaService } from "../../services";

export const useDesignacionesAfectadas = (licenciaId?: number) => {
	return useQuery({
		queryKey: licenciaId ? licenciaQueryKeys.designaciones(licenciaId) : [],
		queryFn: () => {
			if (!licenciaId) throw new Error("licenciaId requerido");
			return licenciaService.getDesignacionesAfectadas(licenciaId);
		},
		enabled: !!licenciaId,
	});
};
