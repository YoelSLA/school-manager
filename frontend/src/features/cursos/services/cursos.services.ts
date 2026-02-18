import { http } from "@/services/axios";
import type {
	CrearCursoDTO,
	CursoFiltro,
	CursoNombreDTO,
	CursoResponseDTO,
} from "../types/cursos.types";
import type { PageResponse } from "@/utils/types";

export async function obtenerCursos(
	escuelaId: number,
	turno?: CursoFiltro,
	page: number = 0,
	size: number = 10,
): Promise<PageResponse<CursoResponseDTO>> {
	const params: Record<string, string | number> = {
		page,
		size,
	};

	if (turno && turno !== "TODOS") {
		params.turno = turno;
	}

	const response = await http.get<PageResponse<CursoResponseDTO>>(
		`/escuelas/${escuelaId}/cursos`,
		{ params },
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

export async function crearCurso(
	escuelaId: number,
	data: CrearCursoDTO,
): Promise<CursoResponseDTO> {
	const response = await http.post<CursoResponseDTO>(
		`/escuelas/${escuelaId}/cursos`,
		data,
	);

	return response.data;
}
