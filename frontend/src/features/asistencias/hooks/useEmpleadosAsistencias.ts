import { useQuery } from "@tanstack/react-query";
import { obtenerEmpleadosAsistencias } from "../services/asistencias.services";
import type { EmpleadoAsistenciaDTO } from "../types/asistencias.types";
import { asistenciasQueryKeys } from "../utils/asistencias.queryKeys";

type Params = {
	fecha: string;
	roles: string[];
	query: string;
	enabled?: boolean;
};

export function useEmpleadosAsistencias({
	fecha,
	roles,
	query,
	enabled = true,
}: Params) {
	return useQuery<EmpleadoAsistenciaDTO[]>({
		queryKey: asistenciasQueryKeys.empleadosPorFecha(fecha, roles, query),

		queryFn: () =>
			obtenerEmpleadosAsistencias({
				fecha,
				roles,
				q: query,
			}),

		enabled,
		placeholderData: (previousData) => previousData,
	});
}
