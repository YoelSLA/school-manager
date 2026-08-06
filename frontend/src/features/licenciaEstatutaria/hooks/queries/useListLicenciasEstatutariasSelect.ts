import { useQuery } from "@tanstack/react-query";
import { licenciaEstatutariaQueryKeys } from "../../constants";
import { licenciaEstatutariaService } from "../../services";
import type { LicenciaEstatutariaSelectDTO } from "../../types";

export function useListLicenciasEstatutariasSelect() {
	return useQuery<LicenciaEstatutariaSelectDTO[]>({
		queryKey: licenciaEstatutariaQueryKeys.select(),

		queryFn: () => licenciaEstatutariaService.listLicenciasEstatutariasSelect(),

		staleTime: Infinity,
	});
}
