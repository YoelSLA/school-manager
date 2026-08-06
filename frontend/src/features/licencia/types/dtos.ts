import type { AsignacionDetalleDTO } from "@/features/asignacion/types";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import type { LicenciaEstatutariaResponseDTO } from "@/features/licenciaEstatutaria/types";
import type {
	EstadoDesignacion,
	EstadoLicencia,
	PeriodoCerradoDTO,
	PeriodoCreateDTO,
	RolEducativo,
	TipoLicencia,
} from "@/shared/types";

/* ============================================================================
 * REQUEST
 * ========================================================================== */

export interface LicenciaCreateDTO {
	tipoLicencia: string;
	periodo: PeriodoCreateDTO;
	descripcion?: string;
	asignacionesIds: number[];
}

export interface CubrirDesignacionesRequest {
	empleadoSuplenteId: number;
	designacionIds: number[];
	fechaInicio: string;
}

export interface RenovarLicenciaDTO {
	nuevoHasta: string;
	tipoLicencia: string;
	descripcion?: string;
}

/* ============================================================================
 * RESPONSE
 * ========================================================================== */

export interface LicenciaDetalleDTO {
	id: number;
	empleado: EmpleadoEducativoBasicoDTO;
	licenciaEstatutaria: LicenciaEstatutariaResponseDTO;
	descripcion: string;
	periodo: PeriodoCerradoDTO;
	estadoLicencia: EstadoLicencia;
}

export interface LicenciaResumenDTO {
	id: number;
	empleado: EmpleadoEducativoBasicoDTO;
	licenciaEstatutaria: LicenciaEstatutariaResponseDTO;
	periodo: PeriodoCerradoDTO;
	estadoLicencia: EstadoLicencia;
	diasRestantes: number;
}

export type TipoPeriodoLicencia = "ORIGINAL" | "RENOVACION";

export interface LicenciaTimelineItemDTO {
	id: number;
	tipo: TipoPeriodoLicencia;
	periodo: PeriodoCerradoDTO;
}

interface LicenciaDesignacionBaseDTO {
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
