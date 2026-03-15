import { z } from "zod";
import { crearFranjaHorariaSchema } from "@/utils/schemas/crearfranjaHoraria.schema";

export const crearDesignacionCursoSchema = z.object({
	cupof: z.coerce
		.number({ message: "El CUPOF debe ser un número válido" })
		.int({ message: "El CUPOF debe ser entero" })
		.positive({ message: "El CUPOF debe ser mayor a 0" })
		.optional(),

	franjasHorarias: z
		.array(crearFranjaHorariaSchema)
		.min(1, { message: "Debe haber al menos una franja horaria" }),

	materiaId: z.coerce
		.number()
		.int({ message: "Materia inválida" })
		.positive({ message: "Debe seleccionar una materia" }),

	cursoId: z.coerce
		.number()
		.int({ message: "Curso inválido" })
		.positive({ message: "Debe seleccionar un curso" }),

	orientacion: z
		.string()
		.min(1, { message: "Debe seleccionar una orientación" }),
});

