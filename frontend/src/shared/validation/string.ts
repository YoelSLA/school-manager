import z from "zod";

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
