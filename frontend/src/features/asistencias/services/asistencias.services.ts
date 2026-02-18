import { http } from "@/services/axios";
import type {
	AsistenciaDiaDTO,
	EliminarInasistenciasManualDTO,
	EmpleadoAsistenciaDTO,
	RegistrarInasistenciasManualDTO,
	RolCountDTO,
} from "../types/asistencias.types";
import type { PageResponse } from "@/utils/types";

export async function registrarInasistenciasManual(
	payload: RegistrarInasistenciasManualDTO,
): Promise<void> {
	await http.post("/asistencias/manual", payload);
}

export async function obtenerAsistenciasEmpleadoMes(
	escuelaId: number,
	empleadoId: number,
	anio: number,
	mes: number,
): Promise<AsistenciaDiaDTO[]> {
	const response = await http.get<AsistenciaDiaDTO[]>(
		`/escuelas/${escuelaId}/empleados/${empleadoId}/asistencias`,
		{
			params: {
				anio,
				mes,
			},
		},
	);

	return response.data;
}

export async function obtenerRolesConAsistencias(
	fecha: string,
): Promise<RolCountDTO[]> {
	const response = await http.get<RolCountDTO[]>("/asistencias/roles", {
		params: { fecha },
	});

	return response.data;
}

type ObtenerEmpleadosParams = {
	fecha: string;
	roles?: string[];
	q?: string;
};

export async function obtenerEmpleadosAsistencias(
	params: ObtenerEmpleadosParams,
	page: number = 0,
	size: number = 10,
): Promise<PageResponse<EmpleadoAsistenciaDTO>> {
	const queryParams: Record<string, string | number> = {
		fecha: params.fecha,
		page,
		size,
	};

	if (params.roles && params.roles.length > 0) {
		queryParams.roles = params.roles.join(",");
	}

	if (params.q && params.q.trim() !== "") {
		queryParams.q = params.q;
	}

	const response = await http.get<PageResponse<EmpleadoAsistenciaDTO>>(
		"/asistencias/empleados",
		{ params: queryParams },
	);

	return response.data;
}

export async function eliminarInasistenciasManual(
	escuelaId: number,
	payload: EliminarInasistenciasManualDTO,
): Promise<void> {
	await http.delete(`/escuelas/${escuelaId}/asistencias/manual`, {
		data: payload,
	});
}
