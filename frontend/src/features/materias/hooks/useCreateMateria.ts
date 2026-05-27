import { materiasQueryKeys } from "@/shared/utils/queryKeys/materias.queryKeys";
import type { MateriaCreateDTO } from "@/shared/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearMateria } from "../services/materias.services";

export function useCrearMateria(escuelaId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: MateriaCreateDTO) => {
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
