import { useQuery } from "@tanstack/react-query";
import type { PageResponse, RolEducativo } from "@/shared/types";
import { asistenciaQueryKeys } from "../../constants";
import { asistenciaService } from "../../services";
import type { AsistenciaEmpleadoResumenDTO } from "../../types";

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
		queryKey: asistenciaQueryKeys.empleados(
			escuelaId,
			fecha,
			roles,
			query,
			page,
			size,
		),

		queryFn: () =>
			asistenciaService.getEmpleadosAsistencias(escuelaId, {
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
