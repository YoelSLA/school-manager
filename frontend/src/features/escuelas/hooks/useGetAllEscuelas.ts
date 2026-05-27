import { escuelasQueryKeys } from "@/shared/utils/queryKeys/escuelas.queryKeys";
import type { EscuelaResponseDTO } from "@/shared/utils/types";
import { useQuery } from "@tanstack/react-query";
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
