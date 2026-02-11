import { rolEducativoSchema } from "@/utils/schemas/rolEducativo.schema";
import { designacionBaseSchema } from "./designacionBase.schema";

export const crearDesignacionAdministrativaSchema =
	designacionBaseSchema.extend({
		rolEducativo: rolEducativoSchema,
	});
