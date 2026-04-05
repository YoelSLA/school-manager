import { z } from "zod";

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

/* =========================
	 Fechas (string desde input date)
========================= */

const _isValidISODate = (val: string) =>
	/^\d{4}-\d{2}-\d{2}$/.test(val) &&
	!Number.isNaN(new Date(val).getTime());

export const requiredFechaISO = (message: string) =>
	z
		.string()
		.trim()
		.superRefine((val, ctx) => {
			if (!val) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message,
				});
				return;
			}

			if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Formato inválido (YYYY-MM-DD)",
				});
				return;
			}

			if (Number.isNaN(new Date(val).getTime())) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Fecha inválida",
				});
			}
		});

export const optionalFechaISO = () =>
	z
		.string()
		.trim()
		.transform((val) => (val === "" ? undefined : val))
		.optional()
		.superRefine((val, ctx) => {
			if (!val) return;

			if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Formato inválido (YYYY-MM-DD)",
				});
				return;
			}

			if (Number.isNaN(new Date(val).getTime())) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Fecha inválida",
				});
			}
		});

/* =========================
	 Base schema SIN refine
========================= */

export const crearEmpleadoEducativoSchema = z
	.object({
		cuil: requiredString("El CUIL es obligatorio").regex(
			cuilRegex,
			"El CUIL debe tener el formato XX-XXXXXXXX-X"
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
			"El email no tiene un formato válido"
		),
		fechaDeNacimiento: requiredFechaISO(
			"La fecha de nacimiento es obligatoria"
		),
		fechaDeIngreso: optionalFechaISO(),
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

/* =========================
	 Type automático
========================= */

export type EmpleadoEducativoCreateDTO =
	z.infer<typeof crearEmpleadoEducativoSchema>;
