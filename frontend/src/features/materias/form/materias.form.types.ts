import type z from "zod";
import type { crearMateriaSchema } from "./crearMateria.schema";

export type CrearMateriaFormInput = z.input<typeof crearMateriaSchema>;

export type CrearMateriaFormOutput = z.output<typeof crearMateriaSchema>;
