import type { BreadcrumbResolver } from "@/shared/components";

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
