import { z } from "zod";
import { empleadoEducativoBaseSchema } from "./crearEmpleadoEducativo.schema";

export const editarEmpleadoEducativoSchema =
	empleadoEducativoBaseSchema
		.partial({
			cuil: true,
		})
		.refine(
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

export type EmpleadoEducativoEditDTO = z.infer<
	typeof editarEmpleadoEducativoSchema
>;