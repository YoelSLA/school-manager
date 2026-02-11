import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Escuela } from "../types/escuela.types";
import { eliminarEscuela, getEscuelas } from "../services/escuelas.services";
import { escuelasQueryKeys } from "../types/escuelas.queryKeys";

export function useEscuelas() {
	const queryClient = useQueryClient();

	const {
		data = [],
		isLoading,
		refetch,
	} = useQuery<Escuela[]>({
		queryKey: escuelasQueryKeys.lists(),
		queryFn: getEscuelas,
	});

	const eliminarMutation = useMutation({
		mutationFn: (id: number) => eliminarEscuela(id),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: escuelasQueryKeys.lists(),
			});
		},
	});

	return {
		escuelas: data,
		isLoading,
		refetch,
		eliminarEscuela: eliminarMutation.mutateAsync,
	};
}
