import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CrearMateriaFormValues } from "../form/materias.form.types";
import { crearMateria } from "../services/materias.services";
import { materiasQueryKeys } from "../types/materias.queryKeys";

export function useCrearMateria(escuelaId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CrearMateriaFormValues) => {
			if (!escuelaId) {
				throw new Error("escuelaId requerido");
			}
			return crearMateria(escuelaId, data);
		},

		onSuccess: () => {
			if (!escuelaId) return;

			queryClient.invalidateQueries({
				queryKey: materiasQueryKeys.all,
			});
		},
	});
}
