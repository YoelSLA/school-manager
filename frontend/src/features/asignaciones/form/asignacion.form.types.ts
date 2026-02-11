import type z from "zod";
import type { crearAsignacionSchema } from "./schemas/crearAsignacion.schema";

export type AsignacionFormInput = z.input<typeof crearAsignacionSchema>;

export type AsignacionFormOutput = z.output<typeof crearAsignacionSchema>;
