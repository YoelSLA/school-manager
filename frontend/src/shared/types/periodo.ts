export type PeriodoDTO = PeriodoAbiertoDTO | PeriodoCerradoDTO;

export interface PeriodoAbiertoDTO {
	tipo: "ABIERTO";
	fechaDesde: string;
}

export interface PeriodoCerradoDTO {
	tipo: "CERRADO";
	fechaDesde: string;
	fechaHasta: string;
	dias: number;
}

export type PeriodoCreateDTO =
	| {
			tipo: "ABIERTO";
			fechaDesde: string;
	  }
	| {
			tipo: "CERRADO";
			fechaDesde: string;
			fechaHasta: string;
	  };
