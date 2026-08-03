import { useMutation, useQueryClient } from "@tanstack/react-query";
import { empleadoEducativoQueryKeys } from "../../constants";
import { empleadoEducativoService } from "../../services";
import type { EmpleadoEducativoUpdateDTO } from "../../types";

type Variables = {
	escuelaId: number;
	empleadoId: number;
	data: EmpleadoEducativoUpdateDTO;
};

export function useEditarEmpleadoEducativo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ escuelaId, empleadoId, data }: Variables) =>
			empleadoEducativoService.editarEmpleadoEducativo(
				escuelaId,
				empleadoId,
				data,
			),

		onSuccess: (_data, variables) => {
			// 🔥 invalida detalle
			queryClient.invalidateQueries({
				queryKey: empleadoEducativoQueryKeys.detail(variables.empleadoId),
			});

			// 🔥 invalida listas
			queryClient.invalidateQueries({
				queryKey: empleadoEducativoQueryKeys.all,
			});
		},
	});
}
