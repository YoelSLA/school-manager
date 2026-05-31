import { useMutation, useQueryClient } from "@tanstack/react-query";
import { licenciasQueryKeys } from "@/shared/utils/queryKeys/licencias.queryKeys";
import { cambiarCobertura } from "../../../services/licencia.service";
import type { CambiarCoberturaDTO } from "../form/cambiarCobertura.schema";

type Variables = {
	licenciaId: number;
	designacionId: number;
	body: CambiarCoberturaDTO;
};

export function useCambiarCobertura() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ licenciaId, designacionId, body }: Variables) => {
			await cambiarCobertura(licenciaId, designacionId, body);
		},

		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: licenciasQueryKeys.detail(variables.licenciaId),
			});

			queryClient.invalidateQueries({
				queryKey: licenciasQueryKeys.designaciones(variables.licenciaId),
			});

			queryClient.invalidateQueries({
				queryKey: licenciasQueryKeys.all,
			});
		},
	});
}
