import { z } from "zod";

export const asistenciaCreateSchema = z.object({
	licenciaEstatutariaId: z.coerce.number().positive({
		message: "Debe seleccionar un tipo de licencia",
	}),

	observacion: z.string().optional(),
});
