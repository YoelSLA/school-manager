import type { Params } from "react-router-dom";

type BreadcrumbItem = {
	label: string;
	to?: string;
};

type BreadcrumbResolver =
	| BreadcrumbItem[]
	| ((params: Params<string>) => BreadcrumbItem[]);

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
};
