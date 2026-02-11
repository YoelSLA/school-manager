import type z from "zod";
import type { crearDesignacionAdministrativaSchema } from "./schemas/crearDesignacionAdministrativa.schema";
import type { crearDesignacionCursoSchema } from "./schemas/crearDesignacionCurso.schema";

export type DesignacionAdministrativaFormInput = z.input<
	typeof crearDesignacionAdministrativaSchema
>;

export type DesignacionAdministrativaFormOutput = z.output<
	typeof crearDesignacionAdministrativaSchema
>;

export type DesignacionCursoFormInput = z.input<
	typeof crearDesignacionCursoSchema
>;

export type DesignacionCursoFormOutput = z.output<
	typeof crearDesignacionCursoSchema
>;

export type DesignacionAdministrativaCreateDTO =
	DesignacionAdministrativaFormOutput;

export type DesignacionCursoCreateDTO = DesignacionCursoFormOutput;
