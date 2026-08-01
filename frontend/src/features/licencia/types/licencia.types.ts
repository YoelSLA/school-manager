import type z from "zod";
import type { AsignacionDetalleDTO } from "@/features/asignacion/types";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import type { LicenciaEstatutariaResponseDTO } from "@/features/licenciaEstatutaria/types";
import type { TipoLicencia } from "@/shared/types/ui.types";
import type {
	PeriodoCerradoDTO,
	PeriodoCreateDTO,
} from "../../../shared/types/common.types";
import type {
	EstadoDesignacion,
	EstadoLicencia,
	RolEducativo,
} from "../../../shared/types/enums";
import type { cambiarCoberturaSchema } from "../form/schemas/cambiarCobertura.schema";
import type { createLicencia } from "../form/schemas/createLicencia.schema";
import type { cubrirDesignacionesConSuplenteSchema } from "../form/schemas/cubrirDesignacionesConSuplente.schema";

export type LicenciaCreateFormValues = z.input<typeof createLicencia>;
export type CambiarCoberturaDTO = z.infer<typeof cambiarCoberturaSchema>;

export type LicenciaCreateDTO = {
	tipoLicencia: string;
	periodo: PeriodoCreateDTO;
	descripcion?: string;
	asignacionesIds: number[];
};

export type CubrirDesignacionesConSuplente = z.infer<
	typeof cubrirDesignacionesConSuplenteSchema
>;

export type LicenciaDetalleDTO = {
	id: number;
	empleado: EmpleadoEducativoBasicoDTO;
	licenciaEstatutaria: LicenciaEstatutariaResponseDTO;
	descripcion: string;
	periodo: PeriodoCerradoDTO;
	estadoLicencia: EstadoLicencia;
};

export interface LicenciaResumenDTO {
	id: number;
	empleado: EmpleadoEducativoBasicoDTO;
	licenciaEstatutaria: LicenciaEstatutariaResponseDTO;
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
	licenciaEstatutaria: LicenciaEstatutariaResponseDTO;
	estado: EstadoLicencia;
	descripcion: string;
}

export interface LicenciaRowDTO {
	id: number;
	empleado: EmpleadoEducativoBasicoDTO;
	licenciaEstatutaria: LicenciaEstatutariaResponseDTO;
	periodo: PeriodoCerradoDTO;
	estadoLicencia: EstadoLicencia;
	diasRestantes: number;
}
