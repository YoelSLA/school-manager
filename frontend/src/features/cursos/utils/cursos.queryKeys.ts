import type { CursoFiltro } from "../types/cursos.types";

export const cursosQueryKeys = {
	all: ["cursos"] as const,

	byEscuelaYTurno: (
		escuelaId: number,
		turno: CursoFiltro | undefined,
		page: number,
		size: number,
	) =>
		[
			...cursosQueryKeys.all,
			"escuela",
			escuelaId,
			turno ?? "TODOS",
			page,
			size,
		] as const,

	nombres: (escuelaId: number) =>
		[...cursosQueryKeys.all, "nombres", escuelaId] as const,
};
