import type { BreadcrumbResolver } from "@/shared/components";

export const asistenciaTitles: Record<string, BreadcrumbResolver> = {
	/* =========================================================
	   LISTADO
	========================================================= */

	"/asistencias": [
		{
			label: "Asistencias",
		},
	],

	/* =========================================================
	   DETALLE
	========================================================= */

	"/asistencias/:empleadoId/:anio/:mes": (params) => {
		const empleadoId = params.empleadoId ?? "";

		return [
			{
				label: "Asistencias",
				to: "/asistencias",
			},
			{
				label: `Empleado #${empleadoId}`,
			},
		];
	},
};
