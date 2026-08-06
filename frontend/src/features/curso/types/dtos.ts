import type { Turno } from "@/shared/types";

export interface CursoDetalleDTO {
	id: number;
	anio: number;
	grado: number;
	division: string;
	turno: Turno;
}

export interface CursoRowDTO {
	id: number;
	anio: number;
	grado: number;
	division: string;
	turno: Turno;
}

export interface CursoSelectDTO {
	id: number;
	nombre: string;
}
