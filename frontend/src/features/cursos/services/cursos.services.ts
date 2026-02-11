import { http } from "@/services/axios";
import type { CursoFiltro, CursoNombreDTO, CursoResponseDTO } from "../types/cursos.types";

export async function obtenerCursos(
	escuelaId?: number,
	turno?: CursoFiltro,
): Promise<CursoResponseDTO[]> {
	const response = await http.get<CursoResponseDTO[]>(
		`/escuelas/${escuelaId}/cursos`,
		{
			params: turno && turno !== "TODOS" ? { turno } : undefined,
		},
	);

	return response.data;
}

export async function obtenerNombresCursos(
	escuelaId?: number,
): Promise<CursoNombreDTO[]> {
	if (!escuelaId) {
		throw new Error("escuelaId es requerido para obtener cursos");
	}

	const response = await http.get<CursoNombreDTO[]>(
		`/escuelas/${escuelaId}/cursos/nombres`,
	);

	return response.data;
}