import type { BreadcrumbResolver } from "@/utils/types";

export const asistenciasTitles: Record<string, BreadcrumbResolver> = {
	"/asistencias": [{ label: "Asistencias" }],

	"/asistencias/:empleadoId": (params) => [
		{ label: "Asistencias", to: "/asistencias" },
		{ label: `Empleado #${params.empleadoId}` },
	],
};
