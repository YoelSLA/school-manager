import { z } from "zod";

export const cubrirProvisionalSchema = z
  .object({
    tipoAsignacion: z.literal("PROVISIONAL"),

    empleadoId: z.coerce
      .number()
      .min(1, { message: "Debe seleccionar un empleado" })
      .optional(),

    fechaTomaPosesion: z
      .string()
      .min(1, "La fecha de toma de posesión es obligatoria"),

    fechaCese: z
      .string()
      .min(1, "La fecha de cese es obligatoria"),
  })
  .superRefine((data, ctx) => {
    const { fechaCese, fechaTomaPosesion } = data;

    const cese = new Date(fechaCese);
    const toma = new Date(fechaTomaPosesion);

    if (cese < toma) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "La fecha de cese no puede ser anterior a la toma de posesión",
        path: ["fechaCese"],
      });
    }
  });