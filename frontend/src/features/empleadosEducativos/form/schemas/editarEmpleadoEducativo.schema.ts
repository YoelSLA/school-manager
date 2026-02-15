import { crearEmpleadoEducativoSchema } from "./crearEmpleadoEducativo.schema";

export const editarEmpleadoEducativoSchema =
	crearEmpleadoEducativoSchema.partial({
		cuil: true,
	});
