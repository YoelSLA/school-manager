import { useQuery } from "@tanstack/react-query";
import { getAsignacionesActivas } from "@/services/empleadoEducativo.service";
import { empleadosEducativosQueryKeys } from "@/shared/utils/queryKeys/empleadosEducativos.queryKeys";

export const useAsignacionesActivas = (empleadoId: number | null) => {
	return useQuery({
		queryKey: empleadoId
			? empleadosEducativosQueryKeys.asignacionesActivas(empleadoId)
			: ["asignaciones-activas-empty"],

		queryFn: () => {
			if (empleadoId === null) {
				throw new Error("empleadoId es requerido");
			}

			return getAsignacionesActivas(empleadoId);
		},

		enabled: empleadoId !== null,
	});
};
