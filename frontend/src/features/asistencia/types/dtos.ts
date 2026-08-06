import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import type { LicenciaResumenDTO } from "@/features/licencia/types";
import type { RolEducativo, TipoLicencia } from "@/shared/types";

/* ============================================================================
 * REQUEST
 * ========================================================================== */

export interface EliminarInasistenciasManualDTO {
	empleadoId: number;
	fechas: string[];
}

export interface RegistrarInasistenciasManualDTO {
	empleadoId: number;
	fechas: string[];
	tipoLicencia: string;
	observacion?: string;
}

/* ============================================================================
 * RESPONSE
 * ========================================================================== */

export interface AsistenciaDiaDTO {
	id: number | null;
	fecha: string;
	estadoAsistencia: EstadoAsistencia;
	origenAsistencia: OrigenAsistencia | null;
	codigoLicencia: string | null;
	licencia: LicenciaResumenDTO | null;
}

export interface AsistenciaEmpleadoResumenDTO {
	empleadoBasico: EmpleadoEducativoBasicoDTO;
	roles: RolEducativo[];
	faltasUltimoMes: number;
	licenciaMasFrecuente: TipoLicencia | null;
}

export interface EmpleadoAsistenciaItemDTO {
	id: number;
	cuil: string;
	apellido: string;
	nombre: string;
	roles: RolEducativo[];
}

export interface RolCountDTO {
	id: RolEducativo;
	label: string;
	count: number;
}

/* ============================================================================
 * TYPES
 * ========================================================================== */

export type EstadoAsistencia = "PRESENTE" | "AUSENTE";

export type OrigenAsistencia = "MANUAL" | "LICENCIA";
