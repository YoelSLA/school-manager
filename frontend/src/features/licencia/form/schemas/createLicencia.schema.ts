import { z } from "zod";
import { crearPeriodoSchema } from "@/shared/validation/periodo.schema";

export const createLicencia = z.object({
	licenciaEstatutariaId: z.coerce.number().positive({
		message: "Debe seleccionar un tipo de licencia",
	}),
	periodo: crearPeriodoSchema,
	descripcion: z
		.string()
		.max(255, {
			message: "La descripción no puede superar los 255 caracteres",
		})
		.optional(),
	asignacionesIds: z.array(z.coerce.number()).min(1, {
		message: "Debe indicar al menos una asignación afectada",
	}),
});
