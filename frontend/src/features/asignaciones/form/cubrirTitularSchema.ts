import { z } from "zod";
import { CaracteristicaAsignacion } from "../types/asignacion.types";

export const cubrirTitularSchema = z.object({
  tipoAsignacion: z.literal("TITULAR"),

  empleadoId: z.coerce
    .number()
    .min(1, { message: "Debe seleccionar un empleado" })
    .optional(),

  fechaTomaPosesion: z
    .string()
    .min(1, "La fecha de toma de posesión es obligatoria"),

  caracteristica: z.enum(CaracteristicaAsignacion, {
    message: "La característica es obligatoria",
  })
});
