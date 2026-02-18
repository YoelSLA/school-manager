import type {
	CursoFiltro,
	CursoNombreDTO,
	CursoResponseDTO,
} from "../types/cursos.types";

export const FILTROS_CURSOS: {
	label: string;
	value: CursoFiltro;
}[] = [
	{ label: "Todos", value: "TODOS" },
	{ label: "Mañana", value: "MANIANA" },
	{ label: "Tarde", value: "TARDE" },
	{ label: "Vespertino", value: "VESPERTINO" },
];

export const filtrosCursos: Record<
	CursoFiltro,
	(curso: CursoResponseDTO) => boolean
> = {
	TODOS: () => true,
	MANIANA: (curso) => curso.turno === "MANIANA",
	TARDE: (curso) => curso.turno === "TARDE",
	VESPERTINO: (curso) => curso.turno === "VESPERTINO",
};

export const TURNO_LABELS: Record<string, string> = {
	MANIANA: "Mañana",
	TARDE: "Tarde",
	NOCHE: "Noche",
};

export const ORDEN_TURNO: Record<string, number> = {
	MANIANA: 1,
	TARDE: 2,
	VESPERTINO: 3,
};

function parseDivision(value: string) {
	// soporta: "1°1", "1 ° 1", "10°2"
	const match = value.match(/(\d+)\s*°\s*(\d+)/);

	if (!match) {
		return { anio: 99, division: 99 };
	}

	return {
		anio: Number(match[1]),
		division: Number(match[2]),
	};
}

export function ordenarCursos(a: CursoNombreDTO, b: CursoNombreDTO) {
	// 1. Turno
	const turnoA = ORDEN_TURNO[a.turno] ?? 99;
	const turnoB = ORDEN_TURNO[b.turno] ?? 99;

	if (turnoA !== turnoB) {
		return turnoA - turnoB;
	}

	// 2. División (desde string "1°1")
	const aDiv = parseDivision(a.division);
	const bDiv = parseDivision(b.division);

	if (aDiv.anio !== bDiv.anio) {
		return aDiv.anio - bDiv.anio;
	}

	return aDiv.division - bDiv.division;
}

export const TURNO_OPTIONS = [
	{ value: "MANIANA", label: "Mañana" },
	{ value: "TARDE", label: "Tarde" },
	{ value: "VESPERTINO", label: "Vespertino" },
] as const;
