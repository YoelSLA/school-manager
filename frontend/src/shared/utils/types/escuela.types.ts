import type z from "zod";
import type { crearEscuelaSchema } from "@/features/escuelas/form/crearEscuela.schema";

export type EscuelaResponseDTO = {
	id: number;
	nombre: string;
	localidad: string;
	direccion: string;
	telefono?: string;
};

export type EscuelaCreateDTO = z.infer<typeof crearEscuelaSchema>;
export type EscuelaUpdateDTO = z.infer<typeof crearEscuelaSchema>;
