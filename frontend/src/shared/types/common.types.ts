import type z from "zod";
import type { darBajaEmpleadoEducativo } from "@/features/empleadosEducativos/form/schemas/darBajaEmpleadoEducativo.schema";
import type { CausaBaja, Dia } from "./enums";

export type BajaDefinitivaDTO = z.infer<typeof darBajaEmpleadoEducativo>;

export interface BajaAsignacionDTO {
	fecha: string;
	causa: CausaBaja;
}

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
};

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
