import { AsignacionDetalleDTO } from "@/utils/types/asignacion";
import { LicenciaResponseDTO } from "@/utils/types/licencia";
import { http } from "./axios";

export const getLicenciasPorEscuela = async (
  escuelaId: number
): Promise<LicenciaResponseDTO[]> => {
  const { data } = await http.get<LicenciaResponseDTO[]>(
    `/escuelas/${escuelaId}/licencias`
  );
  return data;
};

export const getLicenciasPorDesignacion = async (
  designacionId: number
): Promise<LicenciaResponseDTO[]> => {
  const { data } = await http.get(`/designaciones/${designacionId}/licencias`);
  return data;
};

export const getAsignacionesActivasPorEmpleado = async (
  empleadoId: number
): Promise<AsignacionDetalleDTO[]> => {
  const { data } = await http.get(
    `/empleadosEducativos/${empleadoId}/asignaciones-activas`
  );
  return data;
};
