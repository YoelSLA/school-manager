import { SituacionDeRevista } from ".";
import { DesignacionMinimaDTO } from "./designacion";
import { EmpleadoEducativoMinimoDTO } from "./empleadoEducativo";

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
};

export type AsignacionDetalleDTO = AsignacionHistoricaDTO & {
  empleado: EmpleadoEducativoMinimoDTO;
};

export type AsignacionAfectadaPorLicenciaDTO = AsignacionHistoricaDTO & {
  designacion: DesignacionMinimaDTO;
};
