import { useMutation, useQueryClient } from "@tanstack/react-query";
import { actualizarDesignacionAdministrativa } from "../services/designaciones.services";
import { designacionesQueryKeys } from "../../../utils/queryKeys/designaciones.queryKeys";
import { DesignacionAdministrativaUpdateDTO } from "@/utils/types";

export function useActualizarDesignacionAdministrativa(designacionId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: DesignacionAdministrativaUpdateDTO) => {
			if (!designacionId) {
				throw new Error("designacionId requerido para editar designación");
			}

			return actualizarDesignacionAdministrativa(designacionId, data);
		},

		onSuccess: () => {
			if (!designacionId) return;

			queryClient.invalidateQueries({
				queryKey: designacionesQueryKeys.administrativa.detail(designacionId),
			});

			queryClient.invalidateQueries({
				queryKey: designacionesQueryKeys.administrativa.lists(),
			});
		},
	});
}