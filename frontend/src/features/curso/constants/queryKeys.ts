import type { CursoFiltro } from "@/shared/types";

export const cursoQueryKeys = {
	all: ["cursos"] as const,

	byEscuelaYTurno: (
		escuelaId: number,
		turno: CursoFiltro | undefined,
		page: number,
		size: number,
	) =>
		[
			...cursoQueryKeys.all,
			"escuela",
			escuelaId,
			turno ?? "TODOS",
			page,
			size,
		] as const,

	nombres: (escuelaId: number) =>
		[...cursoQueryKeys.all, "nombres", escuelaId] as const,

	select: (escuelaId: number) => ["cursos", escuelaId, "select"] as const,
};
