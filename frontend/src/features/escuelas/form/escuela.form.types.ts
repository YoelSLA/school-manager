import type z from "zod";
import type { crearEscuelaSchema } from "./crearEscuela.schema";

export type EscuelaFormInput = z.input<typeof crearEscuelaSchema>;

export type EscuelaFormOutput = z.output<typeof crearEscuelaSchema>;
