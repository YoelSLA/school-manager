import { http } from "@/shared/http/http";
import type { PageResponse } from "@/shared/types";
import type {
	MateriaCreateDTO,
	MateriaDetalleDTO,
	MateriaSelectDTO,
	MateriaUpdateDTO,
} from "../types";

/* =========================================================
   QUERIES
========================================================= */

const listMaterias = async (
	escuelaId: number,
	page = 0,
	size = 10,
): Promise<PageResponse<MateriaDetalleDTO>> => {
	const { data } = await http.get<PageResponse<MateriaDetalleDTO>>(
		`/escuelas/${escuelaId}/materias`,
		{
			params: { page, size },
		},
	);

	return data;
};

const listMateriasSelect = async (
	escuelaId: number,
): Promise<MateriaSelectDTO[]> => {
	const { data } = await http.get<MateriaSelectDTO[]>(
		`/escuelas/${escuelaId}/materias/select`,
	);

	return data;
};

/* =========================================================
   MUTATIONS
========================================================= */

const createMateria = async (
	escuelaId: number,
	payload: MateriaCreateDTO,
): Promise<MateriaDetalleDTO> => {
	const { data } = await http.post<MateriaDetalleDTO>(
		`/escuelas/${escuelaId}/materias`,
		payload,
	);

	return data;
};

const updateMateria = async (
	escuelaId: number,
	materiaId: number,
	payload: MateriaUpdateDTO,
): Promise<MateriaDetalleDTO> => {
	const { data } = await http.put<MateriaDetalleDTO>(
		`/escuelas/${escuelaId}/materias/${materiaId}`,
		payload,
	);

	return data;
};

const deleteMateria = async (
	escuelaId: number,
	materiaId: number,
): Promise<void> => {
	await http.delete(`/escuelas/${escuelaId}/materias/${materiaId}`);
};

/* =========================================================
   SERVICE
========================================================= */

export const materiaService = {
	// Queries
	listMaterias,
	listMateriasSelect,

	// Mutations
	createMateria,
	updateMateria,
	deleteMateria,
};
