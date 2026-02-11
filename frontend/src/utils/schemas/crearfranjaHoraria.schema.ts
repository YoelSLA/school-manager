import { z } from "zod";

export const crearFranjaHorariaSchema = z
	.object({
		dia: z.enum(["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"]),
		horaDesde: z.string().min(1),
		horaHasta: z.string().min(1),
	})
	.refine((data) => data.horaHasta > data.horaDesde, {
		message: "La hora hasta debe ser posterior a la hora desde",
		path: ["horaHasta"],
	});
