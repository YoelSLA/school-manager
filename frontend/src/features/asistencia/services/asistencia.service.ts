import { http } from "@/shared/http";
import type { PageResponse, RolEducativo } from "@/shared/types";
import type {
	AsistenciaDiaDTO,
	AsistenciaEmpleadoResumenDTO,
	EliminarInasistenciasManualDTO,
	RegistrarInasistenciasManualDTO,
	RolCountDTO,
} from "../types";

type ObtenerEmpleadosAsistenciaParams = {
	fecha: string;
	roles?: RolEducativo[];
	q?: string;
	page?: number;
	size?: number;
};

/* =========================================================
   QUERIES
========================================================= */

const getRolesConAsistencias = async (
	escuelaId: number,
	fecha: string,
): Promise<RolCountDTO[]> => {
	const { data } = await http.get<RolCountDTO[]>(
		`/escuelas/${escuelaId}/asistencias/roles`,
		{
			params: { fecha },
		},
	);

	return data;
};

const getEmpleadosAsistencias = async (
	escuelaId: number,
	params: ObtenerEmpleadosAsistenciaParams,
): Promise<PageResponse<AsistenciaEmpleadoResumenDTO>> => {
	const { data } = await http.get<PageResponse<AsistenciaEmpleadoResumenDTO>>(
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

	return data;
};

const getAsistenciasEmpleadoMes = async (
	escuelaId: number,
	empleadoId: number,
	anio: number,
	mes: number,
): Promise<AsistenciaDiaDTO[]> => {
	const { data } = await http.get<AsistenciaDiaDTO[]>(
		`/escuelas/${escuelaId}/asistencias/empleados/${empleadoId}`,
		{
			params: { anio, mes },
		},
	);

	return data;
};

/* =========================================================
   MUTATIONS
========================================================= */

const registrarInasistencias = async (
	escuelaId: number,
	payload: RegistrarInasistenciasManualDTO,
): Promise<void> => {
	await http.post(`/escuelas/${escuelaId}/asistencias`, payload);
};

const eliminarInasistencias = async (
	escuelaId: number,
	payload: EliminarInasistenciasManualDTO,
): Promise<void> => {
	await http.delete(`/escuelas/${escuelaId}/asistencias`, {
		data: payload,
	});
};

/* =========================================================
   SERVICE
========================================================= */

export const asistenciaService = {
	// Queries
	getRolesConAsistencias,
	getEmpleadosAsistencias,
	getAsistenciasEmpleadoMes,

	// Mutations
	registrarInasistencias,
	eliminarInasistencias,
};
