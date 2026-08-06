import { useQuery } from "@tanstack/react-query";
import type { PageResponse } from "@/shared/types";
import { licenciaEstatutariaQueryKeys } from "../../constants";
import { licenciaEstatutariaService } from "../../services";
import type { LicenciaEstatutariaResponseDTO } from "../../types";

export function useListLicenciasEstatutarias(
	page: number = 0,
	size: number = 10,
) {
	return useQuery<PageResponse<LicenciaEstatutariaResponseDTO>>({
		queryKey: licenciaEstatutariaQueryKeys.list(page, size),

		queryFn: () =>
			licenciaEstatutariaService.listLicenciasEstatutarias(page, size),

		placeholderData: (previousData) => previousData,
	});
}
