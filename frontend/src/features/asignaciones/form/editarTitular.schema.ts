import { z } from "zod";
import { CaracteristicaAsignacion } from "@/utils/types/enums";
import { requiredFechaISO } from "@/utils/zod/schemas";

export const editarTitularSchema = z.object({
	empleadoId: z.coerce
		.number()
		.min(1, { message: "Debe seleccionar un empleado" })
		.optional(),

	fechaTomaPosesion: requiredFechaISO(
		"La fecha de toma de posesión es obligatoria",
	),

	caracteristica: z.enum(CaracteristicaAsignacion, {
		message: "La característica es obligatoria",
	}),
});
