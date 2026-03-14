import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CrearMateriaFormValues } from "../form/materias.form.types";
import { editMateria } from "../services/materias.services";
import { materiasQueryKeys } from "../types/materias.queryKeys";

type EditarMateriaParams = {
	id: number;
	data: CrearMateriaFormValues;
};

export function useEditMateria(escuelaId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: EditarMateriaParams) => {
			if (!escuelaId) {
				throw new Error("escuelaId requerido");
			}
			return editMateria(escuelaId, id, data);
		},

		onSuccess: () => {
			if (!escuelaId) return;

			queryClient.invalidateQueries({
				queryKey: materiasQueryKeys.all,
			});
		},
	});
}
