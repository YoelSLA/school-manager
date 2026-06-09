import type z from "zod";
import type { createProvisionalSchema } from "@/features/asignaciones/form/createProvisional.schema";
import type { createTitularSchema } from "@/features/asignaciones/form/createTitular.schema";
import type { updateProvisionalSchema } from "@/features/asignaciones/form/updateProvisional.schema";
import type { updateTitularSchema } from "@/features/asignaciones/form/updateTitular.schema";
import type {
	BajaAsignacionDTO,
	DesignacionAdministrativaAsignacionDTO,
	DesignacionCursoAsignacionDTO,
	EmpleadoEducativoBasicoDTO,
	EstadoAsignacion,
	PeriodoDTO,
} from ".";
import type {
	EstadoDesignacion,
	RolEducativo,
	SituacionDeRevista,
} from "./enums";

// REQUEST
export interface AsignacionProvisionalCreateDTO {
	empleadoId: number;
	fechaTomaPosesion: string;
	fechaCese: string;
	secuencia: number;
}

export interface AsignacionTitularCreateDTO {
	empleadoId: number;
	fechaTomaPosesion: string;
	secuencia: number;
}

export interface AsignacionUpdateDTO {
	empleadoId: number;
	fechaTomaPosesion: string;
	secuencia: number;
	fechaCese: string | null;
}

// RESPONSE
export interface AsignacionDetalleDTO {
	id: number;
	periodo: PeriodoDTO;
	situacionDeRevista: SituacionDeRevista;
	estadoAsignacion: EstadoAsignacion;
	bajaAsignacion: BajaAsignacionDTO;
	secuencia: number;
	empleadoEducativoBasico: EmpleadoEducativoBasicoDTO;
}

export interface BaseEmpleadoEducativoAsignacionRowDTO {
	id: number;
	periodo: PeriodoDTO;
	situacionDeRevista: SituacionDeRevista;
	estadoAsignacion: EstadoAsignacion;
	baja: BajaAsignacionDTO | null;
}

export type AsignacionEmpleadoEducativoRowDTO =
	| AsignacionCursoEmpleadoEducativoRowDTO
	| AsignacionAdministrativaEmpleadoEducativoRowDTO;

export interface AsignacionCursoEmpleadoEducativoRowDTO
	extends BaseEmpleadoEducativoAsignacionRowDTO {
	tipo: "CURSO";
	designacion: DesignacionCursoAsignacionDTO;
}

export interface AsignacionAdministrativaEmpleadoEducativoRowDTO
	extends BaseEmpleadoEducativoAsignacionRowDTO {
	tipo: "ADMINISTRATIVA";
	designacion: DesignacionAdministrativaAsignacionDTO;
}

export type CubrirTitularDTO = z.infer<typeof createTitularSchema>;

export type CubrirProvisionalDTO = z.infer<typeof createProvisionalSchema>;

export type EditarTitularDTO = z.infer<typeof updateTitularSchema>;

export type EditarProvisionalDTO = z.infer<typeof updateProvisionalSchema>;

export type EditarAsignacionDTO = {
	empleadoId: number;
	fechaTomaPosesion: string;
	fechaCese?: string | null;
};

export type CargoDesignacionDTO =
	| CargoDesignacionCursoDTO
	| CargoDesignacionAdministrativaDTO;

export type CargoDesignacionCursoDTO = {
	tipo: "CURSO";
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	materia: string;
	curso: string;
	orientacion: string;
};

export type CargoDesignacionAdministrativaDTO = {
	tipo: "ADMINISTRATIVA";
	id: number;
	cupof: number;
	rolEducativo: RolEducativo;
	estadoDesignacion: EstadoDesignacion;
};

export type CoberturaSeleccionada = {
	designacionId: number;
	secuencia: number;
	empleado: EmpleadoEducativoBasicoDTO | null;
	fechaTomaPosesion: string;
};
