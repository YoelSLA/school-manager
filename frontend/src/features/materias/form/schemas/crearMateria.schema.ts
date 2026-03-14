import { z } from "zod";

export const crearMateriaSchema = z.object({
	nombre: z.string().min(1, { message: "El nombre es obligatorio" }),

	abreviatura: z.string().min(1, { message: "La abreviatura es obligatoria" }),

	cantidadModulos: z.coerce
		.number({ message: "La cantidad de módulos es obligatoria" })
		.int({ message: "Debe ser un número entero" })
		.min(1, { message: "Debe tener al menos 1 módulo" }),
});
