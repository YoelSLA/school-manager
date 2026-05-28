import { useQuery } from "@tanstack/react-query";
import { empleadosEducativosQueryKeys } from "@/shared/utils/queryKeys/empleadosEducativos.queryKeys";
import { getDesignacionesActivas } from "../empleadosEducativos.services";

export const useDesignacionesActivas = (empleadoId: number | null) => {
	return useQuery({
		queryKey: empleadoId
			? empleadosEducativosQueryKeys.designacionesActivas(empleadoId)
			: ["designaciones-activos-empty"],

		queryFn: () => {
			if (empleadoId === null) {
				throw new Error("empleadoId es requerido");
			}

			return getDesignacionesActivas(empleadoId);
		},

		enabled: empleadoId !== null,
	});
};
