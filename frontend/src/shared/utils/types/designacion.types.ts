import type z from "zod";
import type { createDesignacionAdministrativaSchema } from "@/features/designaciones/form/schemas/createDesignacionAdministrativa.schema";
import type { createDesignacionCursoSchema } from "@/features/designaciones/form/schemas/createDesignacionCurso.schema";
import type { updateDesignacionAdministrativaSchema } from "@/features/designaciones/form/schemas/updateDesignacionAdministrativa.schema";
import type { updateDesignacionCursoSchema } from "@/features/designaciones/form/schemas/updateDesignacionCurso.schema";
import type { AsignacionDetalleDTO } from "./asignaciones.types";
import type { FranjaHorariaMinimoDTO } from "./common.types";
import type { CursoNombreDTO } from "./curso.types";
import type { EstadoDesignacion, RolEducativo } from "./enums";
import type { MateriaNombreDTO } from "./materia.types";

export interface DesignacionAdministrativaAsignacionDTO {
	id: number;
	cupof: number;
	rolEducativo: RolEducativo;
	estadoDesignacion: EstadoDesignacion;
}

export interface DesignacionCursoAsignacionDTO {
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	materia: string;
	curso: string;
	orientacion: string;
}

export type DesignacionAdministrativaFormValues = z.input<
	typeof createDesignacionAdministrativaSchema
>;

export type DesignacionAdministrativaCreateDTO = z.infer<
	typeof createDesignacionAdministrativaSchema
>;

export type DesignacionCursoFormValues = z.input<
	typeof createDesignacionCursoSchema
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

export type DesignacionResumenDTO = {
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	rolEducativo: RolEducativo;
	franjasHorarias: FranjaHorariaMinimoDTO[];
};

export type DesignacionAdministrativaResumenDTO = DesignacionResumenDTO;

export type DesignacionCursoResumenDTO = DesignacionResumenDTO & {
	materia: string;
	curso: string;
	orientacion: string;
};

export type DesignacionResumen =
	| (DesignacionAdministrativaResumenDTO & { tipo: "ADMINISTRATIVA" })
	| (DesignacionCursoResumenDTO & { tipo: "CURSO" });

export type DesignacionDetalleBaseDTO = {
	id: number;
	cupof: number;
	estadoDesignacion: EstadoDesignacion;
	rolEducativo: RolEducativo;
	tipo: "ADMINISTRATIVA" | "CURSO";
	asignaciones: AsignacionDetalleDTO[];
	franjasHorarias: FranjaHorariaMinimoDTO[];
};

export type DesignacionDetalleDTO =
	| DesignacionAdministrativaDetalleDTO
	| DesignacionCursoDetalleDTO;

export type DesignacionAdministrativaDetalleDTO = DesignacionDetalleBaseDTO & {
	tipo: "ADMINISTRATIVA";
};

export type DesignacionCursoDetalleDTO = DesignacionDetalleBaseDTO & {
	tipo: "CURSO";
	materia: string;
	curso: string;
	orientacion: string;
};

export type DesignacionLicenciaAdministrativaItemDTO = {
	id: number;
	cupof: number;
	rolEducativo: string;
	tipoDesignacion: "ADMINISTRATIVA";
};

export type DesignacionLicenciaCursoItemDTO = {
	id: number;
	cupof: number;
	rolEducativo: string;
	tipoDesignacion: "CURSO";
	materia: MateriaNombreDTO;
	curso: CursoNombreDTO;
	orientacion: string;
};

export type DesignacionLicenciaItemDTO =
	| DesignacionLicenciaAdministrativaItemDTO
	| DesignacionLicenciaCursoItemDTO;
