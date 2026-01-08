import { EmpleadoEducativoForm } from "@/utils/schemas";
import {
  EmpleadoEducativoDetalleDTO,
  EmpleadoEducativoMinimoDTO,
} from "@/utils/types/empleadoEducativo";
import { LicenciaCreateDTO } from "@/utils/types/licencia";
import { http } from "./axios";

/* =====================
   CREAR
===================== */
export const crearEmpleadoEducativo = async (
  escuelaId: number,
  payload: EmpleadoEducativoForm
): Promise<void> => {
  await http.post(`/escuelas/${escuelaId}/empleados`, payload);
};

export const crearLicencia = async (
  empleadoId: number,
  payload: LicenciaCreateDTO
): Promise<void> => {
  await http.post(`/empleadosEducativos/${empleadoId}/licencias`, payload);
};

/* =====================
   LISTAR (completo)
===================== */
export const getEmpleadosPorEscuela = async (
  escuelaId: number
): Promise<EmpleadoEducativoDetalleDTO[]> => {
  const { data } = await http.get<EmpleadoEducativoDetalleDTO[]>(
    `/escuelas/${escuelaId}/empleados`
  );
  return data;
};

/* =====================
   BUSCAR (autocomplete)
===================== */
export const buscarEmpleadosPorEscuela = async (
  escuelaId: number,
  search: string
): Promise<EmpleadoEducativoMinimoDTO[]> => {
  const { data } = await http.get<EmpleadoEducativoDetalleDTO[]>(
    `/escuelas/${escuelaId}/empleados`,
    {
      params: { search },
    }
  );

  return data;
};
