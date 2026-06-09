import type z from "zod";
import type { createDesignacionAdministrativaSchema } from "@/features/designaciones/form/schemas/createDesignacionAdministrativa.schema";
import type { createDesignacionCursoSchema } from "@/features/designaciones/form/schemas/createDesignacionCurso.schema";
import type { updateDesignacionAdministrativaSchema } from "@/features/designaciones/form/schemas/updateDesignacionAdministrativa.schema";
import type { updateDesignacionCursoSchema } from "@/features/designaciones/form/schemas/updateDesignacionCurso.schema";
import type { CursoDetalleDTO } from "@/shared/types";
import type { MateriaDetalleDTO } from "@/shared/types/materia.types";
import type { AsignacionDetalleDTO } from "./asignaciones.types";
import type { FranjaHorariaMinimoDTO } from "./common.types";
import type { EstadoDesignacion, RolEducativo } from "./enums";

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
export interface DesignacionAsignacionDTO {
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
}

export interface DesignacionAdministrativaAsignacionDTO
	extends DesignacionAsignacionDTO {
	rolEducativo: RolEducativo;
}

export interface DesignacionCursoAsignacionDTO
	extends DesignacionAsignacionDTO {
	materia: string;
	curso: string;
	orientacion: string;
}
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
interface DesignacionCardDTO {
	id: number;
	cupof: number;
	cantidadFranjasHorarias: number;
	estadoDesignacion: EstadoDesignacion;
	rolEducativo: RolEducativo;
}

export interface DesignacionAdministrativaCardDTO extends DesignacionCardDTO {}

export interface DesignacionCursoCardDTO extends DesignacionCardDTO {
	nombreMateria: string;
	nombreCurso: string;
	orientacion: string;
}

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
