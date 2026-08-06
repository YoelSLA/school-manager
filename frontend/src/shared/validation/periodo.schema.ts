import { z } from "zod";
import { optionalFechaISO, requiredFechaISO } from "./date";

export const crearPeriodoSchema = z
	.object({
		fechaDesde: requiredFechaISO("La fecha desde es obligatoria"),
		fechaHasta: optionalFechaISO(),
	})
	.refine(
		(data) =>
			!data.fechaHasta ||
			!data.fechaDesde ||
			data.fechaHasta >= data.fechaDesde,
		{
			message: "La fecha hasta no puede ser anterior a la fecha desde",
			path: ["fechaHasta"],
		},
	);
