import type {
	CausaBaja,
	Dia,
	EstadoAsignacion,
	EstadoDesignacion,
	EstadoLicencia,
	RolEducativo,
	SituacionDeRevista,
	Turno,
} from "../types/enums";

export const ESTADO_DESIGNACION_LABELS: Record<EstadoDesignacion, string> = {
	CUBIERTA: "Cubierta",
	VACANTE: "Vacante",
};

export const ESTADO_ASIGNACION_LABELS: Record<EstadoAsignacion, string> = {
	ACTIVA: "Activa",
	LICENCIA: "En licencia",
	FINALIZADA: "Finalizada",
	BAJA: "Dada de baja",
	PENDIENTE: "Pendiente",
};

export const ESTADO_LICENCIA_LABELS: Record<EstadoLicencia, string> = {
	PENDIENTE: "Pendiente",
	CUBIERTA: "Cubierta",
	DESCUBIERTA: "Descubierta",
	NO_VIGENTE: "No vigente",
};

export const SITUACION_REVISTA_LABELS: Record<SituacionDeRevista, string> = {
	TITULAR: "Titular",
	PROVISIONAL: "Provisional",
	SUPLENTE: "Suplente",
};

export const DIA_LABELS: Record<Dia, string> = {
	LUNES: "Lunes",
	MARTES: "Martes",
	MIERCOLES: "Miércoles",
	JUEVES: "Jueves",
	VIERNES: "Viernes",
};

export const TURNO_LABELS: Record<Turno, string> = {
	MANIANA: "Mañana",
	TARDE: "Tarde",
	VESPERTINO: "Vespertino",
};

export const CAUSA_BAJA_LABELS: Record<CausaBaja, string> = {
	RENUNCIA: "Renuncia por causas particulares",
	CESE_DE_FUNCIONES: "Cese de funciones",
	JUBILACION: "Jubilación",
	FALLECIMIENTO: "Fallecimiento",
	PASE_A_PROVISIONAL: "Pase de suplente a provisional",
	OTRA: "Otra",
};

export const ROL_EDUCATIVO_LABELS: Record<RolEducativo, string> = {
	AUXILIAR: "Auxiliar",
	BIBLIOTECARIO: "Bibliotecario",
	CAMBIO_DE_FUNCION: "Cambio de función",
	DIRECCION: "Dirección",
	ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL:
		"Encargo de medio de apoyo técnico profesional",
	VICEDIRECCION: "Vicedirección",
	SECRETARIA: "Secretaría",
	ORIENTACION_EDUCACIONAL: "Orientación educacional",
	ORIENTACION_SOCIAL: "Orientación social",
	PRECEPTORIA: "Preceptoría",
	DOCENTE: "Docente",
	RECALIFICACION_LABORAL_DEFINITIVA: "Recalificación laboral definitiva",
};
