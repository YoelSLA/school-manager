import { useQuery } from "@tanstack/react-query";
import { escuelasQueryKeys } from "@/utils/queryKeys/escuelas.queryKeys";
import type { EscuelaResponseDTO } from "@/utils/types";
import { getEscuelas } from "../services/escuelas.services";

export function useGetAllEscuelas() {
	const {
		data = [],
		isLoading,
		refetch,
	} = useQuery<EscuelaResponseDTO[]>({
		queryKey: escuelasQueryKeys.lists(),
		queryFn: getEscuelas,
	});

	return {
		escuelas: data,
		isLoading,
		refetch,
	};
}
