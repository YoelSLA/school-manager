import { useQuery } from "@tanstack/react-query";
import { empleadoEducativoQueryKeys } from "../../constants";
import { empleadoEducativoService } from "../../services";

export const useAsignacionesActivas = (empleadoId: number | null) => {
	return useQuery({
		queryKey: empleadoId
			? empleadoEducativoQueryKeys.asignacionesActivas(empleadoId)
			: ["asignaciones-activas-empty"],

		queryFn: () => {
			if (empleadoId === null) {
				throw new Error("empleadoId es requerido");
			}

			return empleadoEducativoService.getAsignacionesActivas(empleadoId);
		},

		enabled: empleadoId !== null,
	});
};
