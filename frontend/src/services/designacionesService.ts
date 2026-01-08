import { AsignacionCreateDTO } from "@/utils/types/asignacion";
import {
  DesignacionAdministrativaCreateDTO,
  DesignacionAdministrativaResumenDTO,
  DesignacionCursoCreateDTO,
  DesignacionCursoDetalleDTO,
  DesignacionCursoResumenDTO,
  DesignacionDetalleDTO,
} from "@/utils/types/designacion";
import { http } from "./axios";

export async function crearDesignacionAdministrativa(
  escuelaId: number,
  data: DesignacionAdministrativaCreateDTO
): Promise<void> {
  await http.post(`/escuelas/${escuelaId}/designaciones/administrativas`, data);
}

export async function crearDesignacionCurso(
  escuelaId: number,
  data: DesignacionCursoCreateDTO
): Promise<void> {
  await http.post(`/escuelas/${escuelaId}/designaciones/administrativas`, data);
}

export const crearAsignacion = async (
  designacionId: number,
  payload: AsignacionCreateDTO
): Promise<void> => {
  await http.post(`/designaciones/${designacionId}/asignaciones`, payload);
};

export async function listarDesignacionesAdministrativas(
  escuelaId: number
): Promise<DesignacionAdministrativaResumenDTO[]> {
  const { data } = await http.get<DesignacionAdministrativaResumenDTO[]>(
    `/escuelas/${escuelaId}/designaciones/administrativas`
  );

  return data;
}

export const obtenerDesignacionDetalle = async (
  designacionId: number
): Promise<DesignacionDetalleDTO> => {
  const { data } = await http.get<DesignacionCursoDetalleDTO>(
    `/designaciones/${designacionId}`
  );

  return data;
};

export const obtenerCursosPorEscuela = async (
  escuelaId: number
): Promise<DesignacionCursoResumenDTO[]> => {
  const { data } = await http.get(
    `/escuelas/${escuelaId}/designaciones/cursos`
  );
  return data;
};
