import { z } from "zod";
import { crearFranjaHorariaSchema } from "@/utils/schemas/crearfranjaHoraria.schema";
import { RolEducativo } from "../../types/designacion.types";

export const editarDesignacionAdministrativaSchema = z.object({
	cupof: z.coerce
		.number({ message: "El CUPOF debe ser un número válido" })
		.int({ message: "El CUPOF debe ser entero" })
		.positive({ message: "El CUPOF debe ser mayor a 0" })
		.optional(),

	franjasHorarias: z
		.array(crearFranjaHorariaSchema)
		.min(1, { message: "Debe haber al menos una franja horaria" }),

	rolEducativo: z.enum(RolEducativo),
});

export type EditarDesignacionAdministrativaFormValues = z.infer<
	typeof editarDesignacionAdministrativaSchema
>;

export type DesignacionAdministrativaUpdateDTO =
<<<<<<< HEAD
  EditarDesignacionAdministrativaFormValues;
=======
	EditarDesignacionAdministrativaFormValues;
>>>>>>> b1532f065ea9ee002c51168b2e05b177736561b7
