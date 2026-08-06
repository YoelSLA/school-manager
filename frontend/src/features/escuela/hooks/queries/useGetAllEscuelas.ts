import { useQuery } from "@tanstack/react-query";
import { escuelaQueryKeys } from "../../constants";
import { escuelaService } from "../../services";
import type { EscuelaResponseDTO } from "../../types";

export function useGetAllEscuelas() {
	const {
		data = [],
		isLoading,
		refetch,
	} = useQuery<EscuelaResponseDTO[]>({
		queryKey: escuelaQueryKeys.lists(),
		queryFn: escuelaService.getEscuelas,
	});

	return {
		escuelas: data,
		isLoading,
		refetch,
	};
}
