import type { Params } from "react-router-dom";

type BreadcrumbItem = {
	label: string;
	to?: string;
};

type BreadcrumbResolver =
	| BreadcrumbItem[]
	| ((params: Params<string>) => BreadcrumbItem[]);

export const licenciasTitles: Record<string, BreadcrumbResolver> = {
	"/licencias": [{ label: "Licencias" }],

	"/licencias/crear": [
		{ label: "Licencias", to: "/licencias" },
		{ label: "Crear licencia" },
	],

	"/licencias/:licenciaId": (params) => [
		{ label: "Licencias", to: "/licencias" },
		{ label: `#${params.licenciaId}` },
	],
};
