import { EmpleadoEducativoForm } from "@/utils/schemas";
import {
  EmpleadoEducativoResponseDTO,
  EmpleadoSimpleResponseDTO,
} from "@/utils/types";
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

/* =====================
   LISTAR (completo)
===================== */
export const getEmpleadosPorEscuela = async (
  escuelaId: number
): Promise<EmpleadoEducativoResponseDTO[]> => {
  const { data } = await http.get<EmpleadoEducativoResponseDTO[]>(
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
): Promise<EmpleadoSimpleResponseDTO[]> => {
  const { data } = await http.get<EmpleadoSimpleResponseDTO[]>(
    `/escuelas/${escuelaId}/empleados`,
    {
      params: { search },
    }
  );

  return data;
};
