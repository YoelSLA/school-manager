import {
  DesignacionAdministrativaCompletaDTO,
  DesignacionAdministrativaCreateDTO,
  DesignacionAdministrativaResponseDTO,
  DesignacionCursoResumenDTO,
} from "@/utils/types";
import { http } from "./axios";

export async function crearDesignacionAdministrativa(
  escuelaId: number,
  data: DesignacionAdministrativaCreateDTO
): Promise<void> {
  await http.post(`/escuelas/${escuelaId}/designaciones/administrativas`, data);
}

export async function listarDesignacionesAdministrativas(
  escuelaId: number
): Promise<DesignacionAdministrativaResponseDTO[]> {
  const { data } = await http.get<DesignacionAdministrativaResponseDTO[]>(
    `/escuelas/${escuelaId}/designaciones/administrativas`
  );

  return data;
}

export async function obtenerDesignacionAdministrativaCompleta(
  escuelaId: number,
  designacionId: number
): Promise<DesignacionAdministrativaCompletaDTO> {
  const { data } = await http.get<DesignacionAdministrativaCompletaDTO>(
    `/escuelas/${escuelaId}/designaciones/administrativas/${designacionId}`
  );

  return data;
}

export type CrearAsignacionPayload = {
  empleadoId: number;
  situacionDeRevista: string;
  tipoAsignacion: string;
  fechaTomaPosesion: string;
  fechaCese: string;
};

export const crearAsignacion = async (
  designacionId: number,
  payload: CrearAsignacionPayload
): Promise<void> => {
  await http.post(`/designaciones/${designacionId}/asignaciones`, payload);
};

export const obtenerCursosPorEscuela = async (
  escuelaId: number
): Promise<DesignacionCursoResumenDTO[]> => {
  const { data } = await http.get(
    `/escuelas/${escuelaId}/designaciones/cursos`
  );
  return data;
};
