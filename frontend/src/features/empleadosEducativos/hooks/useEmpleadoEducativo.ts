import type { EmpleadoEducativoDetalleDTO } from "@/shared/utils/types";
import { useQuery } from "@tanstack/react-query";
import { empleadosEducativosQueryKeys } from "../../../shared/utils/queryKeys/empleadosEducativos.queryKeys";
import { getEmpleadoEducativoById } from "../services/empleadosEducativos.services";

export function useEmpleadoEducativo(empleadoId: number) {
	return useQuery<EmpleadoEducativoDetalleDTO>({
		queryKey: empleadosEducativosQueryKeys.detail(empleadoId),

		queryFn: () => getEmpleadoEducativoById(empleadoId),

		enabled: empleadoId > 0,
		staleTime: 1000 * 60 * 5,
	});
}
