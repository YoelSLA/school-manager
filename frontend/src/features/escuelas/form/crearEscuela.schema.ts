import { z } from "zod";

export const crearEscuelaSchema = z.object({
	nombre: z.string().min(1, "El nombre es obligatorio"),
	localidad: z.string().min(1, "La localidad es obligatoria"),
	direccion: z.string().min(1, "La dirección es obligatoria"),
	telefono: z.string().min(1, "El teléfono es obligatorio"),
});
