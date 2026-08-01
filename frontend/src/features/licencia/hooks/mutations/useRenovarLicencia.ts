import { useMutation, useQueryClient } from "@tanstack/react-query";
import { licenciaQueryKeys } from "../../constants";
import { licenciaService } from "../../services";
import type { RenovarLicenciaDTO } from "../../types";

type Variables = {
	licenciaId: number;
	body: RenovarLicenciaDTO;
};

export function useRenovarLicencia() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ licenciaId, body }: Variables) => {
			await licenciaService.renovarLicencia(licenciaId, body);
		},

		onSuccess: (_data, { licenciaId }) => {
			// 🔹 detalle
			queryClient.invalidateQueries({
				queryKey: licenciaQueryKeys.detail(licenciaId),
			});

			// 🔹 timeline (porque renovación afecta cadena)
			queryClient.invalidateQueries({
				queryKey: licenciaQueryKeys.timeline(licenciaId),
			});

			// 🔹 designaciones (puede cambiar estado)
			queryClient.invalidateQueries({
				queryKey: licenciaQueryKeys.designaciones(licenciaId),
			});

			// 🔹 opcional: invalidar todas las licencias
			queryClient.invalidateQueries({
				queryKey: licenciaQueryKeys.all,
			});
		},
	});
}
