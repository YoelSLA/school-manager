import type { DesignacionFiltro } from "../types";

export const FILTROS_DESIGNACIONES: {
	value: DesignacionFiltro;
	label: string;
}[] = [
	{ value: "ADMIN", label: "Administrativas" },
	{ value: "CURSO", label: "Cursos" },
];
