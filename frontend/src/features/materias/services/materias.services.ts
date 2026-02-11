import { http } from "@/services/axios";
import type {
	CrearMateriaDTO,
	MateriaNombreDTO,
	MateriaResponseDTO,
} from "../types/materias.types";

export async function crearMateria(
	escuelaId: number,
	payload: CrearMateriaDTO,
): Promise<MateriaResponseDTO> {
	const response = await http.post<MateriaResponseDTO>(
		`/escuelas/${escuelaId}/materias`,
		payload,
	);

	return response.data;
}

export async function obtenerMaterias(
	escuelaId: number,
): Promise<MateriaResponseDTO[]> {
	const response = await http.get<MateriaResponseDTO[]>(
		`/escuelas/${escuelaId}/materias`,
	);

	return response.data;
}

export async function obtenerMateriasNombres(
	escuelaId: number,
): Promise<MateriaNombreDTO[]> {
	const response = await http.get<MateriaNombreDTO[]>(
		`/escuelas/${escuelaId}/materias/nombres`,
	);

	return response.data;
}
