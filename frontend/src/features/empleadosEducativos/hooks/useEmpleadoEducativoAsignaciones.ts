import { useQuery } from "@tanstack/react-query";

import { empleadosEducativosQueryKeys } from "@/shared/utils/queryKeys/empleadosEducativos.queryKeys";

import { getAsignacionesEmpleadoEducativo } from "../../../services/empleadoEducativo.service";

export function useEmpleadoEducativoAsignaciones(empleadoId?: number) {
	return useQuery({
		queryKey:
			empleadoId != null
				? empleadosEducativosQueryKeys.asignaciones(empleadoId)
				: empleadosEducativosQueryKeys.lists(),

		queryFn: () => {
			if (!empleadoId) {
				throw new Error("Empleado no definido");
			}

			return getAsignacionesEmpleadoEducativo(empleadoId);
		},

		enabled: !!empleadoId,
		staleTime: 1000 * 60 * 5,
	});
}
