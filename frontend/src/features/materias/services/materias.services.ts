import { http } from "@/services/axios";
import type { PageResponse } from "@/utils/types";
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

export async function editMateria(
	escuelaId: number,
	materiaId: number,
	payload: CrearMateriaDTO,
): Promise<MateriaResponseDTO> {
	const response = await http.put<MateriaResponseDTO>(
		`/escuelas/${escuelaId}/materias/${materiaId}`,
		payload,
	);

	return response.data;
}

export async function deleteMateria(
	escuelaId: number,
	materiaId: number,
): Promise<void> {
	await http.delete(`/escuelas/${escuelaId}/materias/${materiaId}`);
}

export async function obtenerMaterias(
	escuelaId: number,
	page: number = 0,
	size: number = 10,
): Promise<PageResponse<MateriaResponseDTO>> {
	const response = await http.get<PageResponse<MateriaResponseDTO>>(
		`/escuelas/${escuelaId}/materias`,
		{
			params: { page, size },
		},
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
