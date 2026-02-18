export const designacionesQueryKeys = {
	all: ["designaciones"] as const,

	detail: (designacionId: number) =>
		[...designacionesQueryKeys.all, designacionId] as const,

	curso: {
		all: () => [...designacionesQueryKeys.all, "curso"] as const,

		byEscuela: (escuelaId: number, page: number, size: number) =>
			[
				...designacionesQueryKeys.all,
				"curso",
				"escuela",
				escuelaId,
				page,
				size,
			] as const,

		detail: (designacionId: number) =>
			[...designacionesQueryKeys.all, "curso", designacionId] as const,
	},

	administrativa: {
		all: () => [...designacionesQueryKeys.all, "administrativa"] as const,

		byEscuela: (escuelaId: number, page: number, size: number) =>
			[
				...designacionesQueryKeys.all,
				"administrativa",
				"escuela",
				escuelaId,
				page,
				size,
			] as const,

		detail: (designacionId: number) =>
			[...designacionesQueryKeys.all, "administrativa", designacionId] as const,
	},

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
