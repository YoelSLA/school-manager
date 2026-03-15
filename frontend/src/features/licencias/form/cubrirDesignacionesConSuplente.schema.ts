import z from "zod";
import { requiredFechaISO } from "@/utils/zod/schemas";

export const cubrirDesignacionesConSuplenteSchema = z.object({
	empleadoId: z.coerce
		.number()
		.min(1, { message: "Debe seleccionar un suplente para cubrir" }),

	designacionesIds: z
		.array(z.coerce.number())
		.min(1, { message: "Debe indicar al menos una designación a cubrir" }),

	fechaTomaPosesion: requiredFechaISO(
		"La fecha de toma de posesión es obligatoria",
	),
});


