import { useMutation, useQueryClient } from "@tanstack/react-query";
import { materiasQueryKeys } from "@/utils/queryKeys/materias.queryKeys";
import type { MateriaCreateDTO } from "@/utils/types";
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
