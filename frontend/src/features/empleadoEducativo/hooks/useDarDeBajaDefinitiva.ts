import { useMutation, useQueryClient } from "@tanstack/react-query";
import { darDeBajaDefinitiva } from "@/features/empleadosEducativos/services/empleadoEducativo.service";
import type { BajaDefinitivaDTO } from "@/shared/types";
import { empleadosEducativosQueryKeys } from "../constants/queryKeys";

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
