import type { RegistrarInasistenciasManualDTO } from "@/shared/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { asistenciasQueryKeys } from "../../../shared/utils/queryKeys/asistencias.queryKeys";
import { registrarInasistenciasManual } from "../services/asistencias.services";

export function useRegistrarInasistenciasManual(
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

			return registrarInasistenciasManual(escuelaId, payload);
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
