import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DesignacionCursoCreateDTO } from "@/shared/utils/types";
import { designacionesQueryKeys } from "../../../shared/utils/queryKeys/designaciones.queryKeys";
import { actualizarDesignacionCurso } from "../designaciones.services";

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
