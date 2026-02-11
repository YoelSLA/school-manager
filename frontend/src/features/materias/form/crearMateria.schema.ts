import { z } from "zod";

export const crearMateriaSchema = z.object({
	nombre: z.string().min(1, "El nombre es obligatorio"),

	abreviatura: z.string().min(1, "La abreviatura es obligatoria"),

	cantidadModulos: z.coerce
		.number({
			invalid_type_error: "La cantidad de módulos es obligatoria",
		})
		.refine((v) => !Number.isNaN(v), {
			message: "La cantidad de módulos es obligatoria",
		})
		.refine((v) => Number.isInteger(v), {
			message: "Debe ser un número entero",
		})
		.refine((v) => v >= 1, {
			message: "Debe tener al menos 1 módulo",
		}),
});
