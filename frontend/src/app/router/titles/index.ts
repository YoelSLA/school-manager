import type { BreadcrumbResolver } from "@/app/layouts";
import { asistenciaTitles } from "@/features/asistencia/constants";
import { designacionTitles } from "@/features/designacion/constants";
import { empleadoEducativoTitles } from "@/features/empleadoEducativo/constants";
import { licenciaTitles } from "@/features/licencia/constants";
import { academicoTitles } from "./academico.titles";

export const routeTitles: Record<string, BreadcrumbResolver> = {
	"/dashboard": [{ label: "Dashboard" }],

	...empleadoEducativoTitles,
	...asistenciaTitles,
	...academicoTitles,
	...designacionTitles,
	...licenciaTitles,
};
