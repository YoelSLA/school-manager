import type z from "zod";
import type { CursoDetalleDTO } from "@/features/curso/types";
import type { DesignacionAsignacionDTO } from "@/features/designacion/types";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import type { MateriaDetalleDTO } from "@/features/materia/types";
import type {
	BajaAsignacionDTO,
	EstadoAsignacion,
	EstadoDesignacion,
	PeriodoDTO,
	RolEducativo,
	SituacionDeRevista,
} from "@/shared/types";
import type { createProvisionalSchema } from "../form/schemas/createProvisional.schema";
import type { createTitularSchema } from "../form/schemas/createTitular.schema";
import type { updateProvisionalSchema } from "../form/schemas/updateProvisional.schema";
import type { updateTitularSchema } from "../form/schemas/updateTitular.schema";

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

export interface AsignacionActivaRowDTO {
	empleadoEducativo: EmpleadoEducativoBasicoDTO;
	situacionDeRevista: SituacionDeRevista;
}

// RESPONSE
export interface AsignacionDetalleDTO {
	id: number;
	periodo: PeriodoDTO;
	situacionDeRevista: SituacionDeRevista;
	estadoAsignacion: EstadoAsignacion;
	bajaAsignacion: BajaAsignacionDTO | null;
	secuencia: number;
	empleadoEducativoBasico: EmpleadoEducativoBasicoDTO;
}

export interface AsignacionEmpleadoEducativoRowDTO {
	id: number;
	periodo: PeriodoDTO;
	situacionDeRevista: SituacionDeRevista;
	estadoAsignacion: EstadoAsignacion;
	bajaAsigacion: BajaAsignacionDTO | null;
	secuencia: number;
	designacion: DesignacionAsignacionDTO;
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

export interface AsignacionLicenciaBaseDTO {
	id: number;
	secuencia: number;
	cupof: number;
	rolEducativo: RolEducativo;
	situacionDeRevista: SituacionDeRevista;
	periodo: PeriodoDTO;
	tipo: "ADMINISTRATIVA" | "CURSO";
}

export interface AsignacionLicenciaAdministrativaDTO
	extends AsignacionLicenciaBaseDTO {
	tipo: "ADMINISTRATIVA";
}

export interface AsignacionLicenciaCursoDTO extends AsignacionLicenciaBaseDTO {
	tipo: "CURSO";
	materia: MateriaDetalleDTO;
	curso: CursoDetalleDTO;
	orientacion: string;
}

export type AsignacionLicenciaDTO =
	| AsignacionLicenciaAdministrativaDTO
	| AsignacionLicenciaCursoDTO;
