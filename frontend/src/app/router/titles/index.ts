import type { BreadcrumbResolver } from "@/app/layouts";
import { asistenciasTitles } from "../../../features/asistencias/asistencias.titles";
import { designacionesTitles } from "../../../features/designaciones/designaciones.titles";
import { empleadosEducativosTitles } from "../../../features/empleadosEducativos/empleadosEducativos.titles";
import { licenciasTitles } from "../../../features/licencias/constants/titles";
import { academicoTitles } from "./academico.titles";

export const routeTitles: Record<string, BreadcrumbResolver> = {
	"/dashboard": [{ label: "Dashboard" }],

	...empleadosEducativosTitles,
	...asistenciasTitles,
	...academicoTitles,
	...designacionesTitles,
	...licenciasTitles,
};
