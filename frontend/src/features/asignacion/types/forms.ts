import type z from "zod";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import type {
	createProvisionalSchema,
	createTitularSchema,
	updateProvisionalSchema,
	updateTitularSchema,
} from "../form/schemas";

export type CubrirTitularDTO = z.infer<typeof createTitularSchema>;

export type CubrirProvisionalDTO = z.infer<typeof createProvisionalSchema>;

export type EditarTitularDTO = z.infer<typeof updateTitularSchema>;

export type EditarProvisionalDTO = z.infer<typeof updateProvisionalSchema>;

export interface EditarAsignacionDTO {
	empleadoId: number;
	fechaTomaPosesion: string;
	fechaCese?: string | null;
}

export interface CoberturaSeleccionada {
	designacionId: number;
	secuencia: number;
	empleado: EmpleadoEducativoBasicoDTO | null;
	fechaTomaPosesion: string;
}
