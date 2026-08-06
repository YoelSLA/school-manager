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

/* ============================================================================
 * REQUEST
 * ========================================================================== */

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

/* ============================================================================
 * RESPONSE - ROW
 * ========================================================================== */

export interface AsignacionActivaRowDTO {
	empleadoEducativo: EmpleadoEducativoBasicoDTO;
	situacionDeRevista: SituacionDeRevista;
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

/* ============================================================================
 * RESPONSE - DETALLE
 * ========================================================================== */

export interface AsignacionDetalleDTO {
	id: number;
	periodo: PeriodoDTO;
	situacionDeRevista: SituacionDeRevista;
	estadoAsignacion: EstadoAsignacion;
	bajaAsignacion: BajaAsignacionDTO | null;
	secuencia: number;
	empleadoEducativoBasico: EmpleadoEducativoBasicoDTO;
}

/* ============================================================================
 * RESPONSE - CARGO
 * ========================================================================== */

export type CargoDesignacionDTO =
	| CargoDesignacionCursoDTO
	| CargoDesignacionAdministrativaDTO;

export interface CargoDesignacionCursoDTO {
	tipo: "CURSO";
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	materia: string;
	curso: string;
	orientacion: string;
}

export interface CargoDesignacionAdministrativaDTO {
	tipo: "ADMINISTRATIVA";
	id: number;
	cupof: number;
	rolEducativo: RolEducativo;
	estadoDesignacion: EstadoDesignacion;
}

/* ============================================================================
 * RESPONSE - LICENCIA
 * ========================================================================== */

interface AsignacionLicenciaBaseDTO {
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
