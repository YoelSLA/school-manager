import type { SortState } from "@/utils/types";
import type {
	CausaBaja,
	EmpleadoEducativoFiltro,
} from "../types/empleadosEducativos.types";

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

export const CAUSA_BAJA_LABELS: Record<CausaBaja, string> = {
	RENUNCIA_POR_CAUSAS_PARTICULARES: "Renuncia por causas particulares",
	RENUNCIA_POR_CESE: "Renuncia por cese",
	JUBILACION: "Jubilación",
	FALLECIMIENTO: "Fallecimiento",
	OTRAS: "Otras",
};

export const CAUSAS_BAJA: { value: CausaBaja; label: string }[] = [
	{
		value: "RENUNCIA_POR_CAUSAS_PARTICULARES",
		label: "Renuncia por causas particulares",
	},
	{
		value: "RENUNCIA_POR_CESE",
		label: "Renuncia por cese",
	},
	{
		value: "JUBILACION",
		label: "Jubilación",
	},
	{
		value: "FALLECIMIENTO",
		label: "Fallecimiento",
	},
	{
		value: "OTRAS",
		label: "Otras",
	},
];
