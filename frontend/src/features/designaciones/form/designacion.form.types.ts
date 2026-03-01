import type z from "zod";
import type { crearDesignacionAdministrativaSchema } from "./schemas/crearDesignacionAdministrativa.schema";
import type { crearDesignacionCursoSchema } from "./schemas/crearDesignacionCurso.schema";

export type DesignacionAdministrativaFormValues =
	z.input<typeof crearDesignacionAdministrativaSchema>;


export type DesignacionCursoFormValues =
	z.infer<typeof crearDesignacionCursoSchema>;


export type DesignacionAdministrativaCreateDTO = DesignacionAdministrativaFormValues;

export type DesignacionCursoCreateDTO = DesignacionCursoFormValues;

export type DesignacionAdministrativaFormInput =
	z.input<typeof crearDesignacionAdministrativaSchema>;

export type DesignacionAdministrativaFormOutput =
	z.output<typeof crearDesignacionAdministrativaSchema>;