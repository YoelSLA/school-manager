import type { Params } from "react-router-dom";

type BreadcrumbItem = {
	label: string;
	to?: string;
};

type BreadcrumbResolver =
	| BreadcrumbItem[]
	| ((params: Params<string>) => BreadcrumbItem[]);

export const academicoTitles: Record<string, BreadcrumbResolver> = {
	"/cursos": [{ label: "Cursos" }],

	"/cursos/:cursoId": (params) => [
		{ label: "Cursos", to: "/cursos" },
		{ label: `#${params.cursoId}` },
	],

	"/materias": [{ label: "Materias" }],
};
