import type { z } from "zod";
import type { crearEmpleadoEducativoSchema } from "./schemas/crearEmpleadoEducativo.schema";

export type EmpleadoEducativoFormInput = z.input<
	typeof crearEmpleadoEducativoSchema
>;

export type EmpleadoEducativoFormOutput = z.output<
	typeof crearEmpleadoEducativoSchema
>;

export type EmpleadoEducativoCreateDTO = EmpleadoEducativoFormOutput;
