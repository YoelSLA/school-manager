import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearEmpleadoEducativo } from "@/features/empleadosEducativos/services/empleadoEducativo.service";
import type { EmpleadoEducativoCreateDTO } from "@/features/empleadosEducativos/types/empleadoEducativo.types";
import { empleadosEducativosQueryKeys } from "../constants/queryKeys";

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
