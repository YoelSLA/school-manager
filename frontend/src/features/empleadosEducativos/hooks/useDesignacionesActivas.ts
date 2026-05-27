import { empleadosEducativosQueryKeys } from "@/shared/utils/queryKeys/empleadosEducativos.queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getDesignacionesActivas } from "../services/empleadosEducativos.services";

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
