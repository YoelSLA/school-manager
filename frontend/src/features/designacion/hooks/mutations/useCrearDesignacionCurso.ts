import { useMutation, useQueryClient } from "@tanstack/react-query";
import { designacionQueryKeys } from "../../constants";
import { designacionService } from "../../services";
import type { DesignacionCursoCreateDTO } from "../../types";

export function useCrearDesignacionCurso(escuelaId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: DesignacionCursoCreateDTO) => {
			if (!escuelaId) {
				throw new Error("escuelaId requerido para crear designación");
			}

			return designacionService.crearDesignacionCurso(escuelaId, data);
		},

		onSuccess: () => {
			if (!escuelaId) return;

			queryClient.invalidateQueries({
				queryKey: designacionQueryKeys.curso.lists(),
			});
		},
	});
}
