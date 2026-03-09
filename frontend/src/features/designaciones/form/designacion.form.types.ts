useEditarDesignacionCursoimport type z from "zod";
import type { crearDesignacionAdministrativaSchema } from "./schemas/crearDesignacionAdministrativa.schema";
import type { crearDesignacionCursoSchema } from "./schemas/crearDesignacionCurso.schema";
import { editarDesignacionCursoSchema } from "./schemas/editarDesignacionCurso.schema";
import { editarDesignacionAdministrativaSchema } from "./schemas/editarDesignacionAdministrativa.schema";

export type DesignacionAdministrativaFormValues =
	z.infer<typeof crearDesignacionAdministrativaSchema>;

export type DesignacionCursoFormValues =
	z.infer<typeof crearDesignacionCursoSchema>;

export type EditarDesignacionCursoFormValues =
	z.infer<typeof editarDesignacionCursoSchema>;

export type EditarDesignacionAdministrativaFormValues =
	z.infer<typeof editarDesignacionAdministrativaSchema>;

export type DesignacionAdministrativaCreateDTO = DesignacionAdministrativaFormValues;

export type DesignacionCursoCreateDTO = DesignacionCursoFormValues;

export type DesignacionAdministrativaUpdateDTO =
	EditarDesignacionAdministrativaFormValues;

export type DesignacionCursoUpdateDTO =
	EditarDesignacionCursoFormValues;