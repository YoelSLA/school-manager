import type { Params } from "react-router-dom";
import { academicoTitles } from "./academico.titles";
import { asistenciasTitles } from "./asistencias.titles";
import { designacionesTitles } from "./designaciones.titles";
import { empleadosEducativosTitles } from "./empleadosEducativos.titles";
import { licenciasTitles } from "./licencias.titles";

type BreadcrumbItem = {
	label: string;
	to?: string;
};

type BreadcrumbResolver =
	| BreadcrumbItem[]
	| ((params: Params<string>) => BreadcrumbItem[]);

export const routeTitles: Record<string, BreadcrumbResolver> = {
	"/dashboard": [{ label: "Dashboard" }],

	...empleadosEducativosTitles,
	...asistenciasTitles,
	...academicoTitles,
	...designacionesTitles,
	...licenciasTitles,
};
