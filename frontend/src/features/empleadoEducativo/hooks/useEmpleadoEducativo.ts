import { useQuery } from "@tanstack/react-query";
import { getEmpleadoEducativoById } from "@/features/empleadosEducativos/services/empleadoEducativo.service";
import type { EmpleadoEducativoDetalleDTO } from "@/features/empleadosEducativos/types/empleadoEducativo.types";
import { empleadosEducativosQueryKeys } from "../constants/queryKeys";

export function useEmpleadoEducativo(empleadoId: number) {
	return useQuery<EmpleadoEducativoDetalleDTO>({
		queryKey: empleadosEducativosQueryKeys.detail(empleadoId),

		queryFn: () => getEmpleadoEducativoById(empleadoId),

		enabled: empleadoId > 0,
		staleTime: 1000 * 60 * 5,
	});
}
