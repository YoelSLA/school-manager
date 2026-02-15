import type { z } from "zod";
import type { crearEmpleadoEducativoSchema } from "./schemas/crearEmpleadoEducativo.schema";
import type { editarEmpleadoEducativoSchema } from "./schemas/editarEmpleadoEducativo.schema";

/* =========================
   CREATE
========================= */

export type EmpleadoEducativoCreateInput = z.input<
	typeof crearEmpleadoEducativoSchema
>;

export type EmpleadoEducativoCreateOutput = z.output<
	typeof crearEmpleadoEducativoSchema
>;

export type EmpleadoEducativoCreateDTO = EmpleadoEducativoCreateOutput;

/* =========================
   EDIT
========================= */

export type EmpleadoEducativoEditInput = z.input<
	typeof editarEmpleadoEducativoSchema
>;

export type EmpleadoEducativoEditOutput = z.output<
	typeof editarEmpleadoEducativoSchema
>;

export type EmpleadoEducativoUpdateDTO = EmpleadoEducativoEditOutput;
