import { useMutation, useQueryClient } from "@tanstack/react-query";
import { asistenciaService } from "@/features/asistencia/services";
import { asistenciaQueryKeys } from "../../constants";

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
			asistenciaService.eliminarInasistencias(escuelaId, {
				empleadoId,
				fechas,
			}),

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: asistenciaQueryKeys.porEmpleadoMes(
					escuelaId,
					empleadoId,
					anio,
					mes,
				),
			});

			await queryClient.invalidateQueries({
				queryKey: [
					...asistenciaQueryKeys.all,
					"escuela",
					escuelaId,
					"empleados",
				],
			});

			await queryClient.invalidateQueries({
				queryKey: [...asistenciaQueryKeys.all, "escuela", escuelaId, "roles"],
			});
		},
	});
}
