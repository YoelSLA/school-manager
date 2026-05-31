import {
	CausaBaja,
	type EmpleadoEducativoFiltro,
	type SortState,
} from "@/shared/utils/types";

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

export const CAUSAS_BAJA: { value: CausaBaja; label: string }[] = [
	{
		value: CausaBaja.RENUNCIA,
		label: "Renuncia por causas particulares",
	},
	{
		value: CausaBaja.CESE_DE_FUNCIONES,
		label: "Cese de funciones",
	},
	{
		value: CausaBaja.JUBILACION,
		label: "Jubilación",
	},
	{
		value: CausaBaja.FALLECIMIENTO,
		label: "Fallecimiento",
	},
	{
		value: CausaBaja.PASE_A_PROVISIONAL,
		label: "Pase de suplente a provisional",
	},
	{
		value: CausaBaja.OTRA,
		label: "Otra",
	},
];
