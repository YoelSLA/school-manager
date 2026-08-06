import type { Dia } from "./enums";

export type FranjaHorariaDTO = {
	dia: Dia;
	horaDesde: string;
	horaHasta: string;
};

type FranjaHorariaBaseDTO = {
	dia: Dia;
	horaDesde: string;
	horaHasta: string;
};

export type FranjaHorariaCreateDTO = FranjaHorariaBaseDTO;

export type FranjaHorariaMinimoDTO = FranjaHorariaBaseDTO;
