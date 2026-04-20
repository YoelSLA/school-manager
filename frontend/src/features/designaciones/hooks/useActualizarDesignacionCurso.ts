import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DesignacionCursoCreateDTO } from "@/utils/types";
import { designacionesQueryKeys } from "../../../utils/queryKeys/designaciones.queryKeys";
import { actualizarDesignacionCurso } from "../services/designaciones.services";

export function useActualizarDesignacionCurso(designacionId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: DesignacionCursoCreateDTO) => {
			if (!designacionId) {
				throw new Error("designacionId requerido para editar designación");
			}

			return actualizarDesignacionCurso(designacionId, data);
		},

		onSuccess: () => {
			if (!designacionId) return;

			queryClient.invalidateQueries({
				queryKey: designacionesQueryKeys.detail(designacionId),
			});

			queryClient.invalidateQueries({
				queryKey: designacionesQueryKeys.curso.lists(),
			});
		},
	});
}
