import { useQuery } from "@tanstack/react-query";
import { getDesignacionesActivas } from "../services/empleadosEducativos.services";
import { empleadosEducativosQueryKeys } from "../utils/empleadosEducativos.queryKeys";

export const useDesignacionesActivas = (empleadoId: number | null) => {
	return useQuery({
		queryKey: empleadoId
			? empleadosEducativosQueryKeys.designacionesActivas(empleadoId)
			: [],
		queryFn: () => getDesignacionesActivas(empleadoId!),
		enabled: !!empleadoId,
	});
};
