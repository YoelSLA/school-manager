import z from "zod";
import {
	capitalizarNombre,
	optionalFechaISO,
	optionalString,
	requiredFechaISO,
	requiredString,
} from "@/shared/utils/zod/schemas";

/* =========================
   Regex
========================= */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cuilRegex = /^\d{2}-\d{8}-\d{1}$/;

export const empleadoEducativoBaseSchema = z.object({
	cuil: requiredString("El CUIL es obligatorio").regex(
		cuilRegex,
		"El CUIL debe tener el formato XX-XXXXXXXX-X",
	),
	nombre: requiredString("El nombre es obligatorio")
		.regex(/^[\p{L}\s]+$/u, "Solo letras")
		.transform(capitalizarNombre),
	apellido: requiredString("El apellido es obligatorio")
		.regex(/^[\p{L}\s]+$/u, "Solo letras")
		.transform(capitalizarNombre),
	domicilio: optionalString(),
	telefono: optionalString(),
	email: requiredString("El email es obligatorio").regex(
		emailRegex,
		"El email no tiene un formato válido",
	),
	fechaDeNacimiento: requiredFechaISO("La fecha de nacimiento es obligatoria"),
	fechaDeIngreso: optionalFechaISO(),
});
