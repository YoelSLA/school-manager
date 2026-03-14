import type {
	NormativaDTO,
	PeriodoAbiertoDTO,
	PeriodoCerradoDTO,
} from "@/utils/types";
import type {
	EstadoDesignacion,
	RolEducativo,
} from "../../designaciones/types/designacion.types";
import type { EmpleadoEducativoMinimoDTO } from "../../empleadosEducativos/types/empleadosEducativos.types";

export type LicenciaDetalleDTO = {
	id: number;
	empleado: EmpleadoEducativoMinimoDTO;
	normativa: NormativaDTO;
	descripcion: string;
	periodo: PeriodoCerradoDTO;
	estadoLicencia: EstadoLicencia;
	designaciones: LicenciaDesignacionDTO[];
	timeline: LicenciaTimelineItemDTO[];
};

export interface LicenciaResumenDTO {
	id: number;
	empleado: EmpleadoEducativoMinimoDTO;
	normativa: NormativaDTO;
	descripcion: string;
	periodo: PeriodoCerradoDTO;
	estadoLicencia: EstadoLicencia;
}

export type TipoPeriodoLicencia = "ORIGINAL" | "RENOVACION";

export type LicenciaTimelineItemDTO = {
	id: number;
	tipo: TipoPeriodoLicencia;
	periodo: PeriodoAbiertoDTO;
};

// --------------------------------------------------------------------
export interface LicenciaDesignacionBaseDTO {
	designacionId: number;
	cupof: number;
	estado: EstadoDesignacion;
	rolEducativo: RolEducativo;
}

export interface LicenciaDesignacionAdministrativaDTO
	extends LicenciaDesignacionBaseDTO {
	tipo: "ADMINISTRATIVA";
}

export interface LicenciaDesignacionCursoDTO
	extends LicenciaDesignacionBaseDTO {
	tipo: "CURSO";
	materia: string;
	curso: string;
	orientacion: string;
}

export type LicenciaDesignacionDTO =
	| LicenciaDesignacionAdministrativaDTO
	| LicenciaDesignacionCursoDTO;

export type CubrirDesignacionesRequest = {
	empleadoSuplenteId: number;
	designacionIds: number[];
	fechaInicio: string;
};

export type RenovarLicenciaDTO = {
	nuevoHasta: string;
	tipoLicencia: string;
	descripcion?: string;
};

export enum EstadoLicencia {
	CUBIERTA = "CUBIERTA",
	DESCUBIERTA = "DESCUBIERTA",
	INACTIVA = "INACTIVA",
}

export type LicenciaTimelineItem = LicenciaTimelineItemDTO;
export type LicenciaResumen = LicenciaResumenDTO
export type LicenciaDetalle = LicenciaDetalleDTO;
export type LicenciaDesignacion = LicenciaDesignacionDTO;

export type DesignacionLicenciaAdministrativaItemDTO = {
	id: number;
	cupof: number;
	rolEducativo: string;
	tipoDesignacion: "ADMINISTRATIVA";
};

export type DesignacionLicenciaCursoItemDTO = {
	id: number;
	cupof: number;
	rolEducativo: string;
	tipoDesignacion: "CURSO";
	materia: MateriaNombreDTO;
	curso: CursoNombreDTO;
	orientacion: string;

};

export type DesignacionLicenciaItemDTO =
	| DesignacionLicenciaAdministrativaItemDTO
	| DesignacionLicenciaCursoItemDTO;

export type MateriaNombreDTO = {
	id: number;
	nombre: string;
};

export type CursoNombreDTO = {
	id: number;
	division: string;
	turno: string
};

export type LicenciaCreateDTO = {
	tipoLicencia: string;
	periodo: {
		fechaDesde: string;
		fechaHasta?: string | null;
	};
	descripcion?: string;
	designacionesIds: number[];
};

