import type { PeriodoAbiertoDTO } from "@/utils/types";
import type { DesignacionMinimaDTO } from "../../designaciones/types/designacion.types";
import type { EmpleadoEducativoMinimoDTO } from "../../empleadosEducativos/types/empleadosEducativos.types";

type AsignacionBaseDTO = {
	situacionDeRevista: SituacionDeRevista;
	fechaTomaPosesion: string;
	fechaCese: string;
};

export type AsignacionCreateDTO = AsignacionBaseDTO & {
	empleadoId: number;
	tipoAsignacion: string;
};

type AsignacionHistoricaDTO = AsignacionBaseDTO & {
	id: number;
	fechaBaja: string;
	causaBaja: string;
	disponible: boolean;
	estadoAsignacion: EstadoAsignacion;
};

export type AsignacionDetalleDTO = {
	id: number;
	empleado: EmpleadoEducativoMinimoDTO;
	periodo: PeriodoAbiertoDTO;
	situacionDeRevista: SituacionDeRevista;
	fechaBaja: string;
	causaBaja: string;
	estadoAsignacion: EstadoAsignacion;
};

export type AsignacionAfectadaPorLicenciaDTO = AsignacionHistoricaDTO & {
	designacion: DesignacionMinimaDTO;
};

export enum SituacionDeRevista {
	TITULAR = "TITULAR",
	PROVISIONAL = "PROVISIONAL",
	SUPLENTE = "SUPLENTE",
}

export enum EstadoAsignacion {
	ACTIVA = "ACTIVA",
	LICENCIA = "LICENCIA",
	FINALIZADA = "FINALIZADA",
	BAJA = "BAJA",
	PENDIENTE = "PENDIENTE",
}

export type FiltroCargos = "LICENCIA" | "FINALIZADA" | "BAJA" | "PENDIENTE";

export enum CaracteristicaAsignacion {
	NORMAL = "NORMAL",
	CAMBIO_DE_FUNCION = "CAMBIO_DE_FUNCION",
	RECALIFICACION_LABORAL_DEFINITIVA = "RECALIFICACION_LABORAL_DEFINITIVA",
}
