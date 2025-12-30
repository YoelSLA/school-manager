import axios from "axios";
import { EmpleadoEducativoForm } from "../validations/empleadoEducativoSchema";

const API_URL = "http://localhost:8080/api/empleado_educativo";

export const getAllEmpleadosEducativos = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data)
  return response.data; 
};

export const existeCuil = async (cuil: string): Promise<boolean> => {
  const response = await axios.get<boolean>(
    "/api/empleado_educativo/existe-cuil",
    { params: { cuil } }
  );
  return response.data;
};

export const crearEmpleadoEducativo = async (
  data: EmpleadoEducativoForm & { escuelaId: string }
): Promise<void> => {
  await axios.post("/api/empleado_educativo", data);
};