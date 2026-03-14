import type { DesignacionCursoFilter } from "../types/designacion.types";

export const designacionesQueryKeys = {
	all: ["designaciones"] as const,

	lists: () => [...designacionesQueryKeys.all, "list"] as const,

	detail: (designacionId: number) =>
		[...designacionesQueryKeys.all, "detail", designacionId] as const,

	/* =========================
		 CURSOS
	========================= */

	curso: {
		lists: () => [...designacionesQueryKeys.lists(), "curso"] as const,

		byEscuela: (
			escuelaId: number,
			page: number = 0,
			size: number = 10,
			filter?: DesignacionCursoFilter,
		) =>
			[
				...designacionesQueryKeys.curso.lists(),
				"escuela",
				escuelaId,
				page,
				size,
				filter,
			] as const,

		detail: (designacionId: number) =>
			[
				...designacionesQueryKeys.all,
				"curso",
				"detail",
				designacionId,
			] as const,
	},

	/* =========================
		 ADMINISTRATIVAS
	========================= */

	administrativa: {
		lists: () => [...designacionesQueryKeys.lists(), "administrativa"] as const,

		byEscuela: (escuelaId: number, page: number = 0, size: number = 10) =>
			[
				...designacionesQueryKeys.administrativa.lists(),
				"escuela",
				escuelaId,
			] as const,

		detail: (designacionId: number) =>
			[
				...designacionesQueryKeys.all,
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
			[...designacionesQueryKeys.all, designacionId, "cargos"] as const,

		list: (designacionId: number, estado?: string) =>
			[
				...designacionesQueryKeys.all,
				designacionId,
				"cargos",
				{ estado },
			] as const,

		activo: (designacionId: number) =>
			[...designacionesQueryKeys.all, designacionId, "cargo-activo"] as const,
	},
};
