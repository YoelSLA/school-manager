import type z from "zod";
import type { materiaCreateSchema, materiaUpdateSchema } from "../form/schemas";

export type MateriaCreateFormValues = z.input<typeof materiaCreateSchema>;

export type MateriaCreateDTO = z.output<typeof materiaCreateSchema>;

export type MateriaUpdateFormValues = z.input<typeof materiaUpdateSchema>;

export type MateriaUpdateDTO = z.output<typeof materiaUpdateSchema>;
