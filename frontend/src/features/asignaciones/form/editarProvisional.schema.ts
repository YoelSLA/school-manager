import { z } from "zod";
import { requiredFechaISO } from "@/utils/zod/schemas";

export const editarProvisionalSchema = z
	.object({
		empleadoId: z.coerce
			.number()
			.min(1, { message: "Debe seleccionar un empleado" })
			.optional(),

		fechaTomaPosesion: requiredFechaISO(
			"La fecha de toma de posesión es obligatoria",
		),

		fechaCese: requiredFechaISO("La fecha de cese es obligatoria"),
	})
	.refine((data) => data.fechaCese >= data.fechaTomaPosesion, {
		message: "La fecha de cese no puede ser anterior a la toma de posesión",
		path: ["fechaCese"],
	});


