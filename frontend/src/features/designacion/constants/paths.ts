export const designacionPaths = {
	base: "/designaciones",

	create: "/designaciones/crear",

	detail: (designacionId: number | string) => `/designaciones/${designacionId}`,

	edit: (designacionId: number | string) =>
		`/designaciones/${designacionId}/editar`,
};
