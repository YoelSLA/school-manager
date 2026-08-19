import type { BreadcrumbResolver } from "@/shared/components";

export const cursoTitles: Record<string, BreadcrumbResolver> = {
	"/cursos": [{ label: "Cursos" }],

	"/cursos/:cursoId": (params) => [
		{ label: "Cursos", to: "/cursos" },
		{ label: `#${params.cursoId}` },
	],
};
