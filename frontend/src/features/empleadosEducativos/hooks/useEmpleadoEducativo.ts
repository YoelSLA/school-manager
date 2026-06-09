import { useQuery } from "@tanstack/react-query";
import type { EmpleadoEducativoDetalleDTO } from "@/shared/types";
import { getEmpleadoEducativoById } from "../../../services/empleadoEducativo.service";
import { empleadosEducativosQueryKeys } from "../../../shared/utils/queryKeys/empleadosEducativos.queryKeys";

export function useEmpleadoEducativo(empleadoId: number) {
	return useQuery<EmpleadoEducativoDetalleDTO>({
		queryKey: empleadosEducativosQueryKeys.detail(empleadoId),

		queryFn: () => getEmpleadoEducativoById(empleadoId),

		enabled: empleadoId > 0,
		staleTime: 1000 * 60 * 5,
	});
}
