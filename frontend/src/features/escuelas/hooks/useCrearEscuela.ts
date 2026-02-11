import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearEscuela } from "../services/escuelas.services";
import { escuelasQueryKeys } from "../types/escuelas.queryKeys";

export function useCrearEscuela() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: crearEscuela,

		onSuccess: () => {
			// 🔄 listas de escuelas
			queryClient.invalidateQueries({
				queryKey: escuelasQueryKeys.lists(),
			});
		},
	});

	return {
		crearEscuela: mutation.mutateAsync,
		isLoading: mutation.isPending,
		error: mutation.error,
	};
}
