import { RolEducativo } from ".";
import { AsignacionDetalleDTO } from "./asignacion";
import {
  FranjaHorariaCreateDTO,
  FranjaHorariaMinimoDTO,
} from "./franjaHoraria";

// --------------------------------------------------------------------

type DesignacionCreateDTO = {
  cupof: number;
  franjasHorarias: FranjaHorariaCreateDTO[];
};

export type DesignacionAdministrativaCreateDTO = DesignacionCreateDTO & {
  rolEducativo: RolEducativo;
};

export type DesignacionCursoCreateDTO = DesignacionCreateDTO & {
  materiaId: number;
  cursoId: number;
  orientacion: string;
};

// --------------------------------------------------------------------

type DesignacionResumenDTO = {
  id: number;
  cupof: number;
  tieneAsignacionActiva: boolean;
  estaCubierta: boolean;
  pendientePorLicencia: boolean;
  rolEducativo: RolEducativo;
  franjasHorarias: FranjaHorariaMinimoDTO[];
};

export type DesignacionAdministrativaResumenDTO = DesignacionResumenDTO;

export type DesignacionCursoResumenDTO = DesignacionResumenDTO & {
  materia: string;
  curso: string;
  orientacion: string;
};

// --------------------------------------------------------------------
export type DesignacionDetalleBaseDTO = {
  id: number;
  cupof: number;
  tieneAsignacionActiva: boolean;
  estaCubierta: boolean;
  pendientePorLicencia: boolean;
  rolEducativo: RolEducativo;
  tipo: "ADMINISTRATIVA" | "CURSO";
  asignaciones: AsignacionDetalleDTO[];
  franjasHorarias: FranjaHorariaMinimoDTO[];
};

export type DesignacionAdministrativaDetalleDTO = DesignacionDetalleBaseDTO & {
  tipo: "ADMINISTRATIVA";
};

export type DesignacionCursoDetalleDTO = DesignacionDetalleBaseDTO & {
  tipo: "CURSO";
  materia: string;
  curso: string;
  orientacion: string;
};

export type DesignacionDetalleDTO =
  | DesignacionAdministrativaDetalleDTO
  | DesignacionCursoDetalleDTO;

// --------------------------------------------------------------------

export type DesignacionMinimaDTO = {
  id: number;
  cupof: number;
  rolEducativo: RolEducativo;
};

export type DesignacionAdministrativaMinimaDTO = DesignacionMinimaDTO;

export type DesignacionCursoMinimaDTO = DesignacionMinimaDTO & {
  materia: string;
  curso: string;
};
