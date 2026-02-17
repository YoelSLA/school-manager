import type { EmpleadoEducativoCreateInput } from "../empleadoEducativo.form.types";

export const EMPLEADO_EDUCATIVO_DEFAULTS: EmpleadoEducativoCreateInput = {
	cuil: "",
	nombre: "",
	apellido: "",
	domicilio: "",
	telefono: "",
	email: "",
	fechaDeNacimiento: "",
	fechaDeIngreso: undefined,
};
