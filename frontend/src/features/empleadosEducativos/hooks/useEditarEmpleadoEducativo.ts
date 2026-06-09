import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmpleadoEducativoUpdateDTO } from "@/shared/types";
import { editarEmpleadoEducativo } from "../../../services/empleadoEducativo.service";
import { empleadosEducativosQueryKeys } from "../../../shared/utils/queryKeys/empleadosEducativos.queryKeys";

type Variables = {
	escuelaId: number;
	empleadoId: number;
	data: EmpleadoEducativoUpdateDTO;
};

export function useEditarEmpleadoEducativo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ escuelaId, empleadoId, data }: Variables) =>
			editarEmpleadoEducativo(escuelaId, empleadoId, data),

		onSuccess: (_data, variables) => {
			// 🔥 invalida detalle
			queryClient.invalidateQueries({
				queryKey: empleadosEducativosQueryKeys.detail(variables.empleadoId),
			});

			// 🔥 invalida listas
			queryClient.invalidateQueries({
				queryKey: empleadosEducativosQueryKeys.all,
			});
		},
	});
}
