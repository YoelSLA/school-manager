import { useMutation, useQueryClient } from "@tanstack/react-query";
import { empleadoEducativoQueryKeys } from "../../constants";
import { empleadoEducativoService } from "../../services";

type Variables = {
	empleadoId: number;
	escuelaId: number;
};

export function useReactivarEmpleado() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ empleadoId }: Variables) =>
			empleadoEducativoService.reactivarEmpleado(empleadoId),

		onSuccess: (_, variables) => {
			/* =========================
				 INVALIDAR LISTAS
			========================= */

			// Invalida todas las listas
			queryClient.invalidateQueries({
				queryKey: empleadoEducativoQueryKeys.lists(),
			});

			// Invalida detalle
			queryClient.invalidateQueries({
				queryKey: empleadoEducativoQueryKeys.detail(variables.empleadoId),
			});
		},
	});
}
