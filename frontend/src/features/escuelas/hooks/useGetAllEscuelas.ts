import { useQuery } from "@tanstack/react-query";
import { escuelasQueryKeys } from "@/shared/utils/queryKeys/escuelas.queryKeys";
import type { EscuelaResponseDTO } from "@/shared/utils/types";
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
