import type { BreadcrumbResolver } from "@/app/layouts";
import { administracionTitles } from "@/features/administracion/constants";
import { asistenciaTitles } from "@/features/asistencia/constants";
import { cursoTitles } from "@/features/curso/constants";
import { designacionTitles } from "@/features/designacion/constants";
import { empleadoEducativoTitles } from "@/features/empleadoEducativo/constants";
import { licenciaTitles } from "@/features/licencia/constants";
import { materiaTitles } from "@/features/materia/constants";

export const routeTitles: Record<string, BreadcrumbResolver> = {
	"/dashboard": [{ label: "Dashboard" }],

	...empleadoEducativoTitles,
	...asistenciaTitles,
	...cursoTitles,
	...materiaTitles,
	...designacionTitles,
	...licenciaTitles,
	...administracionTitles,
};
