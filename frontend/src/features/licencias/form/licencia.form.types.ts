import type z from "zod";
import type { crearLicenciaSchema } from "./schemas/crearLicencia.schema";

export type LicenciaFormInput = z.input<typeof crearLicenciaSchema>;
export type LicenciaFormOutput = z.output<typeof crearLicenciaSchema>;
