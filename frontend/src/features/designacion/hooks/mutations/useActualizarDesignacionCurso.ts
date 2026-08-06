import { useMutation, useQueryClient } from "@tanstack/react-query";
import { designacionQueryKeys } from "../../constants";
import { designacionService } from "../../services/";
import type { DesignacionCursoCreateDTO } from "../../types";

export function useActualizarDesignacionCurso(designacionId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: DesignacionCursoCreateDTO) => {
			if (!designacionId) {
				throw new Error("designacionId requerido para editar designación");
			}

			return designacionService.actualizarDesignacionCurso(designacionId, data);
		},

		onSuccess: () => {
			if (!designacionId) return;

			queryClient.invalidateQueries({
				queryKey: designacionQueryKeys.detail(designacionId),
			});

			queryClient.invalidateQueries({
				queryKey: designacionQueryKeys.curso.lists(),
			});
		},
	});
}
