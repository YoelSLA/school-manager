import { http } from "@/shared/api/http";
import type {
	MateriaCreateDTO,
	MateriaDetalleDTO,
	MateriaUpdateDTO,
	PageResponse,
} from "@/shared/types";

export async function createMateria(
	escuelaId: number,
	payload: MateriaCreateDTO,
): Promise<MateriaDetalleDTO> {
	const response = await http.post<MateriaDetalleDTO>(
		`/escuelas/${escuelaId}/materias`,
		payload,
	);

	return response.data;
}

export async function updateMateria(
	escuelaId: number,
	materiaId: number,
	payload: MateriaUpdateDTO,
): Promise<MateriaDetalleDTO> {
	const response = await http.put<MateriaDetalleDTO>(
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

export async function listMaterias(
	escuelaId: number,
	page: number = 0,
	size: number = 10,
): Promise<PageResponse<MateriaDetalleDTO>> {
	const response = await http.get<PageResponse<MateriaDetalleDTO>>(
		`/escuelas/${escuelaId}/materias`,
		{
			params: { page, size },
		},
	);

	return response.data;
}
