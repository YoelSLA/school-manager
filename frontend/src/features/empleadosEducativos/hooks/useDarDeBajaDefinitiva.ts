import { useMutation, useQueryClient } from "@tanstack/react-query";
import { darDeBajaDefinitiva } from "../services/empleadosEducativos.services";
import type { BajaDefinitivaDTO } from "../types/empleadosEducativos.types";
import { empleadosEducativosQueryKeys } from "../utils/empleadosEducativos.queryKeys";

type Variables = {
	empleadoId: number;
	payload: BajaDefinitivaDTO;
	escuelaId: number;
};

export function useDarDeBajaDefinitiva() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ empleadoId, payload }: Variables) =>
			darDeBajaDefinitiva(empleadoId, payload),

		onSuccess: (_, variables) => {
			// 🔥 Invalidar lista paginada
			queryClient.invalidateQueries({
				queryKey: empleadosEducativosQueryKeys.byEscuela(variables.escuelaId),
			});

			// 🔥 Invalidar detalle individual
			queryClient.invalidateQueries({
				queryKey: empleadosEducativosQueryKeys.detail(variables.empleadoId),
			});
		},
	});
}
