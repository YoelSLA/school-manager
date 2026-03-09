import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearDesignacionCurso } from "../services/designaciones.services";
import { designacionesQueryKeys } from "../utils/designaciones.queryKeys";
import { DesignacionCursoCreateDTO } from "../form/designacion.form.types";

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
