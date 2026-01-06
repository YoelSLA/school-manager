import type { CrearLicenciaDTO, LicenciaResponseDTO } from "@/utils/types";
import { http } from "./axios";

export const getLicenciasPorEscuela = async (
  escuelaId: number
): Promise<LicenciaResponseDTO[]> => {
  const { data } = await http.get<LicenciaResponseDTO[]>(
    `/escuelas/${escuelaId}/licencias`
  );
  return data;
};

export const solicitarLicencia = async (
  designacionId: number,
  data: CrearLicenciaDTO
): Promise<Licencia> => {
  const { data: licencia } = await http.post<Licencia>(
    `/designaciones/${designacionId}/licencias`,
    data
  );
  return licencia;
};
