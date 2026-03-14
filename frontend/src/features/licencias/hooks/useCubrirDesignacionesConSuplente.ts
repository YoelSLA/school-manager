import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CubrirDesignacionesConSuplente } from "../form/cubrirDesignacionesConSuplente.schema";
import { cubrirDesignacionesConSuplente } from "../services/licencias.services";
import { licenciasQueryKeys } from "../utils/licencias.queryKeys";

type Variables = {
	licenciaId: number;
	body: CubrirDesignacionesConSuplente;
};

export function useCubrirDesignacionesConSuplente() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ licenciaId, body }: Variables) => {
			await cubrirDesignacionesConSuplente(licenciaId, body);
		},

		onSuccess: (_data, variables) => {
			// 🔄 detalle de la licencia
			queryClient.invalidateQueries({
				queryKey: licenciasQueryKeys.detail(variables.licenciaId),
			});

			// 🔄 todas las listas de licencias
			queryClient.invalidateQueries({
				queryKey: licenciasQueryKeys.all,
			});
		},
	});
}
