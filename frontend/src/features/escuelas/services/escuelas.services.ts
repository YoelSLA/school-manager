import { http } from "@/services/axios";
import type {
	ActualizarEscuelaDTO,
	CrearEscuelaDTO,
	Escuela,
} from "../types/escuela.types";

export const crearEscuela = async (data: CrearEscuelaDTO): Promise<Escuela> => {
	const { data: escuela } = await http.post<Escuela>("/escuelas", data);
	return escuela;
};

export const getEscuelas = async (): Promise<Escuela[]> => {
	const { data } = await http.get<Escuela[]>("/escuelas");
	return data;
};

export const actualizarEscuela = async (
	id: number,
	data: ActualizarEscuelaDTO,
): Promise<Escuela> => {
	const { data: escuela } = await http.put<Escuela>(`/escuelas/${id}`, data);
	return escuela;
};

export const eliminarEscuela = async (id: number): Promise<void> => {
	await http.delete(`/escuelas/${id}`);
};
