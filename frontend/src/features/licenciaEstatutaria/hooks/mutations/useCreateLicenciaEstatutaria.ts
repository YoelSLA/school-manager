import { useMutation, useQueryClient } from "@tanstack/react-query";
import { licenciaEstatutariaQueryKeys } from "../../constants";
import { licenciaEstatutariaService } from "../../services";
import type { LicenciaEstatutariaCreateDTO } from "../../types";

export function useCreateLicenciaEstatutaria() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: LicenciaEstatutariaCreateDTO) =>
			licenciaEstatutariaService.createLicenciaEstatutaria(data),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: licenciaEstatutariaQueryKeys.all,
			});
		},
	});
}
