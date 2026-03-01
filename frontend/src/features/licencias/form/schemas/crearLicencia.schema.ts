import z from "zod";

export const crearLicenciaSchema = z
	.object({
		tipoLicencia: z.string().min(1, "Seleccioná un tipo de licencia"),

		fechaDesde: z.string().min(1, "La fecha desde es obligatoria"),

		fechaHasta: z
			.string()
			.optional()
			.or(z.literal("")),

		descripcion: z.string().optional(),
	})
	.refine((data) => {
		if (!data.fechaHasta) return true;

		return data.fechaHasta >= data.fechaDesde;
	}, {
		message: "La fecha hasta no puede ser anterior a la fecha desde",
		path: ["fechaHasta"],
	});