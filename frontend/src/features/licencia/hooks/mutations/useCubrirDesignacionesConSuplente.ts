import { useMutation, useQueryClient } from "@tanstack/react-query";
import { licenciaQueryKeys } from "../../constants";
import { licenciaService } from "../../services";
import type { CubrirDesignacionesConSuplente } from "../../types";

type Variables = {
	licenciaId: number;
	body: CubrirDesignacionesConSuplente;
};

export function useCubrirDesignacionesConSuplente() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ licenciaId, body }: Variables) => {
			await licenciaService.cubrirDesignacionesConSuplente(licenciaId, body);
		},

		onSuccess: (_data, variables) => {
			// 🔄 detalle de la licencia
			queryClient.invalidateQueries({
				queryKey: licenciaQueryKeys.detail(variables.licenciaId),
			});

			// 🔄 todas las listas de licencias
			queryClient.invalidateQueries({
				queryKey: licenciaQueryKeys.all,
			});
		},
	});
}
