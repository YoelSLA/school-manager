type FranjaHorariaBaseDTO = {
	dia: string;
	horaDesde: string;
	horaHasta: string;
};

export type FranjaHorariaCreateDTO = FranjaHorariaBaseDTO;

export type FranjaHorariaMinimoDTO = FranjaHorariaBaseDTO;

// -------------------------------------------------------------------

export type PeriodoCreateDTO = {
	fechaDesde: string;
	fechaHasta?: string | null;
};

type PeriodoDTO = {
	fechaDesde: string;
	dias: number;
};

export type PeriodoAbiertoDTO = PeriodoDTO & {
	fechaHasta: string | null;
};

export type PeriodoCerradoDTO = PeriodoDTO & {
	fechaHasta: string;
};

// -------------------------------------------------------------------

export type NormativaDTO = {
	codigo: string;
	articulo: string;
	descripcion: string;
};

export type PageResponse<T> = {
	content: T[];
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
	first: boolean;
	last: boolean;
	hasNext: boolean;
	hasPrevious: boolean;
	sort: string;
};

export type SortDirection = "asc" | "desc";

export type SortState = {
	nombre?: SortDirection;
	apellido?: SortDirection;
	fechaDeIngreso?: SortDirection;
};
