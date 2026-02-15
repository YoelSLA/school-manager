import type { Params } from "react-router-dom";

type BreadcrumbItem = {
	label: string;
	to?: string;
};

type BreadcrumbResolver =
	| BreadcrumbItem[]
	| ((params: Params<string>) => BreadcrumbItem[]);

export const asistenciasTitles: Record<string, BreadcrumbResolver> = {
	"/asistencias": [{ label: "Asistencias" }],

	"/asistencias/:empleadoId": (params) => [
		{ label: "Asistencias", to: "/asistencias" },
		{ label: `Empleado #${params.empleadoId}` },
	],
};
