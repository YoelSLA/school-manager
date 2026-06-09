import type z from "zod";
import type { crearLicenciaSchema } from "@/features/licencias/form/crearLicencia.schema";
import type { cubrirDesignacionesConSuplenteSchema } from "@/features/licencias/form/cubrirDesignacionesConSuplente.schema";
import type { TipoLicencia } from "@/shared/types/ui.types";
import type { AsignacionDetalleDTO } from "./asignaciones.types";
import type {
	NormativaDTO,
	PeriodoCerradoDTO,
	PeriodoCreateDTO,
} from "./common.types";
import type { EmpleadoEducativoBasicoDTO } from "./empleadoEducativo.types";
import type { EstadoDesignacion, EstadoLicencia, RolEducativo } from "./enums";

export type LicenciaCreateFormValues = z.input<typeof crearLicenciaSchema>;

export type LicenciaCreateDTO = {
	tipoLicencia: string;
	periodo: PeriodoCreateDTO;
	descripcion?: string;
	designacionesIds: number[];
};

export type CubrirDesignacionesConSuplente = z.infer<
	typeof cubrirDesignacionesConSuplenteSchema
>;

export type LicenciaDetalleDTO = {
	id: number;
	empleado: EmpleadoEducativoBasicoDTO;
	normativa: NormativaDTO;
	descripcion: string;
	periodo: PeriodoCerradoDTO;
	estadoLicencia: EstadoLicencia;
};

export interface LicenciaResumenDTO {
	id: number;
	empleado: EmpleadoEducativoBasicoDTO;
	normativa: NormativaDTO;
	descripcion: string;
	periodo: PeriodoCerradoDTO;
	estadoLicencia: EstadoLicencia;
	diasRestantes: number;
}

export type TipoPeriodoLicencia = "ORIGINAL" | "RENOVACION";

export type LicenciaTimelineItemDTO = {
	id: number;
	tipo: TipoPeriodoLicencia;
	periodo: PeriodoCerradoDTO;
};

export interface LicenciaDesignacionBaseDTO {
	designacionId: number;
	cupof: number;
	estado: EstadoDesignacion;
	rolEducativo: RolEducativo;
	cobertura: AsignacionDetalleDTO | null;
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

export type LicenciaTimelineItem = LicenciaTimelineItemDTO;
export type LicenciaResumen = LicenciaResumenDTO;
export type LicenciaDetalle = LicenciaDetalleDTO;
export type LicenciaDesignacion = LicenciaDesignacionDTO;

export interface LicenciaEmpleadoEducativoRowDTO {
	id: number;
	tipo: TipoLicencia;
	periodo: PeriodoCerradoDTO;
	normativa: NormativaDTO;
	estado: EstadoLicencia;
	descripcion: string;
}
