import z from "zod";
import { requiredFechaISO } from "@/shared/utils/zod/schemas";

export const cambiarCoberturaSchema = z.object({
	empleadoId: z.coerce
		.number()
		.min(1, { message: "Debe seleccionar un empleado" }),

	secuencia: z.coerce
		.number()
		.min(1, { message: "La secuencia es obligatoria" }),

	fechaTomaPosesion: requiredFechaISO(
		"La fecha de toma de posesión es obligatoria",
	),
});

export type CambiarCoberturaDTO = z.infer<typeof cambiarCoberturaSchema>;
