import { useMutation, useQueryClient } from "@tanstack/react-query";
import { licenciasQueryKeys } from "@/shared/utils/queryKeys/licencias.queryKeys";
import { deleteLicencia } from "../../../services/licencia.service";

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
