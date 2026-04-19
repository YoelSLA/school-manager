import { z } from "zod";
import { optionalFechaISO, requiredFechaISO } from "@/utils/zod/schemas";

/* =========================
	 Regex
========================= */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cuilRegex = /^\d{2}-\d{8}-\d{1}$/;
const soloLetrasRegex = /^[\p{L}\s]+$/u;

/* =========================
	 Helpers
========================= */

const capitalizarNombre = (valor: string) =>
	valor
		.trim()
		.toLowerCase()
		.replace(/\b\p{L}/gu, (c) => c.toUpperCase());

const requiredString = (message: string) =>
	z.string().trim().min(1, message);

const optionalString = () =>
	z
		.string()
		.trim()
		.transform((v) => (v === "" ? undefined : v))
		.optional();


const requiredNombre = (message: string) =>
	z
		.string()
		.trim()
		.min(1, message)
		.refine((valor) => soloLetrasRegex.test(valor), {
			message: "Solo letras",
		})
		.transform(capitalizarNombre);

/* =========================
	 Base schema SIN refine
========================= */

export const empleadoEducativoBaseSchema = z.object({
	cuil: requiredString("El CUIL es obligatorio").regex(
		cuilRegex,
		"El CUIL debe tener el formato XX-XXXXXXXX-X"
	),

	nombre: requiredNombre("El nombre es obligatorio"),

	apellido: requiredNombre("El apellido es obligatorio"),

	domicilio: optionalString(),

	telefono: optionalString(),

	email: requiredString("El email es obligatorio").regex(
		emailRegex,
		"El email no tiene un formato válido"
	),

	fechaDeNacimiento: requiredFechaISO(
		"La fecha de nacimiento es obligatoria"
	),

	fechaDeIngreso: optionalFechaISO(),
});

/* =========================
	 Crear
========================= */

export const crearEmpleadoEducativoSchema =
	empleadoEducativoBaseSchema.refine(
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
