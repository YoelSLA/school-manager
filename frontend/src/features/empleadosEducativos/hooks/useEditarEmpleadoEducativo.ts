import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmpleadoEducativoUpdateDTO } from "@/shared/utils/types";
import { empleadosEducativosQueryKeys } from "../../../shared/utils/queryKeys/empleadosEducativos.queryKeys";
import { editarEmpleadoEducativo } from "../empleadosEducativos.services";

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
