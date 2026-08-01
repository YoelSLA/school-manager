import type { BreadcrumbResolver } from "@/app/layouts";

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

	"/licencias/:licenciaId/designaciones": (params) => [
		{ label: "Licencias", to: "/licencias" },
		{ label: `#${params.licenciaId}`, to: `/licencias/${params.licenciaId}` },
		{ label: "Designaciones" },
	],
};
