import { useMutation, useQueryClient } from "@tanstack/react-query";
import { escuelaQueryKeys } from "../constants";
import { escuelaService } from "../services";

export function useDeleteEscuela() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => escuelaService.eliminarEscuela(id),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: escuelaQueryKeys.lists(),
			});
		},
	});
}
