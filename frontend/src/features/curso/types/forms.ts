import type z from "zod";
import type { cursoCreateSchema } from "../form/cursoCreate.schema";

export type CursoCreateFormValues = z.input<typeof cursoCreateSchema>;

export type CursoCreateDTO = z.output<typeof cursoCreateSchema>;
