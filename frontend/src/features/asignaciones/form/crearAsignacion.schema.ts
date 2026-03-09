import z from "zod";
import { cubrirProvisionalSchema } from "./cubrirProvisional.schema";
import { cubrirTitularSchema } from "./cubrirTitularSchema";

export const crearAsignacionSchema = z.discriminatedUnion("tipoAsignacion", [
  cubrirTitularSchema,
  cubrirProvisionalSchema,
]);

export type AsignacionFormValues = z.infer<typeof crearAsignacionSchema>;