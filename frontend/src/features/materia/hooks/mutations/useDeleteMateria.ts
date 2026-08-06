import { useMutation, useQueryClient } from "@tanstack/react-query";
import { materiaQueryKeys } from "../../constants";
import { materiaService } from "../../services";

export function useDeleteMateria(escuelaId?: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (materiaId: number) => {
			if (!escuelaId) {
				throw new Error("escuelaId requerido");
			}

			return materiaService.deleteMateria(escuelaId, materiaId);
		},

		onSuccess: () => {
			if (!escuelaId) return;

			queryClient.invalidateQueries({
				queryKey: materiaQueryKeys.all,
			});
		},
	});
}
