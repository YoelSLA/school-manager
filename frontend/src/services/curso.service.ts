import { http } from "@/shared/api/http";
import type {
	CursoCreateDTO,
	CursoDetalleDTO,
	CursoFiltro,
	PageResponse,
} from "@/shared/types";

export async function listarCursos(
	escuelaId: number,
	turno?: CursoFiltro,
	page: number = 0,
	size: number = 10,
): Promise<PageResponse<CursoDetalleDTO>> {
	const params: Record<string, string | number> = {
		page,
		size,
	};

	if (turno && turno !== "TODOS") {
		params.turno = turno;
	}

	const response = await http.get<PageResponse<CursoDetalleDTO>>(
		`/escuelas/${escuelaId}/cursos`,
		{ params },
	);

	return response.data;
}

export async function crearCurso(
	escuelaId: number,
	data: CursoCreateDTO,
): Promise<CursoDetalleDTO> {
	const response = await http.post<CursoDetalleDTO>(
		`/escuelas/${escuelaId}/cursos`,
		data,
	);

	return response.data;
}
