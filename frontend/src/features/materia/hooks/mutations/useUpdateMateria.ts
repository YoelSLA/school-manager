import { useMutation, useQueryClient } from "@tanstack/react-query";
import { materiaQueryKeys } from "../../constants";
import { materiaService } from "../../services";
import type { MateriaUpdateDTO } from "../../types";

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
			return materiaService.updateMateria(escuelaId, id, data);
		},

		onSuccess: () => {
			if (!escuelaId) return;

			queryClient.invalidateQueries({
				queryKey: materiaQueryKeys.all,
			});
		},
	});
}
