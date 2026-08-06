import type { EstadoDesignacion } from "@/shared/types/enums";

export type DesignacionFiltro = "ADMIN" | "CURSO";
export type DesignacionTab = "DOCENTE" | "ADMINISTRATIVO";

export type DesignacionCursoFilter = {
	cursoId?: string;
	materiaId?: string;
	orientacion?: string;
	estado?: string;
};

export interface DesignacionCursoFilterDTO {
	cursoId: number;
	materiaId: number;
	orientacion: string;
	estado: EstadoDesignacion;
}
