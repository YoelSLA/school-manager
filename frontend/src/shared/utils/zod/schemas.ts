import { z } from "zod";

export const requiredFechaISO = (message: string) =>
	z
		.string()
		.trim()
		.superRefine((val, ctx) => {
			if (!val) {
				ctx.addIssue({
					code: "custom",
					message,
				});
				return;
			}

			if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) {
				ctx.addIssue({
					code: "custom",
					message: "Formato inválido (YYYY-MM-DD)",
				});
				return;
			}

			if (Number.isNaN(new Date(val).getTime())) {
				ctx.addIssue({
					code: "custom",
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
					code: "custom",
					message: "Formato inválido (YYYY-MM-DD)",
				});
				return;
			}

			if (Number.isNaN(new Date(val).getTime())) {
				ctx.addIssue({
					code: "custom",
					message: "Fecha inválida",
				});
			}
		});

export const requiredString = (message: string) =>
	z.string().trim().min(1, message);

export const capitalizarNombre = (valor: string) =>
	valor
		.trim()
		.toLowerCase()
		.replace(/\b\p{L}/gu, (c) => c.toUpperCase());

export const optionalString = () =>
	z
		.string()
		.trim()
		.transform((v) => (v === "" ? undefined : v))
		.optional();
