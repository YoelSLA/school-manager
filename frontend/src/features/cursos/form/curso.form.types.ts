import type z from "zod";
import type { crearCursoSchema } from "./crearCurso.schema";

export type CrearCursoFormInput = z.input<typeof crearCursoSchema>;
export type CrearCursoFormOutput = z.output<typeof crearCursoSchema>;

export type CrearCursoDTO = CrearCursoFormOutput;
