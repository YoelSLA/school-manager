import type { BreadcrumbResolver } from "@/utils/types";

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
