import type { TipoLicencia } from "@/features/licencias/utils/tipoLicencia";
import type {
	EmpleadoEducativoBasicoDTO,
	LicenciaResumenDTO,
	RolEducativo,
} from ".";

export type EstadoAsistencia = "PRESENTE" | "AUSENTE";

export type OrigenAsistencia = "MANUAL" | "LICENCIA";

export interface AsistenciaDiaDTO {
	id: number | null;
	fecha: string;
	estadoAsistencia: EstadoAsistencia;
	origenAsistencia: OrigenAsistencia | null;
	tipoLicencia: string | null;
	licencia: LicenciaResumenDTO | null;
}

export type EmpleadoAsistenciaItem = {
	id: number;
	cuil: string;
	apellido: string;
	nombre: string;
	roles: RolEducativo[];
};

export type FiltrosAsistencias = {
	rolesSeleccionados: RolEducativo[];
	busqueda: string;
};

export type RolCountDTO = {
	id: RolEducativo;
	label: string;
	count: number;
};

export type RegistrarInasistenciasManualDTO = {
	empleadoId: number;
	fechas: string[];
	tipoLicencia: string;
	observacion?: string;
};

export type EliminarInasistenciasManualDTO = {
	empleadoId: number;
	fechas: string[];
};

export interface AsistenciaEmpleadoResumenDTO {
	empleadoBasico: EmpleadoEducativoBasicoDTO;
	roles: RolEducativo[];
	faltasUltimoMes: number;
	licenciaMasFrecuente: TipoLicencia | null;
}
