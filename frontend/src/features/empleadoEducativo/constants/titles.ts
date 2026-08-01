import type { BreadcrumbResolver } from "@/app/layouts";

export const empleadosEducativosTitles: Record<string, BreadcrumbResolver> = {
	"/empleadosEducativos": [{ label: "Empleados educativos" }],

	"/empleadosEducativos/crear": [
		{ label: "Empleados educativos", to: "/empleadosEducativos" },
		{ label: "Crear personal" },
	],

	"/empleadosEducativos/:empleadoId": (params) => [
		{ label: "Empleados educativos", to: "/empleadosEducativos" },
		{
			label: `#${params.empleadoId}`,
			to: `/empleadosEducativos/${params.empleadoId}`,
		},
	],

	"/empleadosEducativos/:empleadoId/editar": (params) => [
		{ label: "Empleados educativos", to: "/empleadosEducativos" },
		{
			label: `#${params.empleadoId}`,
			to: `/empleadosEducativos/${params.empleadoId}`,
		},
		{ label: "Editar" },
	],
};
