import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMateria } from "@/services/materia.service";
import type { MateriaCreateDTO } from "@/shared/types";
import { materiasQueryKeys } from "@/shared/utils/queryKeys/materias.queryKeys";

export function useCreateMateria(escuelaId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: MateriaCreateDTO) => {
			if (!escuelaId) {
				throw new Error("escuelaId requerido");
			}

			return createMateria(escuelaId, data);
		},

		onSuccess: () => {
			if (!escuelaId) return;

			queryClient.invalidateQueries({
				queryKey: materiasQueryKeys.all,
			});
		},
	});
}
