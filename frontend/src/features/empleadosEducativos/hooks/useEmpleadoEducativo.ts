import { useQuery } from "@tanstack/react-query";
import { getEmpleadoEducativoById } from "../services/empleadosEducativos.services";
import type { EmpleadoEducativoDetalleDTO } from "../types/empleadosEducativos.types";
import { empleadosEducativosQueryKeys } from "../utils/empleadosEducativos.queryKeys";

export function useEmpleadoEducativo(empleadoId: number) {
	return useQuery<EmpleadoEducativoDetalleDTO>({
		queryKey: empleadosEducativosQueryKeys.detail(empleadoId),

		queryFn: () => getEmpleadoEducativoById(empleadoId),

		enabled: empleadoId > 0,
		staleTime: 1000 * 60 * 5,
	});
}
