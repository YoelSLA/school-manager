import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DesignacionAdministrativaCreateDTO } from "@/features/designaciones/types/designacion.types";
import { designacionesQueryKeys } from "../designaciones.queryKeys";
import { crearDesignacionAdministrativa } from "../services/designacion.service";

export function useCrearDesignacionAdministrativa(escuelaId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: DesignacionAdministrativaCreateDTO) => {
			if (!escuelaId) {
				throw new Error("escuelaId requerido para crear designación");
			}
			return crearDesignacionAdministrativa(escuelaId, data);
		},

		onSuccess: () => {
			if (!escuelaId) return;

			queryClient.invalidateQueries({
				queryKey: designacionesQueryKeys.administrativa.lists(),
			});
		},
	});
}
