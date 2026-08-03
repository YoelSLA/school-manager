import { useQuery } from "@tanstack/react-query";
import { empleadoEducativoQueryKeys } from "../../constants";
import { empleadoEducativoService } from "../../services";

export function useEmpleadoEducativoAsignaciones(empleadoId?: number) {
	return useQuery({
		queryKey:
			empleadoId != null
				? empleadoEducativoQueryKeys.asignaciones(empleadoId)
				: empleadoEducativoQueryKeys.lists(),

		queryFn: () => {
			if (!empleadoId) {
				throw new Error("Empleado no definido");
			}

			return empleadoEducativoService.getAsignacionesEmpleadoEducativo(
				empleadoId,
			);
		},

		enabled: !!empleadoId,
		staleTime: 1000 * 60 * 5,
	});
}
