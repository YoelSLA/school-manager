import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RegistrarInasistenciasManualDTO } from "@/shared/types";
import { registrarInasistencias } from "../../../../services/asistencia.service";
import { asistenciasQueryKeys } from "../../../../shared/utils/queryKeys/asistencias.queryKeys";

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

			return registrarInasistencias(escuelaId, payload);
		},

		onSuccess: () => {
			if (!escuelaId) return;

			queryClient.invalidateQueries({
				queryKey: asistenciasQueryKeys.porEmpleadoMes(
					escuelaId,
					empleadoId,
					anio,
					mes,
				),
			});
		},
	});
}
