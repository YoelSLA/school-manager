import { useMutation, useQueryClient } from "@tanstack/react-query";
import { empleadoEducativoQueryKeys } from "../../constants";
import { empleadoEducativoService } from "../../services";
import type { BajaDefinitivaDTO } from "../../types";

type Variables = {
	empleadoId: number;
	payload: BajaDefinitivaDTO;
	escuelaId: number;
};

export function useDarDeBajaDefinitiva() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ empleadoId, payload }: Variables) =>
			empleadoEducativoService.darDeBajaDefinitiva(empleadoId, payload),

		onSuccess: (_, variables) => {
			// 🔥 Invalidar lista paginada
			queryClient.invalidateQueries({
				queryKey: empleadoEducativoQueryKeys.byEscuela(variables.escuelaId),
			});

			// 🔥 Invalidar detalle individual
			queryClient.invalidateQueries({
				queryKey: empleadoEducativoQueryKeys.detail(variables.empleadoId),
			});
		},
	});
}
