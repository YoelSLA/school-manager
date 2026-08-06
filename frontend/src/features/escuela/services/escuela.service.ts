import { http } from "@/shared/http";
import type {
	EscuelaCreateDTO,
	EscuelaResponseDTO,
	EscuelaUpdateDTO,
} from "../types";

/* =========================================================
   QUERIES
========================================================= */

const getEscuelas = async (): Promise<EscuelaResponseDTO[]> => {
	const { data } = await http.get<EscuelaResponseDTO[]>("/escuelas");

	return data;
};

/* =========================================================
   MUTATIONS
========================================================= */

const crearEscuela = async (
	data: EscuelaCreateDTO,
): Promise<EscuelaResponseDTO> => {
	const { data: escuela } = await http.post<EscuelaResponseDTO>(
		"/escuelas",
		data,
	);

	return escuela;
};

const actualizarEscuela = async (
	id: number,
	data: EscuelaUpdateDTO,
): Promise<EscuelaResponseDTO> => {
	const { data: escuela } = await http.put<EscuelaResponseDTO>(
		`/escuelas/${id}`,
		data,
	);

	return escuela;
};

const eliminarEscuela = async (id: number): Promise<void> => {
	await http.delete(`/escuelas/${id}`);
};

/* =========================================================
   SERVICE
========================================================= */

export const escuelaService = {
	// Queries
	getEscuelas,

	// Mutations
	crearEscuela,
	actualizarEscuela,
	eliminarEscuela,
};
