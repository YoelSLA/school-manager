import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmpleadoEducativoCreateDTO } from "@/utils/types";
import { empleadosEducativosQueryKeys } from "../../../utils/queryKeys/empleadosEducativos.queryKeys";
import { crearEmpleadoEducativo } from "../services/empleadosEducativos.services";

type Variables = {
	escuelaId: number;
	data: EmpleadoEducativoCreateDTO;
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
