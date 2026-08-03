import { useQuery } from "@tanstack/react-query";
import { empleadoEducativoQueryKeys } from "../../constants";
import { empleadoEducativoService } from "../../services";

export function useEmpleadoEducativoLicencias(empleadoId?: number) {
	return useQuery({
		queryKey:
			empleadoId != null
				? empleadoEducativoQueryKeys.licencias(empleadoId)
				: empleadoEducativoQueryKeys.lists(),

		queryFn: () => {
			if (!empleadoId) {
				throw new Error("Empleado no definido");
			}

			return empleadoEducativoService.getLicenciasEmpleadoEducativo(empleadoId);
		},

		enabled: !!empleadoId,
		staleTime: 1000 * 60 * 5,
	});
}
