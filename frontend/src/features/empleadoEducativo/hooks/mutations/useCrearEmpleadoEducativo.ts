import { useMutation, useQueryClient } from "@tanstack/react-query";
import { empleadoEducativoQueryKeys } from "../../constants";
import { empleadoEducativoService } from "../../services";
import type { EmpleadoEducativoCreateDTO } from "../../types";

type Variables = {
	escuelaId: number;
	data: EmpleadoEducativoCreateDTO;
};

export function useCrearEmpleadoEducativo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ escuelaId, data }: Variables) =>
			empleadoEducativoService.crearEmpleadoEducativo(escuelaId, data),

		onSuccess: (_data, _variables) => {
			// 🔥 invalida TODAS las listas de empleados
			queryClient.invalidateQueries({
				queryKey: empleadoEducativoQueryKeys.all,
			});
		},
	});
}
