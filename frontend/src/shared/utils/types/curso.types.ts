import type z from "zod";
import type { cursoCreateSchema } from "@/features/cursos/form/crearCurso.schema";
import type { Turno } from "./enums";

export type CursoCreateFormValues = z.input<typeof cursoCreateSchema>;
export type CursoCreateDTO = z.output<typeof cursoCreateSchema>;

export type CursoResponseDTO = {
	id: number;
	anio: number;
	grado: number;
	division: string;
	turno: Turno;
};

export type CursoNombreDTO = {
	id: number;
	division: string;
	turno: Turno;
};
