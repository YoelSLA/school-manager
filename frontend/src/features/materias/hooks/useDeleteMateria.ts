import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMateria } from "../services/materias.services";
import { materiasQueryKeys } from "../types/materias.queryKeys";

export function useDeleteMateria(escuelaId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (materiaId: number) => {
			if (!escuelaId) {
				throw new Error("escuelaId requerido");
			}

			return deleteMateria(escuelaId, materiaId);
		},

		onSuccess: () => {
			if (!escuelaId) return;

			queryClient.invalidateQueries({
				queryKey: materiasQueryKeys.all,
			});
		},
	});
}
