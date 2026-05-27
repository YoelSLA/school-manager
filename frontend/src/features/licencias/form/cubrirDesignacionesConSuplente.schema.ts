import { requiredFechaISO } from "@/shared/utils/zod/schemas";
import z from "zod";

export const cubrirDesignacionesConSuplenteSchema = z.object({
	empleadoId: z.coerce
		.number()
		.min(1, { message: "Debe seleccionar un suplente para cubrir" }),

	designacionesIds: z
		.array(z.coerce.number())
		.min(1, { message: "Debe indicar al menos una designación a cubrir" }),

	secuencia: z.coerce.number().min(1, {
		message: "La secuencia debe ser mayor o igual a 1",
	}),

	fechaTomaPosesion: requiredFechaISO(
		"La fecha de toma de posesión es obligatoria",
	),
});
