import { useMutation, useQueryClient } from "@tanstack/react-query";
import { licenciaQueryKeys } from "../../constants";
import { licenciaService } from "../../services";

export function useDeleteLicencia() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (licenciaId: number) =>
			licenciaService.deleteLicencia(licenciaId),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: licenciaQueryKeys.all,
			});
		},
	});
}
