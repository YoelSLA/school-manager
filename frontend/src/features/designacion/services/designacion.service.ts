import type {
	AsignacionDetalleDTO,
	CubrirProvisionalDTO,
	CubrirTitularDTO,
	EditarProvisionalDTO,
	EditarTitularDTO,
	EstadoCargo,
} from "@/features/asignacion/types";
import { http } from "@/shared/http";
import type { PageResponse } from "@/shared/types";
import type {
	DesignacionAdministrativaCreateDTO,
	DesignacionAdministrativaRowDTO,
	DesignacionCursoCreateDTO,
	DesignacionCursoDetalleDTO,
	DesignacionCursoFilter,
	DesignacionCursoRowDTO,
	DesignacionDetalleDTO,
} from "../types";

/* =========================================================
   QUERIES
========================================================= */

const listarDesignacionesAdministrativas = async (
	escuelaId: number,
	page = 0,
	size = 10,
): Promise<PageResponse<DesignacionAdministrativaRowDTO>> => {
	const { data } = await http.get<
		PageResponse<DesignacionAdministrativaRowDTO>
	>(`/escuelas/${escuelaId}/designaciones/administrativas`, {
		params: { page, size },
	});

	return data;
};

const listarDesignacionesCursos = async (
	escuelaId: number,
	page = 0,
	size = 10,
	filter?: DesignacionCursoFilter,
): Promise<PageResponse<DesignacionCursoRowDTO>> => {
	const { data } = await http.get<PageResponse<DesignacionCursoRowDTO>>(
		`/escuelas/${escuelaId}/designaciones/cursos`,
		{
			params: {
				page,
				size,
				...filter,
			},
		},
	);

	return data;
};

const obtenerDesignacionDetalle = async (
	designacionId: number,
): Promise<DesignacionDetalleDTO> => {
	const { data } = await http.get<DesignacionCursoDetalleDTO>(
		`/designaciones/${designacionId}`,
	);

	return data;
};

const listarCargosPorDesignacion = async (
	designacionId: number,
	estado?: EstadoCargo,
) => {
	const { data } = await http.get(`/designaciones/${designacionId}/cargos`, {
		params: estado ? { estado } : undefined,
	});

	return data;
};

const obtenerCargoActivo = async (
	designacionId: number,
): Promise<AsignacionDetalleDTO> => {
	const { data } = await http.get<AsignacionDetalleDTO>(
		`/designaciones/${designacionId}/cargo-activo`,
	);

	return data;
};

const obtenerAsignacionDetalle = async (
	designacionId: number,
	asignacionId: number,
): Promise<AsignacionDetalleDTO> => {
	const { data } = await http.get<AsignacionDetalleDTO>(
		`/designaciones/${designacionId}/asignaciones/${asignacionId}`,
	);

	return data;
};

/* =========================================================
   MUTATIONS
========================================================= */

const crearDesignacionAdministrativa = async (
	escuelaId: number,
	data: DesignacionAdministrativaCreateDTO,
): Promise<void> => {
	await http.post(`/escuelas/${escuelaId}/designaciones/administrativas`, data);
};

const crearDesignacionCurso = async (
	escuelaId: number,
	data: DesignacionCursoCreateDTO,
): Promise<void> => {
	await http.post(`/escuelas/${escuelaId}/designaciones/cursos`, data);
};

const actualizarDesignacionAdministrativa = async (
	designacionId: number,
	data: DesignacionAdministrativaCreateDTO,
): Promise<void> => {
	await http.put(`/designaciones/${designacionId}/administrativa`, data);
};

const actualizarDesignacionCurso = async (
	designacionId: number,
	data: DesignacionCursoCreateDTO,
): Promise<void> => {
	await http.put(`/designaciones/${designacionId}/curso`, data);
};

const cubrirConTitular = async (
	designacionId: number,
	payload: CubrirTitularDTO,
): Promise<void> => {
	await http.post(`/designaciones/${designacionId}/cubrir/titular`, payload);
};

const cubrirConProvisional = async (
	designacionId: number,
	payload: CubrirProvisionalDTO,
): Promise<void> => {
	await http.post(
		`/designaciones/${designacionId}/cubrir/provisional`,
		payload,
	);
};

const actualizarAsignacionTitular = async (
	designacionId: number,
	asignacionId: number,
	payload: EditarTitularDTO,
): Promise<void> => {
	await http.put(
		`/designaciones/${designacionId}/asignaciones/${asignacionId}`,
		payload,
	);
};

const actualizarAsignacionProvisional = async (
	designacionId: number,
	asignacionId: number,
	payload: EditarProvisionalDTO,
): Promise<void> => {
	await http.put(
		`/designaciones/${designacionId}/asignaciones/${asignacionId}`,
		payload,
	);
};

const eliminarAsignacion = async (
	designacionId: number,
	asignacionId: number,
): Promise<void> => {
	await http.delete(
		`/designaciones/${designacionId}/asignaciones/${asignacionId}`,
	);
};

/* =========================================================
   SERVICE
========================================================= */

export const designacionService = {
	// Queries
	listarDesignacionesAdministrativas,
	listarDesignacionesCursos,
	obtenerDesignacionDetalle,
	listarCargosPorDesignacion,
	obtenerCargoActivo,
	obtenerAsignacionDetalle,

	// Mutations
	crearDesignacionAdministrativa,
	crearDesignacionCurso,
	actualizarDesignacionAdministrativa,
	actualizarDesignacionCurso,
	cubrirConTitular,
	cubrirConProvisional,
	actualizarAsignacionTitular,
	actualizarAsignacionProvisional,
	eliminarAsignacion,
};
