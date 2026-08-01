import { useMutation, useQueryClient } from "@tanstack/react-query";
import { materiaQueryKeys } from "../../constants";
import { materiaService } from "../../services";
import type { MateriaCreateDTO } from "../../types";

export function useCreateMateria(escuelaId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: MateriaCreateDTO) => {
			if (!escuelaId) {
				throw new Error("escuelaId requerido");
			}

			return materiaService.createMateria(escuelaId, data);
		},

		onSuccess: () => {
			if (!escuelaId) return;

			queryClient.invalidateQueries({
				queryKey: materiaQueryKeys.all,
			});
		},
	});
}
