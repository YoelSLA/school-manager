import { useQuery } from "@tanstack/react-query";
import { empleadoEducativoQueryKeys } from "../../constants";
import { empleadoEducativoService } from "../../services";
import type { EmpleadoEducativoDetalleDTO } from "../../types";

export function useEmpleadoEducativo(empleadoId: number) {
	return useQuery<EmpleadoEducativoDetalleDTO>({
		queryKey: empleadoEducativoQueryKeys.detail(empleadoId),

		queryFn: () =>
			empleadoEducativoService.getEmpleadoEducativoById(empleadoId),

		enabled: empleadoId > 0,
		staleTime: 1000 * 60 * 5,
	});
}
