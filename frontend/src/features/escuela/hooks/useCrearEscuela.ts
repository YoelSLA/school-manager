import { useMutation, useQueryClient } from "@tanstack/react-query";
import { escuelaQueryKeys } from "../constants";
import { escuelaService } from "../services";

export function useCrearEscuela() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: escuelaService.crearEscuela,

		onSuccess: () => {
			// 🔄 listas de escuelas
			queryClient.invalidateQueries({
				queryKey: escuelaQueryKeys.lists(),
			});
		},
	});

	return {
		crearEscuela: mutation.mutateAsync,
		isLoading: mutation.isPending,
		error: mutation.error,
	};
}
