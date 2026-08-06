export type CursoFiltro = "TODOS" | "MANIANA" | "TARDE" | "VESPERTINO";

export type CursoFiltersState = {
	cursoId?: string;
	materiaId?: string;
	orientacion?: string;
	estado?: string;
};
