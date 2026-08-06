import type { BreadcrumbResolver } from "@/app/layouts";

export const administracionTitles: Record<string, BreadcrumbResolver> = {
	"/administracion": [{ label: "Administración" }],

	"/administracion/licencias-estatutarias": [
		{
			label: "Administración",
			to: "/administracion",
		},
		{
			label: "Licencias estatutarias",
		},
	],
};
