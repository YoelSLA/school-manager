import { http } from "@/shared/http";
import type { PageResponse } from "@/shared/types";
import type {
	CursoCreateDTO,
	CursoDetalleDTO,
	CursoFiltro,
	CursoSelectDTO,
} from "../types";

/* =========================================================
   QUERIES
========================================================= */

const listCursos = async (
	escuelaId: number,
	turno: CursoFiltro = "TODOS",
	page = 0,
	size = 10,
): Promise<PageResponse<CursoDetalleDTO>> => {
	const { data } = await http.get<PageResponse<CursoDetalleDTO>>(
		`/escuelas/${escuelaId}/cursos`,
		{
			params: {
				page,
				size,
				...(turno !== "TODOS" && { turno }),
			},
		},
	);

	return data;
};

const listCursosSelect = async (
	escuelaId: number,
): Promise<CursoSelectDTO[]> => {
	const { data } = await http.get<CursoSelectDTO[]>(
		`/escuelas/${escuelaId}/cursos/select`,
	);

	return data;
};

/* =========================================================
   MUTATIONS
========================================================= */

const createCurso = async (
	escuelaId: number,
	payload: CursoCreateDTO,
): Promise<CursoDetalleDTO> => {
	const { data } = await http.post<CursoDetalleDTO>(
		`/escuelas/${escuelaId}/cursos`,
		payload,
	);

	return data;
};

/* =========================================================
   SERVICE
========================================================= */

export const cursoService = {
	// Queries
	listCursos,
	listCursosSelect,

	// Mutations
	createCurso,
};
