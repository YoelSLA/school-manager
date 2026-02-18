import z from "zod";
import { CAUSAS_BAJA } from "../../utils/empleadosEducativos.utils";

const causasValues = CAUSAS_BAJA.map((c) => c.value) as [string, ...string[]];

export const darBajaEmpleadoEducativo = z.object({
	causa: z.enum(causasValues, {
		errorMap: () => ({
			message: "Debe seleccionar un motivo válido",
		}),
	}),
});
