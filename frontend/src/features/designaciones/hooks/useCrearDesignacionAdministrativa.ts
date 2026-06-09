import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DesignacionAdministrativaCreateDTO } from "@/shared/types";
import { crearDesignacionAdministrativa } from "../../../services/designacion.service";
import { designacionesQueryKeys } from "../../../shared/utils/queryKeys/designaciones.queryKeys";

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
