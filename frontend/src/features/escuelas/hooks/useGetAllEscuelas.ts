import { useQuery } from "@tanstack/react-query";
import type { EscuelaResponseDTO } from "@/shared/types";
import { escuelasQueryKeys } from "@/shared/utils/queryKeys/escuelas.queryKeys";
import { getEscuelas } from "../../../services/escuela.service";

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
