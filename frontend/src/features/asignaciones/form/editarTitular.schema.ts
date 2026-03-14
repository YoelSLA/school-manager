import { z } from "zod";
import { requiredFechaISO } from "@/utils/zod/schemas";
import { CaracteristicaAsignacion } from "../types/asignacion.types";

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

export type EditarTitularFormValues = z.infer<typeof editarTitularSchema>;
