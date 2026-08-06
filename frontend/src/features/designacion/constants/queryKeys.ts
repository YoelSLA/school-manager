import type { DesignacionCursoFilter } from "../types";

export const designacionQueryKeys = {
	all: ["designaciones"] as const,

	lists: () => [...designacionQueryKeys.all, "list"] as const,

	detail: (designacionId: number) =>
		[...designacionQueryKeys.all, "detail", designacionId] as const,

	/* =========================
		 CURSOS
	========================= */

	curso: {
		lists: () => [...designacionQueryKeys.lists(), "curso"] as const,

		byEscuela: (
			escuelaId: number,
			page: number = 0,
			size: number = 10,
			filter?: DesignacionCursoFilter,
		) =>
			[
				...designacionQueryKeys.curso.lists(),
				"escuela",
				escuelaId,
				page,
				size,
				filter?.cursoId ? Number(filter.cursoId) : null,
				filter?.materiaId ? Number(filter?.materiaId) : null,
				filter?.orientacion ?? null,
				filter?.estado ?? null,
			] as const,

		detail: (designacionId: number) =>
			[...designacionQueryKeys.all, "curso", "detail", designacionId] as const,
	},

	/* =========================
		 ADMINISTRATIVAS
	========================= */

	administrativa: {
		lists: () => [...designacionQueryKeys.lists(), "administrativa"] as const,

		byEscuela: (escuelaId: number, page: number = 0, size: number = 10) =>
			[
				...designacionQueryKeys.administrativa.lists(),
				"escuela",
				escuelaId,
				page,
				size,
			] as const,

		detail: (designacionId: number) =>
			[
				...designacionQueryKeys.all,
				"administrativa",
				"detail",
				designacionId,
			] as const,
	},

	/* =========================
		 CARGOS
	========================= */

	cargos: {
		all: (designacionId: number) =>
			[...designacionQueryKeys.all, designacionId, "cargos"] as const,

		list: (designacionId: number, estado?: string) =>
			[
				...designacionQueryKeys.all,
				designacionId,
				"cargos",
				{ estado },
			] as const,

		activo: (designacionId: number) =>
			[...designacionQueryKeys.all, designacionId, "cargo-activo"] as const,
	},
};
