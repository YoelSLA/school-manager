import { useQuery } from "@tanstack/react-query";
import type { PageResponse } from "@/utils/types";
import { obtenerEmpleadosAsistencias } from "../services/asistencias.services";
import type { EmpleadoAsistenciaDTO } from "../types/asistencias.types";
import { asistenciasQueryKeys } from "../../../utils/queryKeys/asistencias.queryKeys";

type Params = {
	fecha: string;
	roles: string[];
	query: string;
	page: number;
	size: number;
	enabled?: boolean;
};

export function useEmpleadosAsistencias({
	fecha,
	roles,
	query,
	page,
	size,
	enabled = true,
}: Params) {
	return useQuery<PageResponse<EmpleadoAsistenciaDTO>>({
		queryKey: asistenciasQueryKeys.empleadosPorFecha(
			fecha,
			roles,
			query,
			page,
			size,
		),

		queryFn: () =>
			obtenerEmpleadosAsistencias(
				{
					fecha,
					roles,
					q: query,
				},
				page,
				size,
			),

		enabled,

		// reemplazo keepPreviousData (v5)
		placeholderData: (previousData) => previousData,
	});
}
