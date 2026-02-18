import { z } from "zod";

const TURNOS = ["MANIANA", "TARDE", "VESPERTINO"] as const;

export const crearCursoSchema = z.object({
	turno: z.enum(TURNOS),

	anio: z.coerce
		.number({
			invalid_type_error: "El año es obligatorio",
		})
		.refine((v) => Number.isInteger(v), {
			message: "Debe ser un número entero",
		})
		.refine((v) => v >= 1, {
			message: "Debe ser mayor o igual a 1",
		}),

	grado: z.coerce
		.number({
			invalid_type_error: "El grado es obligatorio",
		})
		.refine((v) => Number.isInteger(v), {
			message: "Debe ser un número entero",
		})
		.refine((v) => v >= 1, {
			message: "Debe ser mayor o igual a 1",
		}),
});
