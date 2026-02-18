import type { BreadcrumbResolver } from "@/utils/types";
import { academicoTitles } from "./academico.titles";
import { asistenciasTitles } from "./asistencias.titles";
import { designacionesTitles } from "./designaciones.titles";
import { empleadosEducativosTitles } from "./empleadosEducativos.titles";
import { licenciasTitles } from "./licencias.titles";

export const routeTitles: Record<string, BreadcrumbResolver> = {
	"/dashboard": [{ label: "Dashboard" }],

	...empleadosEducativosTitles,
	...asistenciasTitles,
	...academicoTitles,
	...designacionesTitles,
	...licenciasTitles,
};
