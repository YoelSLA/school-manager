import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMateria } from "../services/materias.services";
import { MateriaUpdateDTO } from "@/utils/types";
import { materiasQueryKeys } from "@/utils/queryKeys/materias.queryKeys";

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
