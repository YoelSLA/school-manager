import { useQuery } from "@tanstack/react-query";
import { empleadosEducativosQueryKeys } from "@/features/empleadosEducativos/empleadosEducativos.queryKeys";
import { getAsignacionesActivas } from "@/features/empleadosEducativos/services/empleadoEducativo.service";

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
