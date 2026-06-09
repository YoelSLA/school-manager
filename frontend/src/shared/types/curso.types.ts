import type z from "zod";
import type { cursoCreateSchema } from "@/features/cursos/form/cursoCreate.schema";
import type { Turno } from "./enums";

export type CursoCreateFormValues = z.input<typeof cursoCreateSchema>;

// REQUEST
export type CursoCreateDTO = z.output<typeof cursoCreateSchema>;

// RESPONSE
export type CursoDetalleDTO = {
	id: number;
	anio: number;
	grado: number;
	division: string;
	turno: Turno;
};
