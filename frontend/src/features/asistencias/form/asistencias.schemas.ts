import { z } from "zod";

export const registrarInasistenciaSchema = z.object({
	tipoLicencia: z.string(),
	observacion: z.string().optional(),
});
