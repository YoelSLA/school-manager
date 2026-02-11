import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registrarInasistenciasManual } from "../services/asistencias.services";
import type { RegistrarInasistenciasManualDTO } from "../types/asistencias.types";
import { asistenciasQueryKeys } from "../utils/asistencias.queryKeys";

export function useRegistrarInasistenciasManual(
	escuelaId: number | undefined,
	empleadoId: number,
	anio: number,
	mes: number,
) {
	const queryClient = useQueryClient();

	return useMutation<void, unknown, RegistrarInasistenciasManualDTO>({
		mutationFn: registrarInasistenciasManual,

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
