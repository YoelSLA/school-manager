import type z from "zod";
import type { cambiarCoberturaSchema } from "../form/schemas/cambiarCobertura.schema";
import type { createLicencia } from "../form/schemas/createLicencia.schema";
import type { cubrirDesignacionesConSuplenteSchema } from "../form/schemas/cubrirDesignacionesConSuplente.schema";

/* ============================================================================
 * FORM VALUES
 * ========================================================================== */

export type LicenciaCreateFormInput = z.input<typeof createLicencia>;
export type LicenciaCreateFormValues = z.output<typeof createLicencia>; // o z.infer

export type CambiarCoberturaDTO = z.infer<typeof cambiarCoberturaSchema>;

export type CubrirDesignacionesConSuplente = z.infer<
	typeof cubrirDesignacionesConSuplenteSchema
>;
