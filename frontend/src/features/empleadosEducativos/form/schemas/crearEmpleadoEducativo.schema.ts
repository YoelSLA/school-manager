import { z } from "zod";
import { optionalFechaISO, requiredFechaISO } from "@/utils/zod/schemas";

/* =========================
	 Regex
========================= */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cuilRegex = /^\d{2}-\d{8}-\d{1}$/;

/* =========================
	 Helpers
========================= */

const capitalizarNombre = (valor: string) =>
	valor
		.trim()
		.toLowerCase()
		.replace(/\b\p{L}/gu, (c) => c.toUpperCase());

/* =========================
	 Schemas individuales
========================= */

export const cuilSchema = z
	.string()
	.min(1, "El CUIL es obligatorio")
	.regex(cuilRegex, "El CUIL debe tener el formato XX-XXXXXXXX-X");

export const nombreSchema = z
	.string()
	.min(1, "El nombre es obligatorio")
	.regex(/^[\p{L}\s]+$/u, "Solo letras")
	.transform(capitalizarNombre);

export const apellidoSchema = z
	.string()
	.min(1, "El apellido es obligatorio")
	.regex(/^[\p{L}\s]+$/u, "Solo letras")
	.transform(capitalizarNombre);

export const domicilioSchema = z.string().optional();

export const telefonoSchema = z.string().optional();

export const emailSchema = z
	.string()
	.min(1, "El email es obligatorio")
	.regex(emailRegex, "El email no tiene un formato válido");

/* =========================
	 Schema compuesto
========================= */

export const crearEmpleadoEducativoSchema = z
	.object({
		cuil: cuilSchema,
		nombre: nombreSchema,
		apellido: apellidoSchema,
		domicilio: domicilioSchema,
		telefono: telefonoSchema,
		email: emailSchema,
		fechaDeNacimiento: requiredFechaISO(
			"La fecha de nacimiento es obligatoria",
		),
		fechaDeIngreso: optionalFechaISO(),
	})
	.refine(
		(data) => {
			if (!data.fechaDeIngreso) return true;
			return data.fechaDeIngreso >= data.fechaDeNacimiento;
		},
		{
			message:
				"La fecha de ingreso no puede ser anterior a la fecha de nacimiento",
			path: ["fechaDeIngreso"],
		},
	);
