import { useMutation, useQueryClient } from "@tanstack/react-query";
import { empleadosEducativosQueryKeys } from "../../../utils/queryKeys/empleadosEducativos.queryKeys";
import { reactivarEmpleado } from "../services/empleadosEducativos.services";

type Variables = {
	empleadoId: number;
	escuelaId: number;
};

export function useReactivarEmpleado() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ empleadoId }: Variables) => reactivarEmpleado(empleadoId),

		onSuccess: (_, variables) => {
			/* =========================
				 INVALIDAR LISTAS
			========================= */

			// Invalida todas las listas
			queryClient.invalidateQueries({
				queryKey: empleadosEducativosQueryKeys.lists(),
			});

			// Invalida detalle
			queryClient.invalidateQueries({
				queryKey: empleadosEducativosQueryKeys.detail(variables.empleadoId),
			});
		},
	});
}
