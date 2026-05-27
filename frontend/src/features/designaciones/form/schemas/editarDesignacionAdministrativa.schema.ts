import { RolEducativo } from "@/shared/utils/types/enums";
import { crearFranjaHorariaSchema } from "@/shared/utils/zod/crearfranjaHoraria.schema";
import { z } from "zod";

export const editarDesignacionAdministrativaSchema = z.object({
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
