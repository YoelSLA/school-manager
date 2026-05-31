import { useMutation, useQueryClient } from "@tanstack/react-query";

import { asistenciasQueryKeys } from "@/shared/utils/queryKeys/asistencias.queryKeys";

import { eliminarInasistencias } from "../../../../services/asistencia.service";

type Params = {
	escuelaId: number;
	empleadoId: number;
	anio: number;
	mes: number;
};

export function useEliminarInasistencias({
	escuelaId,
	empleadoId,
	anio,
	mes,
}: Params) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (fechas: string[]) =>
			eliminarInasistencias(escuelaId, {
				empleadoId,
				fechas,
			}),

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: asistenciasQueryKeys.porEmpleadoMes(
					escuelaId,
					empleadoId,
					anio,
					mes,
				),
			});

			await queryClient.invalidateQueries({
				queryKey: [
					...asistenciasQueryKeys.all,
					"escuela",
					escuelaId,
					"empleados",
				],
			});

			await queryClient.invalidateQueries({
				queryKey: [...asistenciasQueryKeys.all, "escuela", escuelaId, "roles"],
			});
		},
	});
}
