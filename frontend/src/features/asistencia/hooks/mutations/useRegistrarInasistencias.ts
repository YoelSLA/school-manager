import { useMutation, useQueryClient } from "@tanstack/react-query";
import { asistenciaService } from "@/features/asistencia/services";
import { asistenciaQueryKeys } from "../../constants";
import type { RegistrarInasistenciasManualDTO } from "../../types";

export function useRegistrarInasistencias(
	escuelaId: number | undefined,
	empleadoId: number,
	anio: number,
	mes: number,
) {
	const queryClient = useQueryClient();

	return useMutation<void, unknown, RegistrarInasistenciasManualDTO>({
		mutationFn: async (payload) => {
			if (!escuelaId) {
				throw new Error("escuelaId es requerido");
			}

			return asistenciaService.registrarInasistencias(escuelaId, payload);
		},

		onSuccess: () => {
			if (!escuelaId) return;

			queryClient.invalidateQueries({
				queryKey: asistenciaQueryKeys.porEmpleadoMes(
					escuelaId,
					empleadoId,
					anio,
					mes,
				),
			});
		},
	});
}
