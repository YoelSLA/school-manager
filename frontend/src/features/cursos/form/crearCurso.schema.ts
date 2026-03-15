import { z } from "zod";

const TURNOS = ["MANIANA", "TARDE", "VESPERTINO"] as const;

export const crearCursoSchema = z.object({
	turno: z.enum(TURNOS),

	anio: z.coerce
		.number()
		.int({ message: "Debe ser un número entero" })
		.min(1, { message: "Debe ser mayor o igual a 1" }),

	grado: z.coerce
		.number()
		.int({ message: "Debe ser un número entero" })
		.min(1, { message: "Debe ser mayor o igual a 1" }),
});


