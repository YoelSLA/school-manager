import { useQuery } from "@tanstack/react-query";
import { getEscuelas } from "../services/escuelas.services";
import { EscuelaResponseDTO } from "@/utils/types";
import { escuelasQueryKeys } from "@/utils/queryKeys/escuelas.queryKeys";

export function useGetAllEscuelas() {
	const { data = [], isLoading, refetch } = useQuery<EscuelaResponseDTO[]>({
		queryKey: escuelasQueryKeys.lists(),
		queryFn: getEscuelas,
	});

	return {
		escuelas: data,
		isLoading,
		refetch,
	};
}