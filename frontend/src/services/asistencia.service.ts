import { http } from "@/shared/api/http";

import type {
	AsistenciaDiaDTO,
	AsistenciaEmpleadoResumenDTO,
	EliminarInasistenciasManualDTO,
	PageResponse,
	RegistrarInasistenciasManualDTO,
	RolCountDTO,
	RolEducativo,
} from "@/shared/utils/types";

export async function registrarInasistencias(
	escuelaId: number,
	payload: RegistrarInasistenciasManualDTO,
): Promise<void> {
	await http.post(`/escuelas/${escuelaId}/asistencias`, payload);
}

export async function eliminarInasistencias(
	escuelaId: number,
	payload: EliminarInasistenciasManualDTO,
): Promise<void> {
	await http.delete(`/escuelas/${escuelaId}/asistencias`, {
		data: payload,
	});
}

export async function obtenerRolesConAsistencias(
	escuelaId: number,
	fecha: string,
): Promise<RolCountDTO[]> {
	const response = await http.get<RolCountDTO[]>(
		`/escuelas/${escuelaId}/asistencias/roles`,
		{
			params: {
				fecha,
			},
		},
	);

	return response.data;
}

type ObtenerEmpleadosAsistenciaParams = {
	fecha: string;
	roles?: RolEducativo[];
	q?: string;
	page?: number;
	size?: number;
};

export async function obtenerEmpleadosAsistencias(
	escuelaId: number,
	params: ObtenerEmpleadosAsistenciaParams,
): Promise<PageResponse<AsistenciaEmpleadoResumenDTO>> {
	const response = await http.get<PageResponse<AsistenciaEmpleadoResumenDTO>>(
		`/escuelas/${escuelaId}/asistencias/empleados`,
		{
			params: {
				fecha: params.fecha,
				roles: params.roles,
				q: params.q,
				page: params.page ?? 0,
				size: params.size ?? 10,
			},
		},
	);

	return response.data;
}

export async function obtenerAsistenciasEmpleadoMes(
	escuelaId: number,
	empleadoId: number,
	anio: number,
	mes: number,
): Promise<AsistenciaDiaDTO[]> {
	const response = await http.get<AsistenciaDiaDTO[]>(
		`/escuelas/${escuelaId}/asistencias/empleados/${empleadoId}`,
		{
			params: {
				anio,
				mes,
			},
		},
	);

	return response.data;
}
