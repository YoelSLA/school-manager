import type { CursoFiltro } from "../types/cursos.types";

export const cursosQueryKeys = {
	all: ["cursos"] as const,

	byEscuela: (
		escuelaId: number,
		filtro: CursoFiltro,
		page: number,
		size: number,
	) =>
		[...cursosQueryKeys.all, "escuela", escuelaId, filtro, page, size] as const,

	selects: () => [...cursosQueryKeys.all, "select"] as const,

	selectByEscuela: (escuelaId: number) =>
		[...cursosQueryKeys.selects(), "escuela", escuelaId] as const,

	detail: (cursoId: number) =>
		[...cursosQueryKeys.all, "detail", cursoId] as const,
};
