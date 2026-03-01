import type z from "zod";
import type { crearMateriaSchema } from "./schemas/crearMateria.schema";
import type { editarMateriaSchema } from "./schemas/editarMateria.schema";

export type CrearMateriaFormValues = z.infer<typeof crearMateriaSchema>;
export type EditarMateriaFormValues = z.infer<typeof editarMateriaSchema>;