import { z } from "zod";

export const requiredFechaISO = (message: string) =>
	z
		.string()
		.trim()
		.superRefine((val, ctx) => {
			console.log("📅 SUPER REFINE fecha:", val);

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
			console.log("📅 SUPER REFINE optional:", val);

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