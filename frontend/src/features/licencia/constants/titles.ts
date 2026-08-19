import type { BreadcrumbResolver } from "@/shared/components";

export const licenciaTitles: Record<string, BreadcrumbResolver> = {
	/* =========================================================
	   LISTADO
	========================================================= */

	"/licencias": [
		{
			label: "Licencias",
		},
	],

	/* =========================================================
	   CREAR DESDE LICENCIAS
	========================================================= */

	"/licencias/crear": [
		{
			label: "Licencias",
			to: "/licencias",
		},
		{
			label: "Crear licencia",
		},
	],

	/* =========================================================
	   CREAR DESDE EMPLEADO
	========================================================= */

	"/empleadosEducativos/:empleadoId/licencias/crear": (params) => {
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
				label: "Crear licencia",
			},
		];
	},

	/* =========================================================
	   DETALLE
	========================================================= */

	"/licencias/:licenciaId": (params) => {
		const licenciaId = params.licenciaId ?? "";

		return [
			{
				label: "Licencias",
				to: "/licencias",
			},
			{
				label: `#${licenciaId}`,
			},
		];
	},

	/* =========================================================
	   DESIGNACIONES
	========================================================= */

	"/licencias/:licenciaId/designaciones": (params) => {
		const licenciaId = params.licenciaId ?? "";

		return [
			{
				label: "Licencias",
				to: "/licencias",
			},
			{
				label: `#${licenciaId}`,
				to: `/licencias/${licenciaId}`,
			},
			{
				label: "Designaciones",
			},
		];
	},
};
