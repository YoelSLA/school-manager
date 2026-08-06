import { useQuery } from "@tanstack/react-query";
import { licenciaEstatutariaQueryKeys } from "../../constants";
import { licenciaEstatutariaService } from "../../services";

export function useLicenciaEstatutaria(id?: number) {
	return useQuery({
		queryKey: licenciaEstatutariaQueryKeys.detail(id!),
		queryFn: () => licenciaEstatutariaService.getLicenciaEstatutaria(id!),
		enabled: !!id,
	});
}
