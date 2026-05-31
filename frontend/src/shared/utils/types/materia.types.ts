import type z from "zod";
import type { materiaCreateSchema } from "@/features/materias/form/schemas/materiaCreate.schema";
import type { materiaUpdateSchema } from "@/features/materias/form/schemas/materiaUpdateschema";

export type MateriaCreateFormValues = z.input<typeof materiaCreateSchema>;
export type MateriaCreateDTO = z.output<typeof materiaCreateSchema>;

export type MateriaUpdateFormValues = z.input<typeof materiaUpdateSchema>;
export type MateriaUpdateDTO = z.output<typeof materiaUpdateSchema>;

export type MateriaResponseDTO = {
	id: number;
	nombre: string;
	abreviatura: string;
	cantidadModulos: number;
};

export type MateriaNombreDTO = {
	id: number;
	nombre: string;
};
