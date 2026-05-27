import { materiasQueryKeys } from "@/shared/utils/queryKeys/materias.queryKeys";
import type { MateriaUpdateDTO } from "@/shared/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMateria } from "../services/materias.services";

type EditarMateriaParams = {
	id: number;
	data: MateriaUpdateDTO;
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
