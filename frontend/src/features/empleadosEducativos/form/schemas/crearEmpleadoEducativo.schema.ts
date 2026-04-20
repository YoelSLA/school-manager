import type z from "zod";
import { empleadoEducativoBaseSchema } from "./empleadoEducativoBaseSchema";

export const crearEmpleadoEducativoSchema = empleadoEducativoBaseSchema.refine(
	(data) => {
		if (!data.fechaDeIngreso || !data.fechaDeNacimiento) return true;
		return data.fechaDeIngreso >= data.fechaDeNacimiento;
	},
	{
		message:
			"La fecha de ingreso no puede ser anterior a la fecha de nacimiento",
		path: ["fechaDeIngreso"],
	}
);

/* =========================
	 Type automático
========================= */

export type EmpleadoEducativoCreateDTO =
	z.infer<typeof crearEmpleadoEducativoSchema>;
