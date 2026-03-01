import { z } from "zod";
import { crearFranjaHorariaSchema } from "@/utils/schemas/crearfranjaHoraria.schema";
import { rolEducativoSchema } from "@/utils/schemas/rolEducativo.schema";

export const crearDesignacionAdministrativaSchema = z.object({
	cupof: z
		.string()
		.trim()
		.min(1, "El CUPOF es obligatorio")
		.refine((val) => !Number.isNaN(Number(val)), {
			message: "El CUPOF debe ser un número válido",
		})
		.transform((val) => Number(val))
		.refine((val) => Number.isInteger(val), {
			message: "El CUPOF debe ser entero",
		})
		.refine((val) => val > 0, {
			message: "El CUPOF debe ser mayor a 0",
		}),

	franjasHorarias: z
		.array(crearFranjaHorariaSchema)
		.min(1, "Debe haber al menos una franja horaria"),

	rolEducativo: rolEducativoSchema,
});