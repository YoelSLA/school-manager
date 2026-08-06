import type z from "zod";
import type { crearEscuelaSchema } from "../form/schemas/crearEscuela.schema";

export type EscuelaCreateDTO = z.infer<typeof crearEscuelaSchema>;

export type EscuelaUpdateDTO = z.infer<typeof crearEscuelaSchema>;
