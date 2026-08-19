import type { BreadcrumbResolver } from "@/shared/components";

export const empleadoEducativoTitles: Record<string, BreadcrumbResolver> = {
	/* =========================================================
	   LISTADO
	========================================================= */

	"/empleadosEducativos": [
		{
			label: "Empleados educativos",
		},
	],

	/* =========================================================
	   CREAR
	========================================================= */

	"/empleadosEducativos/crear": [
		{
			label: "Empleados educativos",
			to: "/empleadosEducativos",
		},
		{
			label: "Crear personal",
		},
	],

	/* =========================================================
	   DETALLE
	========================================================= */

	"/empleadosEducativos/:empleadoId": (params) => {
		const empleadoId = params.empleadoId ?? "";

		return [
			{
				label: "Empleados educativos",
				to: "/empleadosEducativos",
			},
			{
				label: `#${empleadoId}`,
				to: `/empleadosEducativos/${empleadoId}`,
			},
		];
	},

	/* =========================================================
	   EDITAR
	========================================================= */

	"/empleadosEducativos/:empleadoId/editar": (params) => {
		const empleadoId = params.empleadoId ?? "";

		return [
			{
				label: "Empleados educativos",
				to: "/empleadosEducativos",
			},
			{
				label: `#${empleadoId}`,
				to: `/empleadosEducativos/${empleadoId}`,
			},
			{
				label: "Editar",
			},
		];
	},
};
