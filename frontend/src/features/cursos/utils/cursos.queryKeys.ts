import type { CursoFiltro } from "../types/cursos.types";

export const cursosQueryKeys = {
	all: ["cursos"] as const,

	lists: () => [...cursosQueryKeys.all, "list"] as const,

	byEscuela: (escuelaId: number) =>
		[...cursosQueryKeys.lists(), "escuela", escuelaId] as const,

	byEscuelaYTurno: (escuelaId: number, turno?: CursoFiltro) =>
		[...cursosQueryKeys.byEscuela(escuelaId), turno ?? "TODOS"] as const,

	// 🔹 NUEVO: para selects / combos
	nombres: (escuelaId: number) =>
		[...cursosQueryKeys.all, "nombres", escuelaId] as const,
};
