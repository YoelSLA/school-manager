import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DesignacionCursoCreateDTO } from "@/utils/types";
import { designacionesQueryKeys } from "../../../utils/queryKeys/designaciones.queryKeys";
import { crearDesignacionCurso } from "../services/designaciones.services";

export function useCrearDesignacionCurso(escuelaId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: DesignacionCursoCreateDTO) => {
			if (!escuelaId) {
				throw new Error("escuelaId requerido para crear designación");
			}

			return crearDesignacionCurso(escuelaId, data);
		},

		onSuccess: () => {
			if (!escuelaId) return;

			queryClient.invalidateQueries({
				queryKey: designacionesQueryKeys.curso.lists(),
			});
		},
	});
}
