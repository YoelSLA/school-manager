import { z } from "zod";
import { Turno } from "@/shared/types";

export const cursoCreateSchema = z.object({
	turno: z.enum(Turno),
	anio: z.coerce
		.number()
		.int({ message: "Debe ser un número entero" })
		.min(1, { message: "Debe ser mayor o igual a 1" }),
	grado: z.coerce
		.number()
		.int({ message: "Debe ser un número entero" })
		.min(1, { message: "Debe ser mayor o igual a 1" }),
});
