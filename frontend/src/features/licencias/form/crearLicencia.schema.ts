import { crearPeriodoSchema } from "@/shared/utils/zod/crearPeriodo.schema";
import { z } from "zod";

export const crearLicenciaSchema = z.object({
	tipoLicencia: z
		.string()
		.min(1, { message: "Debe seleccionar un tipo de licencia" }),

	periodo: crearPeriodoSchema,

	descripcion: z
		.string()
		.max(255, {
			message: "La descripción no puede superar los 255 caracteres",
		})
		.optional(),

	designacionesIds: z.array(z.coerce.number()).min(1, {
		message: "Debe indicar al menos una designación afectada",
	}),
});
