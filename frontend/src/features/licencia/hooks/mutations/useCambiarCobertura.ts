import { useMutation, useQueryClient } from "@tanstack/react-query";
import { licenciaQueryKeys } from "../../constants";
import { licenciaService } from "../../services";
import type { CambiarCoberturaDTO } from "../../types";

type Variables = {
	licenciaId: number;
	designacionId: number;
	body: CambiarCoberturaDTO;
};

export function useCambiarCobertura() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ licenciaId, designacionId, body }: Variables) =>
			licenciaService.cambiarCobertura(licenciaId, designacionId, body),

		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: licenciaQueryKeys.detail(variables.licenciaId),
			});

			queryClient.invalidateQueries({
				queryKey: licenciaQueryKeys.designaciones(variables.licenciaId),
			});

			queryClient.invalidateQueries({
				queryKey: licenciaQueryKeys.all,
			});
		},
	});
}
