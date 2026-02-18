import type { BreadcrumbResolver } from "@/utils/types";

export const academicoTitles: Record<string, BreadcrumbResolver> = {
	"/cursos": [{ label: "Cursos" }],

	"/cursos/:cursoId": (params) => [
		{ label: "Cursos", to: "/cursos" },
		{ label: `#${params.cursoId}` },
	],

	"/materias": [{ label: "Materias" }],
};
