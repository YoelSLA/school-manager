import type {
	NormativaDTO,
	PeriodoCerradoDTO,
	PeriodoCreateDTO,
} from "@/utils/types";
import type {
	EstadoDesignacion,
	RolEducativo,
} from "../../designaciones/types/designacion.types";
import type { EmpleadoEducativoMinimoDTO } from "../../empleadosEducativos/types/empleadosEducativos.types";

export type LicenciaCreateDTO = {
	periodo: PeriodoCreateDTO;
	tipoLicencia: string;
	descripcion?: string;
};

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
	periodo: PeriodoCerradoDTO;
};

export type CrearLicenciaForm = {
	empleadoId?: number;
	tipoLicencia: string;
	fechaDesde: string;
	fechaHasta: string;
	descripcion?: string;
};

// --------------------------------------------------------------------
export interface LicenciaDesignacionBaseDTO {
	designacionId: number;
	cupof: number;
	estado: EstadoDesignacion;
	rolEducativo: RolEducativo;
	tipo: "ADMINISTRATIVA" | "CURSO";
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
