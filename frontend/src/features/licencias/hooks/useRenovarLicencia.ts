import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RenovarLicenciaDTO } from "../types/licencia.types";
import { renovarLicencia } from "../services/licencias.services";
import { licenciasQueryKeys } from "../utils/licencias.queryKeys";

type Variables = {
	licenciaId: number;
	body: RenovarLicenciaDTO;
};

export function useRenovarLicencia() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ licenciaId, body }: Variables) => {
			await renovarLicencia(licenciaId, body);
		},

		onSuccess: (_data, { licenciaId }) => {
			queryClient.invalidateQueries({
				queryKey: licenciasQueryKeys.detail(licenciaId),
			});

			queryClient.invalidateQueries({
				queryKey: licenciasQueryKeys.lists(),
			});
		},
	});
}
