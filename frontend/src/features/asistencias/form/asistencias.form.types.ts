import type z from "zod";
import type { registrarInasistenciaSchema } from "./asistencias.schemas";

export type RegistrarInasistenciaFormInput = z.input<
	typeof registrarInasistenciaSchema
>;

export type RegistrarInasistenciaFormOutput = z.output<
	typeof registrarInasistenciaSchema
>;
