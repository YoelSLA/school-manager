import type z from "zod";
import type {
	AsignacionActivaRowDTO,
	AsignacionDetalleDTO,
} from "@/features/asignacion/types";
import type { CursoDetalleDTO } from "@/features/curso/types";
import type { MateriaDetalleDTO } from "@/features/materia/types";
import type {
	EstadoDesignacion,
	FranjaHorariaMinimoDTO,
	RolEducativo,
} from "@/shared/types";
import type { createDesignacionAdministrativaSchema } from "../form/schemas/createDesignacionAdministrativa.schema";
import type { createDesignacionCursoSchema } from "../form/schemas/createDesignacionCurso.schema";
import type { updateDesignacionAdministrativaSchema } from "../form/schemas/updateDesignacionAdministrativa.schema";
import type { updateDesignacionCursoSchema } from "../form/schemas/updateDesignacionCurso.schema";

// REQUEST
export type DesignacionAdministrativaCreateDTO = z.infer<
	typeof createDesignacionAdministrativaSchema
>;

export type DesignacionCursoCreateDTO = z.infer<
	typeof createDesignacionCursoSchema
>;

export type DesignacionAdministrativaUpdateDTO = z.infer<
	typeof updateDesignacionAdministrativaSchema
>;

export type DesignacionCursoUpdateDTO = z.infer<
	typeof updateDesignacionCursoSchema
>;

// RESPONSE
interface DesignacionAsignacionBaseDTO {
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	rolEducativo: RolEducativo;
}

export interface DesignacionCursoAsignacionDTO
	extends DesignacionAsignacionBaseDTO {
	tipo: "CURSO";
	materia: string;
	curso: string;
	orientacion: string;
}

export interface DesignacionAdministrativaAsignacionDTO
	extends DesignacionAsignacionBaseDTO {
	tipo: "ADMINISTRATIVA";
}

export type DesignacionAsignacionDTO =
	| DesignacionCursoAsignacionDTO
	| DesignacionAdministrativaAsignacionDTO;
// ----------------------------------------------------------------------------------
interface DesignacionDetalleBaseDTO {
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	rolEducativo: RolEducativo;
	asignaciones: AsignacionDetalleDTO[];
	franjasHorarias: FranjaHorariaMinimoDTO[];
}

export interface DesignacionAdministrativaDetalleDTO
	extends DesignacionDetalleBaseDTO {
	tipo: "ADMINISTRATIVA";
}

export interface DesignacionCursoDetalleDTO extends DesignacionDetalleBaseDTO {
	tipo: "CURSO";
	curso: CursoDetalleDTO;
	materia: MateriaDetalleDTO;
	orientacion: string;
}

export type DesignacionDetalleDTO =
	| DesignacionAdministrativaDetalleDTO
	| DesignacionCursoDetalleDTO;

// ----------------------------------------------------------------------------------
interface BaseDesignacionRowDTO {
	id: number;
	cupof: number;
	cantidadFranjasHorarias: number;
	estadoDesignacion: EstadoDesignacion;
	rolEducativo: RolEducativo;
	asignacionActiva: AsignacionActivaRowDTO;
}

export interface DesignacionAdministrativaRowDTO extends BaseDesignacionRowDTO {
	tipo: "ADMINISTRATIVA";
}

export interface DesignacionCursoRowDTO extends BaseDesignacionRowDTO {
	tipo: "CURSO";
	nombreMateria: string;
	nombreCurso: string;
	orientacion: string;
}

export type DesignacionRowDTO =
	| DesignacionAdministrativaRowDTO
	| DesignacionCursoRowDTO;

// ----------------------------------------------------------------------------------
export interface DesignacionCursoFilterDTO {
	cursoId: number;
	materiaId: number;
	orientacion: string;
	estado: EstadoDesignacion;
}

export type DesignacionAdministrativaFormValues = z.input<
	typeof createDesignacionAdministrativaSchema
>;

export type DesignacionCursoFormValues = z.input<
	typeof createDesignacionCursoSchema
>;

// ----------------------------------------------------------------------------------
export interface DesignacionLicenciaBaseDTO {
	id: number;
	cupof: number;
	rolEducativo: string;
}

export interface DesignacionLicenciaAdministrativaDTO
	extends DesignacionLicenciaBaseDTO {
	tipoDesignacion: "ADMINISTRATIVA";
}

export interface DesignacionLicenciaCursoDTO
	extends DesignacionLicenciaBaseDTO {
	tipoDesignacion: "CURSO";
	materia: MateriaDetalleDTO;
	curso: CursoDetalleDTO;
	orientacion: string;
}

export type DesignacionLicenciaDTO =
	| DesignacionLicenciaAdministrativaDTO
	| DesignacionLicenciaCursoDTO;
