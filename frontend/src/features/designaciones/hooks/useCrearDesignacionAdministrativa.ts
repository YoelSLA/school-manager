import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearDesignacionAdministrativa } from "../services/designaciones.services";
import { designacionesQueryKeys } from "../utils/designaciones.queryKeys";
import { DesignacionAdministrativaCreateDTO } from "../form/designacion.form.types";

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
