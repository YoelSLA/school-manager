import { http } from "@/services/axios";
import type {
	CrearMateriaDTO,
	MateriaNombreDTO,
	MateriaResponseDTO,
} from "../types/materias.types";
import type { PageResponse } from "@/utils/types";

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
