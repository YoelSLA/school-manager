import type z from "zod";
import type { asistenciaCreateSchema } from "../form/schemas";

export type AsistenciaCreateFormValues = z.input<typeof asistenciaCreateSchema>;

export type AsistenciaCreateDTO = z.output<typeof asistenciaCreateSchema>;
