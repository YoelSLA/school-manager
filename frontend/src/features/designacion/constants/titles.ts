import type { BreadcrumbResolver } from "@/shared/components";

export const designacionTitles: Record<string, BreadcrumbResolver> = {
	/* =========================================================
	   LISTADO
	========================================================= */

	"/designaciones": [
		{
			label: "Designaciones",
		},
	],

	/* =========================================================
	   CREAR
	========================================================= */

	"/designaciones/crear": [
		{
			label: "Designaciones",
			to: "/designaciones",
		},
		{
			label: "Crear asignación",
		},
	],

	/* =========================================================
	   DETALLE
	========================================================= */

	"/designaciones/:designacionId": (params) => {
		const designacionId = params.designacionId ?? "";

		return [
			{
				label: "Designaciones",
				to: "/designaciones",
			},
			{
				label: `#${designacionId}`,
			},
		];
	},

	/* =========================================================
	   EDITAR
	========================================================= */

	"/designaciones/:designacionId/editar": (params) => {
		const designacionId = params.designacionId ?? "";

		return [
			{
				label: "Designaciones",
				to: "/designaciones",
			},
			{
				label: `#${designacionId}`,
				to: `/designaciones/${designacionId}`,
			},
			{
				label: "Editar",
			},
		];
	},
};
