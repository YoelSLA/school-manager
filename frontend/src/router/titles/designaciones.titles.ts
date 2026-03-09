import type { BreadcrumbResolver } from "@/utils/types";

export const designacionesTitles: Record<string, BreadcrumbResolver> = {
	"/designaciones": [{ label: "Designaciones" }],

	"/designaciones/crear": [
		{ label: "Designaciones", to: "/designaciones" },
		{ label: "Crear asignación" },
	],

	"/designaciones/:designacionId": (params) => [
		{ label: "Designaciones", to: "/designaciones" },
		{ label: `#${params.designacionId}` },
	],

	"/designaciones/:designacionId/editar": (params) => [
		{ label: "Designaciones", to: "/designaciones" },
		{ label: `#${params.designacionId}`, to: `/designaciones/${params.designacionId}` },
		{ label: "Editar" },
	],
};