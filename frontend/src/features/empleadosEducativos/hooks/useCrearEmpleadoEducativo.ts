import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearEmpleadoEducativo } from "../services/empleadosEducativos.services";
import { empleadosEducativosQueryKeys } from "../utils/empleadosEducativos.queryKeys";
import type { EmpleadoEducativoCreateOutput } from "../form/empleadoEducativo.form.types";

type Variables = {
	escuelaId: number;
	data: EmpleadoEducativoCreateOutput;
};

export function useCrearEmpleadoEducativo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ escuelaId, data }: Variables) =>
			crearEmpleadoEducativo(escuelaId, data),

		onSuccess: (_data, _variables) => {
			// 🔥 invalida TODAS las listas de empleados
			queryClient.invalidateQueries({
				queryKey: empleadosEducativosQueryKeys.all,
			});
		},
	});
}
