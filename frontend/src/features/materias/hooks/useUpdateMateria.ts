import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMateria } from "@/services/materia.service";
import type { MateriaUpdateDTO } from "@/shared/types";
import { materiasQueryKeys } from "@/shared/utils/queryKeys/materias.queryKeys";

type EditarMateriaParams = {
	id: number;
	data: MateriaUpdateDTO;
};

export function useUpdateMateria(escuelaId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: EditarMateriaParams) => {
			if (!escuelaId) {
				throw new Error("escuelaId requerido");
			}
			return updateMateria(escuelaId, id, data);
		},

		onSuccess: () => {
			if (!escuelaId) return;

			queryClient.invalidateQueries({
				queryKey: materiasQueryKeys.all,
			});
		},
	});
}
