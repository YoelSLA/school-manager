import { http } from "@/services/axios";
import { EscuelaCreateDTO, EscuelaResponseDTO, EscuelaUpdateDTO } from "@/utils/types";

export const crearEscuela = async (data: EscuelaCreateDTO): Promise<EscuelaResponseDTO> => {
	const { data: escuela } = await http.post<EscuelaResponseDTO>("/escuelas", data);
	return escuela;
};

export const getEscuelas = async (): Promise<EscuelaResponseDTO[]> => {
	const { data } = await http.get<EscuelaResponseDTO[]>("/escuelas");
	return data;
};

export const actualizarEscuela = async (
	id: number,
	data: EscuelaUpdateDTO,
): Promise<EscuelaResponseDTO> => {
	const { data: escuela } = await http.put<EscuelaResponseDTO>(`/escuelas/${id}`, data);
	return escuela;
};

export const eliminarEscuela = async (id: number): Promise<void> => {
	await http.delete(`/escuelas/${id}`);
};
