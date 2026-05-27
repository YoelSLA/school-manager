import { licenciasQueryKeys } from "@/shared/utils/queryKeys/licencias.queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLicencia } from "../services/licencias.services";

export default function useDeleteLicencia() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (licenciaId: number) => deleteLicencia(licenciaId),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: licenciasQueryKeys.all,
			});
		},
	});
}
