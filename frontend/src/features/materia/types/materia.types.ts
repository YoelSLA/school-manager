import type z from "zod";
import type { materiaCreateSchema } from "../form/schemas/materiaCreate.schema";
import type { materiaUpdateSchema } from "../form/schemas/materiaUpdate.schema";

export type MateriaCreateFormValues = z.input<typeof materiaCreateSchema>;
export type MateriaCreateDTO = z.output<typeof materiaCreateSchema>;

export type MateriaUpdateFormValues = z.input<typeof materiaUpdateSchema>;
export type MateriaUpdateDTO = z.output<typeof materiaUpdateSchema>;

export type MateriaDetalleDTO = {
	id: number;
	nombre: string;
	abreviatura: string;
	cantidadModulos: number;
};

export type MateriaNombreDTO = {
	id: number;
	nombre: string;
};

export type MateriaSelectDTO = {
	id: number;
	nombre: string;
};

export interface MateriaRowDTO {
	id: number;
	nombre: string;
	abreviatura: string;
	cantidadModulos: number;
}
