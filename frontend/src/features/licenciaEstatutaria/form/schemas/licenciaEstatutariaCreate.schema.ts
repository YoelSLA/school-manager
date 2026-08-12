import { z } from "zod";

export const licenciaEstatutariaCreateSchema = z.object({
	articulo: z.string().min(1, "El artículo es obligatorio"),
	codigo: z.string().min(1, "El código es obligatorio"),
	nombre: z.string().min(1, "El nombre es obligatorio"),
	descripcion: z.string().min(1, "La descripción es obligatoria"),
});
