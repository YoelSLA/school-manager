import { http } from "@/services/axios";
import type {
	CubrirTitularDTO,
	DesignacionAdministrativaCreateDTO,
	DesignacionAdministrativaResumenDTO,
	DesignacionCursoCreateDTO,
	DesignacionCursoDetalleDTO,
	DesignacionCursoResumenDTO,
	DesignacionDetalleDTO,
	EstadoCargo,
} from "../types/designacion.types";
import type { PageResponse } from "@/utils/types";
import { AsignacionDetalleDTO } from "@/features/asignaciones/types/asignacion.types";

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
	 Listar
====================== */

export async function listarDesignacionesAdministrativas(
	escuelaId: number,
	page: number = 0,
	size: number = 10,
): Promise<PageResponse<DesignacionAdministrativaResumenDTO>> {
	const { data } = await http.get<
		PageResponse<DesignacionAdministrativaResumenDTO>
	>(`/escuelas/${escuelaId}/designaciones/administrativas`, {
		params: { page, size },
	});

	return data;
}

export async function listarDesignacionesCursos(
	escuelaId: number,
	page: number = 0,
	size: number = 10,
): Promise<PageResponse<DesignacionCursoResumenDTO>> {
	const { data } = await http.get<PageResponse<DesignacionCursoResumenDTO>>(
		`/escuelas/${escuelaId}/designaciones/cursos`,
		{
			params: { page, size },
		},
	);

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
	payload: {
		empleadoId: number;
		fechaTomaPosesion: string;
	},
): Promise<void> => {
	await http.post(
		`/designaciones/${designacionId}/cubrir/provisional`,
		payload,
	);
};
