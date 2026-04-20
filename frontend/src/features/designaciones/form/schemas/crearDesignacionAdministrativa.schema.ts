import { z } from "zod";
import { RolEducativo } from "@/utils/types/enums";
import { crearFranjaHorariaSchema } from "@/utils/zod/crearfranjaHoraria.schema";

export const crearDesignacionAdministrativaSchema = z.object({
	cupof: z.coerce
		.number({ message: "El CUPOF debe ser un número válido" })
		.int({ message: "El CUPOF debe ser entero" })
		.positive({ message: "El CUPOF debe ser mayor a 0" })
		.optional(),

	franjasHorarias: z
		.array(crearFranjaHorariaSchema)
		.min(1, { message: "Debe haber al menos una franja horaria" }),

	rolEducativo: z.enum(RolEducativo),
});

