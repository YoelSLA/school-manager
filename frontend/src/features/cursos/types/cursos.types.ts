export type CursoFiltro = "TODOS" | "MANIANA" | "TARDE" | "VESPERTINO";

export type Turno = "MANIANA" | "TARDE" | "VESPERTINO";

export type CursoResponseDTO = {
	id: number;
	anio: number;
	grado: number;
	division: string;
	turno: Turno;
};

export type CursoNombreDTO = {
	id: number;
	division: string;
	turno: Turno;
};

