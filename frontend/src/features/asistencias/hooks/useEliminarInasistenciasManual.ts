import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eliminarInasistenciasManual } from "../services/asistencias.services";

export function useEliminarInasistenciasManual(
	empleadoId: number,
	escuelaId: number,
	anio: number,
	mes: number,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (fechas: string[]) =>
			eliminarInasistenciasManual(escuelaId, {
				empleadoId,
				fechas,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["asistencias", empleadoId, anio, mes],
			});
		},
	});
}
