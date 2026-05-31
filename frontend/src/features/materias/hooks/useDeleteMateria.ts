import { useMutation, useQueryClient } from "@tanstack/react-query";
import { materiasQueryKeys } from "@/shared/utils/queryKeys/materias.queryKeys";
import { deleteMateria } from "../../../services/materia.service";

export default function useDeleteMateria(escuelaId?: number) {
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
