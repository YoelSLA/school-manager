import z from "zod";
import { designacionBaseSchema } from "./designacionBase.schema";

const requiredSelectId = (label: string) =>
	z
		.coerce
		.number({
			required_error: `${label} es obligatorio`,
			invalid_type_error: `${label} inválido`,
		})
		.int(`${label} debe ser un número entero`)
		.positive(`Debe seleccionar un ${label.toLowerCase()}`);


export const crearDesignacionCursoSchema = designacionBaseSchema.extend({
	materiaId: requiredSelectId("Materia"),
	cursoId: requiredSelectId("Curso"),
	orientacion: z
		.string()
		.trim()
		.min(1, "La orientación es obligatoria"),
});