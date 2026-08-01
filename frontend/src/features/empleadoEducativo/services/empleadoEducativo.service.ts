import qs from "qs";

import type { AsignacionLicenciaDTO } from "@/features/asignacion/types";
import { http } from "@/shared/http/http";
import type {
	BajaDefinitivaDTO,
	EmpleadoEducativoFiltro,
	PageResponse,
	SortState,
} from "@/shared/types";

import type {
	EmpleadoEducativoAsignacionesDTO,
	EmpleadoEducativoBasicoDTO,
	EmpleadoEducativoCreateDTO,
	EmpleadoEducativoDetalleDTO,
	EmpleadoEducativoLicenciasDTO,
	EmpleadoEducativoUpdateDTO,
} from "../types";
import { buildSortQuery } from "../utils/empleadosEducativos.utils";

/* =========================================================
   MUTATIONS
========================================================= */

const crearEmpleadoEducativo = async (
	escuelaId: number,
	payload: EmpleadoEducativoCreateDTO,
): Promise<void> => {
	await http.post(`/escuelas/${escuelaId}/empleadosEducativos`, payload);
};

const editarEmpleadoEducativo = async (
	escuelaId: number,
	empleadoId: number,
	payload: EmpleadoEducativoUpdateDTO,
): Promise<void> => {
	await http.put(
		`/escuelas/${escuelaId}/empleadosEducativos/${empleadoId}`,
		payload,
	);
};

const darDeBajaDefinitiva = async (
	empleadoId: number,
	payload: BajaDefinitivaDTO,
): Promise<void> => {
	await http.post(
		`/empleadosEducativos/${empleadoId}/baja-definitiva`,
		payload,
	);
};

const reactivarEmpleado = async (empleadoId: number): Promise<void> => {
	await http.post(`/empleadosEducativos/${empleadoId}/reactivar`);
};

/* =========================================================
   QUERIES
========================================================= */

const getEmpleadosPorEscuela = async (
	escuelaId: number,
	estado: EmpleadoEducativoFiltro = "TODOS",
	page = 0,
	size = 10,
	sort: SortState = { apellido: "asc" },
): Promise<PageResponse<EmpleadoEducativoDetalleDTO>> => {
	const sortParams = buildSortQuery(sort);

	const params = {
		...(estado !== "TODOS" && { estado }),
		page,
		size,
		...(sortParams.length > 0 && { sort: sortParams }),
	};

	const { data } = await http.get<PageResponse<EmpleadoEducativoDetalleDTO>>(
		`/escuelas/${escuelaId}/empleadosEducativos`,
		{
			params,
			paramsSerializer: (params) =>
				qs.stringify(params, { arrayFormat: "repeat" }),
		},
	);

	return data;
};

const buscarEmpleadosPorEscuela = async (
	escuelaId: number,
	search: string,
): Promise<EmpleadoEducativoBasicoDTO[]> => {
	const { data } = await http.get<EmpleadoEducativoBasicoDTO[]>(
		`/escuelas/${escuelaId}/empleadosEducativos`,
		{
			params: { search },
		},
	);

	return data;
};

const getEmpleadoEducativoById = async (
	empleadoId: number,
): Promise<EmpleadoEducativoDetalleDTO> => {
	const { data } = await http.get<EmpleadoEducativoDetalleDTO>(
		`/empleadosEducativos/${empleadoId}`,
	);

	return data;
};

const getAsignacionesActivas = async (
	empleadoId: number,
): Promise<AsignacionLicenciaDTO[]> => {
	const { data } = await http.get<AsignacionLicenciaDTO[]>(
		`/empleadosEducativos/${empleadoId}/asignaciones-activas`,
	);

	return data;
};

const getAsignacionesEmpleadoEducativo = async (
	empleadoId: number,
): Promise<EmpleadoEducativoAsignacionesDTO> => {
	const { data } = await http.get<EmpleadoEducativoAsignacionesDTO>(
		`/empleadosEducativos/${empleadoId}/asignaciones`,
	);

	return data;
};

const getLicenciasEmpleadoEducativo = async (
	empleadoId: number,
): Promise<EmpleadoEducativoLicenciasDTO> => {
	const { data } = await http.get<EmpleadoEducativoLicenciasDTO>(
		`/empleadosEducativos/${empleadoId}/licencias`,
	);

	return data;
};

/* =========================================================
   SERVICE
========================================================= */

export const empleadoEducativoService = {
	// Queries
	getEmpleadosPorEscuela,
	buscarEmpleadosPorEscuela,
	getEmpleadoEducativoById,
	getAsignacionesActivas,
	getAsignacionesEmpleadoEducativo,
	getLicenciasEmpleadoEducativo,

	// Mutations
	crearEmpleadoEducativo,
	editarEmpleadoEducativo,
	darDeBajaDefinitiva,
	reactivarEmpleado,
};
