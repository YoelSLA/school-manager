import type z from "zod";
import type { crearEmpleadoEducativoSchema } from "../form/schemas/crearEmpleadoEducativo.schema";
import type { darBajaEmpleadoEducativo } from "../form/schemas/darBajaEmpleadoEducativo.schema";
import type { editarEmpleadoEducativoSchema } from "../form/schemas/editarEmpleadoEducativo.schema";

/* ============================================================================
 * REQUEST
 * ========================================================================== */

export type EmpleadoEducativoCreateDTO = z.infer<
	typeof crearEmpleadoEducativoSchema
>;

export type EmpleadoEducativoUpdateDTO = z.infer<
	typeof editarEmpleadoEducativoSchema
>;

export type BajaDefinitivaDTO = z.infer<typeof darBajaEmpleadoEducativo>;
