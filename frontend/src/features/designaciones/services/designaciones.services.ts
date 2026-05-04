import { http } from "@/axiosTemplate";
import type {
	AsignacionDetalleDTO,
	CubrirProvisionalDTO,
	CubrirTitularDTO,
	DesignacionAdministrativaCreateDTO,
	DesignacionAdministrativaResumenDTO,
	DesignacionCursoCreateDTO,
	DesignacionCursoDetalleDTO,
	DesignacionCursoFilter,
	DesignacionCursoResumenDTO,
	DesignacionDetalleDTO,
	EditarProvisionalDTO,
	EditarTitularDTO,
	EstadoCargo,
	PageResponse,
} from "@/utils/types";

/* ======================
	 Crear
====================== */

export async function crearDesignacionAdministrativa(
	escuelaId: number,
	data: DesignacionAdministrativaCreateDTO,
): Promise<void> {
	await http.post(`/escuelas/${escuelaId}/designaciones/administrativas`, data);
}

export async function crearDesignacionCurso(
	escuelaId: number,
	data: DesignacionCursoCreateDTO,
): Promise<void> {
	await http.post(`/escuelas/${escuelaId}/designaciones/cursos`, data);
}

/* ======================
	 Editar
====================== */

export async function actualizarDesignacionAdministrativa(
	designacionId: number,
	data: DesignacionAdministrativaCreateDTO,
): Promise<void> {
	await http.put(`/designaciones/${designacionId}/administrativa`, data);
}

export async function actualizarDesignacionCurso(
	designacionId: number,
	data: DesignacionCursoCreateDTO,
): Promise<void> {
	await http.put(`/designaciones/${designacionId}/curso`, data);
}

/* ======================
	 Listar
====================== */

export async function listarDesignacionesAdministrativas(
	escuelaId: number,
	page: number = 0,
	size: number = 10,
): Promise<PageResponse<DesignacionAdministrativaResumenDTO>> {
	console.log("➡️ ADMIN REQUEST PARAMS:", { escuelaId, page, size });

	const { data } = await http.get<
		PageResponse<DesignacionAdministrativaResumenDTO>
	>(`/escuelas/${escuelaId}/designaciones/administrativas`, {
		params: { page, size },
	});

	console.log("⬅️ ADMIN RESPONSE:", {
		page: data.page,          // 👈 importante
		totalPages: data.totalPages,
		contentIds: data.content?.map((d) => d.id),
	});

	return data;
}

export async function listarDesignacionesCursos(
	escuelaId: number,
	page: number = 0,
	size: number = 10,
	filter?: DesignacionCursoFilter,
): Promise<PageResponse<DesignacionCursoResumenDTO>> {
	console.log("➡️ CURSOS REQUEST PARAMS:", { escuelaId, page, size, filter });

	const { data } = await http.get<PageResponse<DesignacionCursoResumenDTO>>(
		`/escuelas/${escuelaId}/designaciones/cursos`,
		{
			params: {
				page,
				size,
				...filter,
			},
		},
	);

	console.log("⬅️ CURSOS RESPONSE:", {
		page: data.page,
		totalPages: data.totalPages,
		contentIds: data.content?.map((d) => d.id),
	});

	return data;
}

/* ======================
	 Detalle
====================== */

export const obtenerDesignacionDetalle = async (
	designacionId: number,
): Promise<DesignacionDetalleDTO> => {
	const { data } = await http.get<DesignacionCursoDetalleDTO>(
		`/designaciones/${designacionId}`,
	);

	return data;
};

/* ======================
	 Cargos
====================== */

export async function listarCargosPorDesignacion(
	designacionId: number,
	estado?: EstadoCargo,
) {
	const { data } = await http.get(`/designaciones/${designacionId}/cargos`, {
		params: estado ? { estado } : undefined,
	});

	return data;
}

export async function obtenerCargoActivo(
	designacionId: number,
): Promise<AsignacionDetalleDTO> {
	const { data } = await http.get<AsignacionDetalleDTO>(
		`/designaciones/${designacionId}/cargo-activo`,
	);

	return data;
}

/* ======================
	 Cubrir
====================== */

export const cubrirConTitular = async (
	designacionId: number,
	payload: CubrirTitularDTO,
): Promise<void> => {
	await http.post(`/designaciones/${designacionId}/cubrir/titular`, payload);
};

export const cubrirConProvisional = async (
	designacionId: number,
	payload: CubrirProvisionalDTO,
): Promise<void> => {
	await http.post(
		`/designaciones/${designacionId}/cubrir/provisional`,
		payload,
	);
};

/* ======================
	Editar asignación
====================== */

export function actualizarAsignacionTitular(
	designacionId: number,
	asignacionId: number,
	payload: EditarTitularDTO
) {
	return http.put(
		`/designaciones/${designacionId}/asignaciones/${asignacionId}`,
		payload
	);
}

export function actualizarAsignacionProvisional(
	designacionId: number,
	asignacionId: number,
	payload: EditarProvisionalDTO
) {
	return http.put(
		`/designaciones/${designacionId}/asignaciones/${asignacionId}`,
		payload
	);
}

/* ======================
	Editar asignación
====================== */

export function eliminarAsignacion(
	designacionId: number,
	asignacionId: number,
) {
	return http.delete(`/designaciones/${designacionId}/asignaciones/${asignacionId}`);
}

/* ======================
	 Asignación detalle
====================== */

export async function obtenerAsignacionDetalle(
	designacionId: number,
	asignacionId: number,
): Promise<AsignacionDetalleDTO> {
	const { data } = await http.get<AsignacionDetalleDTO>(
		`/designaciones/${designacionId}/asignaciones/${asignacionId}`,
	);

	return data;
}
