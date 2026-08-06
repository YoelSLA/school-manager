import { useMutation, useQueryClient } from "@tanstack/react-query";
import { licenciaEstatutariaQueryKeys } from "../../constants";
import { licenciaEstatutariaService } from "../../services";

export function useDeleteLicenciaEstatutaria() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) =>
			licenciaEstatutariaService.deleteLicenciaEstatutaria(id),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: licenciaEstatutariaQueryKeys.all,
			});
		},
	});
}
