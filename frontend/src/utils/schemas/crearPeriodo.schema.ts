import { z } from "zod";

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);

export const crearPeriodoSchema = z
	.object({
		fechaDesde: z.preprocess(
			emptyToUndefined,
			z.iso.date({
				message: "La fecha desde es obligatoria",
			}),
		),

		fechaHasta: z.preprocess(emptyToUndefined, z.iso.date().optional()),
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
