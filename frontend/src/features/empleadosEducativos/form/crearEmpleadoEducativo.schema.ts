import z from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cuilRegex = /^\d{2}-\d{8}-\d{1}$/;

const capitalizarNombre = (valor: string) =>
	valor
		.trim()
		.toLowerCase()
		.replace(/\b\p{L}/gu, (c) => c.toUpperCase());

export const crearEmpleadoEducativoSchema = z.object({
	cuil: z
		.string()
		.min(1, "El CUIL es obligatorio")
		.regex(cuilRegex, "El CUIL debe tener el formato XX-XXXXXXXX-X"),

	nombre: z
		.string()
		.min(1, "El nombre es obligatorio")
		.regex(/^[\p{L}\s]+$/u, "Solo letras")
		.transform(capitalizarNombre),

	apellido: z
		.string()
		.min(1, "El apellido es obligatorio")
		.regex(/^[\p{L}\s]+$/u, "Solo letras")
		.transform(capitalizarNombre),

	domicilio: z.string().optional(),

	telefono: z.string().optional(),

	email: z
		.string()
		.min(1, "El email es obligatorio")
		.regex(emailRegex, "El email no tiene un formato válido"),

	fechaDeNacimiento: z.string().min(1, "La fecha de nacimiento es obligatoria"),

	fechaDeIngreso: z.string().min(1, "La fecha de ingreso es obligatoria"),
});
