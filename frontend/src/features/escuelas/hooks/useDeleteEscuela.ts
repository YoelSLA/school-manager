import { useMutation, useQueryClient } from "@tanstack/react-query";
import { escuelasQueryKeys } from "@/shared/utils/queryKeys/escuelas.queryKeys";
import { eliminarEscuela } from "../../../services/escuela.service";

export function useDeleteEscuela() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => eliminarEscuela(id),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: escuelasQueryKeys.lists(),
			});
		},
	});
}
