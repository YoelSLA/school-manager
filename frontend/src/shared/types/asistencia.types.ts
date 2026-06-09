import type {
	EmpleadoEducativoBasicoDTO,
	LicenciaResumenDTO,
	RolEducativo,
	TipoLicencia,
} from ".";

// REQUEST
export interface EliminarInasistenciasManualDTO {
	empleadoId: number;
	fechas: string[];
}

export type RegistrarInasistenciasManualDTO = {
	empleadoId: number;
	fechas: string[];
	tipoLicencia: string;
	observacion?: string;
};

// RESPONSE
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

export type EmpleadoAsistenciaItem = {
	id: number;
	cuil: string;
	apellido: string;
	nombre: string;
	roles: RolEducativo[];
};

export type RolCountDTO = {
	id: RolEducativo;
	label: string;
	count: number;
};

export type EstadoAsistencia = "PRESENTE" | "AUSENTE";
export type OrigenAsistencia = "MANUAL" | "LICENCIA";
