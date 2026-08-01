import type { BreadcrumbResolver } from "@/app/layouts";

export const asistenciasTitles: Record<string, BreadcrumbResolver> = {
	"/asistencias": [{ label: "Asistencias" }],

	"/asistencias/:empleadoId/:anio/:mes": (params, state) => {
		const empleadoId = params.empleadoId;

		return [
			{
				label: "Asistencias",
				to: "/asistencias",
			},
			{
				label:
					(empleadoId && state?.dynamicLabels?.[empleadoId]) ??
					`Empleado #${empleadoId}`,
			},
		];
	},
};
