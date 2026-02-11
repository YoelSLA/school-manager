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
