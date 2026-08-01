import type z from "zod";
import type { Turno } from "@/shared/types/enums";
import type { cursoCreateSchema } from "../form/cursoCreate.schema";

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

export type CursoSelectDTO = {
	id: number;
	nombre: string;
};

export interface CursoRowDTO {
	id: number;
	anio: number;
	grado: number;
	division: string;
	turno: Turno;
}
