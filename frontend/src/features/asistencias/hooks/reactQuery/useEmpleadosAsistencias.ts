import { useQuery } from "@tanstack/react-query";
import type {
	AsistenciaEmpleadoResumenDTO,
	PageResponse,
	RolEducativo,
} from "@/shared/types";
import { asistenciasQueryKeys } from "@/shared/utils/queryKeys/asistencias.queryKeys";
import { obtenerEmpleadosAsistencias } from "../../../../services/asistencia.service";

type Params = {
	escuelaId: number;
	fecha: string;
	roles: RolEducativo[];
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
	return useQuery<PageResponse<AsistenciaEmpleadoResumenDTO>>({
		queryKey: asistenciasQueryKeys.empleados(
			escuelaId,
			fecha,
			roles,
			query,
			page,
			size,
		),

		queryFn: () =>
			obtenerEmpleadosAsistencias(escuelaId, {
				fecha,
				roles,
				q: query,
				page,
				size,
			}),

		enabled: enabled && Boolean(escuelaId) && Boolean(fecha),

		placeholderData: (previousData) => previousData,
	});
}
