import type {
	FranjaHorariaCreateDTO,
	FranjaHorariaMinimoDTO,
} from "@/utils/types";
import type {
	AsignacionDetalleDTO,
	CaracteristicaAsignacion,
} from "../../asignaciones/types/asignacion.types";

// --------------------------------------------------------------------

type DesignacionCreateDTO = {
	cupof: number;
	franjasHorarias: FranjaHorariaCreateDTO[];
};

export type DesignacionAdministrativaCreateDTO = DesignacionCreateDTO & {
	rolEducativo: RolEducativo;
};

export type DesignacionCursoCreateDTO = DesignacionCreateDTO & {
	materiaId: number;
	cursoId: number;
	orientacion: string;
};

// --------------------------------------------------------------------

type DesignacionResumenDTO = {
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	rolEducativo: RolEducativo;
	franjasHorarias: FranjaHorariaMinimoDTO[];
};

export type DesignacionAdministrativaResumenDTO = DesignacionResumenDTO;

export type DesignacionCursoResumenDTO = DesignacionResumenDTO & {
	materia: string;
	curso: string;
	orientacion: string;
};

// --------------------------------------------------------------------
export type DesignacionDetalleBaseDTO = {
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	rolEducativo: RolEducativo;
	tipo: "ADMINISTRATIVA" | "CURSO";
	asignaciones: AsignacionDetalleDTO[];
	franjasHorarias: FranjaHorariaMinimoDTO[];
};

export type DesignacionAdministrativaDetalleDTO = DesignacionDetalleBaseDTO & {
	tipo: "ADMINISTRATIVA";
};

export type DesignacionCursoDetalleDTO = DesignacionDetalleBaseDTO & {
	tipo: "CURSO";
	materia: string;
	curso: string;
	orientacion: string;
};

export type DesignacionDetalleDTO =
	| DesignacionAdministrativaDetalleDTO
	| DesignacionCursoDetalleDTO;

// --------------------------------------------------------------------

export type DesignacionMinimaDTO = {
	id: number;
	cupof: number;
	rolEducativo: RolEducativo;
};

export type DesignacionAdministrativaMinimaDTO = DesignacionMinimaDTO;

export type DesignacionCursoMinimaDTO = DesignacionMinimaDTO & {
	materia: string;
	curso: string;
};

// --------------------------------------------------------------------
export type CubrirTitularDTO = {
	empleadoId: number;
	fechaTomaPosesion: string;
	caracteristica?: CaracteristicaAsignacion;
};

export type CubrirProvisionalDTO = {
	empleadoId: number;
	fechaTomaPosesion: string;
};

export type Franja = {
	dia: "LUNES" | "MARTES" | "MIERCOLES" | "JUEVES" | "VIERNES";
	horaDesde: string;
	horaHasta: string;
};

export type FormWithFranjas = {
	franjasHorarias: Franja[];
};

export enum RolEducativo {
	DIRECCION = "DIRECCION",
	VICEDIRECCION = "VICEDIRECCION",
	SECRETARIA = "SECRETARIA",
	ORIENTACION_EDUCACIONAL = "ORIENTACION_EDUCACIONAL",
	ORIENTACION_SOCIAL = "ORIENTACION_SOCIAL",
	BIBLIOTECARIO = "BIBLIOTECARIO",
	PRECEPTORIA = "PRECEPTORIA",
	DOCENTE = "DOCENTE",
	AUXILIAR = "AUXILIAR",
	ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL = "ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL",
}


export enum EstadoDesignacion {
	CUBIERTA = "CUBIERTA",
	LICENCIA = "LICENCIA",
	VACANTE = "VACANTE",
}

export type DesignacionResumen =
	| (DesignacionAdministrativaResumenDTO & { tipo: "ADMINISTRATIVA" })
	| (DesignacionCursoResumenDTO & { tipo: "CURSO" });

export type DesignacionFiltro = "ADMIN" | "CURSO";

export type TipoDesignacion = "ADMIN" | "CURSO";

export type DesignacionBaseForm = {
	cupof: number;
	franjasHorarias: {
		dia: string;
		horaDesde: string;
		horaHasta: string;
	}[];
};

export type EstadoCargo = "LICENCIA" | "BAJA" | "FINALIZADA" | "PENDIENTE";
