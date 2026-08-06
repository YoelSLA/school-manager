import type { BreadcrumbResolver } from "@/app/layouts";

export const cursoTitles: Record<string, BreadcrumbResolver> = {
	"/cursos": [{ label: "Cursos" }],

	"/cursos/:cursoId": (params) => [
		{ label: "Cursos", to: "/cursos" },
		{ label: `#${params.cursoId}` },
	],
};
