import { useQuery } from "@tanstack/react-query";
import { empleadosEducativosQueryKeys } from "../../../utils/queryKeys/empleadosEducativos.queryKeys";
import { getDesignacionesActivas } from "../services/empleadosEducativos.services";

export const useDesignacionesActivas = (empleadoId: number | null) => {
	if (!empleadoId) {
		throw new Error("empleadoId es requerido");
	}
	return useQuery({
		queryKey: empleadoId
			? empleadosEducativosQueryKeys.designacionesActivas(empleadoId)
			: [],
		queryFn: () => getDesignacionesActivas(empleadoId),
		enabled: !!empleadoId,
	});
};
