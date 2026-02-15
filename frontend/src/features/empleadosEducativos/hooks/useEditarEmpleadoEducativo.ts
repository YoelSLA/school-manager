import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editarEmpleadoEducativo } from "../services/empleadosEducativos.services";
import { empleadosEducativosQueryKeys } from "../utils/empleadosEducativos.queryKeys";
import type { EmpleadoEducativoEditOutput } from "../form/empleadoEducativo.form.types";

type Variables = {
	escuelaId: number;
	empleadoId: number;
	data: EmpleadoEducativoEditOutput;
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
