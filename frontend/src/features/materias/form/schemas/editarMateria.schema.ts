import z from "zod";
import { crearMateriaSchema } from "./crearMateria.schema";

export const editarMateriaSchema = crearMateriaSchema.extend({
  id: z.number(),
});