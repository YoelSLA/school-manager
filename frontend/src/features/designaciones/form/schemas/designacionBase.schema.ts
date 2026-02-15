import { z } from "zod";
import { crearFranjaHorariaSchema } from "@/utils/schemas/crearfranjaHoraria.schema";

export const designacionBaseSchema = z.object({
	cupof: z.preprocess(
		(val) => {
			const coerced = Number(val);
			return coerced;
		},
		z
			.number({
				required_error: "El CUPOF es obligatorio",
				invalid_type_error: "El CUPOF debe ser un número",
			})
			.int("El CUPOF debe ser un entero")
			.positive("El CUPOF debe ser mayor a 0"),
	),

	franjasHorarias: z
		.array(crearFranjaHorariaSchema)
		.min(1, "Debe haber al menos una franja horaria"),
});
