import { useQuery } from "@tanstack/react-query";
import { empleadosEducativosQueryKeys } from "@/features/empleadosEducativos/empleadosEducativos.queryKeys";
import { getLicenciasEmpleadoEducativo } from "@/features/empleadosEducativos/services/empleadoEducativo.service";

export function useEmpleadoEducativoLicencias(empleadoId?: number) {
	return useQuery({
		queryKey:
			empleadoId != null
				? empleadosEducativosQueryKeys.licencias(empleadoId)
				: empleadosEducativosQueryKeys.lists(),

		queryFn: () => {
			if (!empleadoId) {
				throw new Error("Empleado no definido");
			}

			return getLicenciasEmpleadoEducativo(empleadoId);
		},

		enabled: !!empleadoId,
		staleTime: 1000 * 60 * 5,
	});
}
