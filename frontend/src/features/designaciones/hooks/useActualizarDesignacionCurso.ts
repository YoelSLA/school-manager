import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DesignacionCursoCreateDTO } from "@/shared/types";
import { actualizarDesignacionCurso } from "../../../services/designacion.service";
import { designacionesQueryKeys } from "../../../shared/utils/queryKeys/designaciones.queryKeys";

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
