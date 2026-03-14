import { z } from "zod";
import { CaracteristicaAsignacion } from "../types/asignacion.types";
import { requiredFechaISO } from "@/utils/zod/schemas";

export const cubrirTitularSchema = z.object({
  empleadoId: z.coerce
    .number()
    .min(1, { message: "Debe seleccionar un empleado" })
    .optional(),

  fechaTomaPosesion: requiredFechaISO(
    "La fecha de toma de posesión es obligatoria"
  ),

  caracteristica: z.enum(CaracteristicaAsignacion, {
    message: "La característica es obligatoria",
  }),
});

export type CubrirTitularFormValues =
  z.infer<typeof cubrirTitularSchema>;