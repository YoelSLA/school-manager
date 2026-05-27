import { CaracteristicaAsignacion } from "@/shared/utils/types/enums";
import { requiredFechaISO } from "@/shared/utils/zod/schemas";
import { z } from "zod";

export const createTitularSchema = z.object({
	empleadoId: z.coerce
		.number()
		.min(1, { message: "Debe seleccionar un empleado" })
		.optional(),

	secuencia: z.coerce
		.number()
		.min(1, { message: "La secuencia es obligatoria" }),

	fechaTomaPosesion: requiredFechaISO(
		"La fecha de toma de posesión es obligatoria",
	),

	caracteristica: z
		.enum(CaracteristicaAsignacion, {
			message: "La característica es obligatoria",
		})
		.optional(),
});
