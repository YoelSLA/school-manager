import { useMutation, useQueryClient } from "@tanstack/react-query";
import { licenciaEstatutariaQueryKeys } from "../../constants";
import { licenciaEstatutariaService } from "../../services";
import type { LicenciaEstatutariaUpdateDTO } from "../../types";

type Params = {
	id: number;
	data: LicenciaEstatutariaUpdateDTO;
};

export function useUpdateLicenciaEstatutaria() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: Params) =>
			licenciaEstatutariaService.updateLicenciaEstatutaria(id, data),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: licenciaEstatutariaQueryKeys.all,
			});
		},
	});
}
