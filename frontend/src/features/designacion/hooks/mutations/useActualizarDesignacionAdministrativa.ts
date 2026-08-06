import { useMutation, useQueryClient } from "@tanstack/react-query";
import { designacionQueryKeys } from "../../constants";
import { designacionService } from "../../services";
import type { DesignacionAdministrativaUpdateDTO } from "../../types";

export function useActualizarDesignacionAdministrativa(designacionId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: DesignacionAdministrativaUpdateDTO) => {
			if (!designacionId) {
				throw new Error("designacionId requerido para editar designación");
			}

			return designacionService.actualizarDesignacionAdministrativa(
				designacionId,
				data,
			);
		},

		onSuccess: () => {
			if (!designacionId) return;

			queryClient.invalidateQueries({
				queryKey: designacionQueryKeys.administrativa.detail(designacionId),
			});

			queryClient.invalidateQueries({
				queryKey: designacionQueryKeys.administrativa.lists(),
			});
		},
	});
}
