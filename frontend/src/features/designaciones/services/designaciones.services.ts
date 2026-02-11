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
): Promise<DesignacionAdministrativaResumenDTO[]> {
	const { data } = await http.get<DesignacionAdministrativaResumenDTO[]>(
		`/escuelas/${escuelaId}/designaciones/administrativas`,
	);

	return data;
}

export async function listarDesignacionesCursos(
	escuelaId: number,
): Promise<DesignacionCursoResumenDTO[]> {
	const { data } = await http.get<DesignacionCursoResumenDTO[]>(
		`/escuelas/${escuelaId}/designaciones/cursos`,
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

export async function obtenerCargoActivo(designacionId: number) {
	const { data } = await http.get(
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
