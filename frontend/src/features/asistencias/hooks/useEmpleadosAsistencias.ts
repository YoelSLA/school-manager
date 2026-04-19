import { useQuery } from "@tanstack/react-query";
import type { EmpleadoAsistenciaDTO, PageResponse } from "@/utils/types";
import { asistenciasQueryKeys } from "../../../utils/queryKeys/asistencias.queryKeys";
import { obtenerEmpleadosAsistencias } from "../services/asistencias.services";

type Params = {
	escuelaId: number;
	fecha: string;
	roles: string[];
	query: string;
	page: number;
	size: number;
	enabled?: boolean;
};

export function useEmpleadosAsistencias({
	escuelaId,
	fecha,
	roles,
	query,
	page,
	size,
	enabled = true,
}: Params) {
	return useQuery<PageResponse<EmpleadoAsistenciaDTO>>({
		queryKey: asistenciasQueryKeys.empleadosPorFecha(
			escuelaId,
			fecha,
			roles,
			query,
			page,
			size,
		),

		queryFn: () =>
			obtenerEmpleadosAsistencias(
				escuelaId,
				{
					fecha,
					roles,
					q: query,
				},
				page,
				size,
			),

		enabled: enabled && Boolean(escuelaId) && Boolean(fecha),

		placeholderData: (previousData) => previousData,
	});
}
