import type { SortState } from "@/utils/types";
import type { EmpleadoEducativoFiltro } from "../types/empleadosEducativos.types";

export const FILTROS_EMPLEADOS: {
	label: string;
	value: EmpleadoEducativoFiltro;
}[] = [
	{ label: "Todos", value: "TODOS" },
	{ label: "Activos", value: "ACTIVOS" },
	{ label: "Inactivos", value: "INACTIVOS" },
];

export type SortType =
	| "NOMBRE_ASC"
	| "NOMBRE_DESC"
	| "APELLIDO_ASC"
	| "APELLIDO_DESC"
	| "FECHA_DESC"
	| "FECHA_ASC";

export function buildSortQuery(sort: SortState): string[] {
	const sorts: string[] = [];

	if (sort.nombre) {
		sorts.push(`nombre,${sort.nombre}`);
	}

	if (sort.apellido) {
		sorts.push(`apellido,${sort.apellido}`);
	}

	if (sort.fechaDeIngreso) {
		sorts.push(`fechaDeIngreso,${sort.fechaDeIngreso}`);
	}

	return sorts;
}
