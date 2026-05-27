import { requiredFechaISO } from "@/shared/utils/zod/schemas";
import { z } from "zod";

export const updateProvisionalSchema = z
	.object({
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

		fechaCese: requiredFechaISO("La fecha de cese es obligatoria"),
	})
	.refine(
		(data) => {
			if (!data.fechaTomaPosesion || !data.fechaCese) return true;

			return data.fechaCese >= data.fechaTomaPosesion;
		},
		{
			message: "La fecha de cese no puede ser anterior a la toma de posesión",
			path: ["fechaCese"],
		},
	);
