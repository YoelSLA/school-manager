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
			// 🔹 detalle
			queryClient.invalidateQueries({
				queryKey: licenciasQueryKeys.detail(licenciaId),
			});

			// 🔹 timeline (porque renovación afecta cadena)
			queryClient.invalidateQueries({
				queryKey: licenciasQueryKeys.timeline(licenciaId),
			});

			// 🔹 designaciones (puede cambiar estado)
			queryClient.invalidateQueries({
				queryKey: licenciasQueryKeys.designaciones(licenciaId),
			});

			// 🔹 opcional: invalidar todas las licencias
			queryClient.invalidateQueries({
				queryKey: licenciasQueryKeys.all,
			});
		},
	});
}