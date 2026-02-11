import type { EmpleadoEducativoFiltro } from "../types/empleadosEducativos.types";

export const FILTROS_EMPLEADOS: {
	label: string;
	value: EmpleadoEducativoFiltro;
}[] = [
	{ label: "Todos", value: "TODOS" },
	{ label: "Activos", value: "ACTIVOS" },
	{ label: "Inactivos", value: "INACTIVOS" },
];
