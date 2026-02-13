import type { EmpleadoEducativoFormInput } from "../empleadoEducativo.form.types";

export const EMPLEADO_EDUCATIVO_DEFAULTS: EmpleadoEducativoFormInput = {
	cuil: "",
	nombre: "",
	apellido: "",
	domicilio: "",
	telefono: "",
	email: "",
	fechaDeNacimiento: "",
	fechaDeIngreso: undefined,
};
