import { http } from "@/shared/http";
import type { PageResponse } from "@/shared/types";
import type {
	LicenciaEstatutariaCreateDTO,
	LicenciaEstatutariaResponseDTO,
	LicenciaEstatutariaUpdateDTO,
} from "../types";

/* =========================================================
   QUERIES
========================================================= */

const listLicenciasEstatutarias = async (
	page = 0,
	size = 10,
): Promise<PageResponse<LicenciaEstatutariaResponseDTO>> => {
	const { data } = await http.get<PageResponse<LicenciaEstatutariaResponseDTO>>(
		"/licencias-estatutarias",
		{
			params: { page, size },
		},
	);

	return data;
};

const getLicenciaEstatutaria = async (
	id: number,
): Promise<LicenciaEstatutariaResponseDTO> => {
	const { data } = await http.get<LicenciaEstatutariaResponseDTO>(
		`/licencias-estatutarias/${id}`,
	);

	return data;
};

/* =========================================================
   MUTATIONS
========================================================= */

const createLicenciaEstatutaria = async (
	payload: LicenciaEstatutariaCreateDTO,
): Promise<LicenciaEstatutariaResponseDTO> => {
	const { data } = await http.post<LicenciaEstatutariaResponseDTO>(
		"/licencias-estatutarias",
		null,
		{
			params: payload,
		},
	);

	return data;
};

const updateLicenciaEstatutaria = async (
	id: number,
	payload: LicenciaEstatutariaUpdateDTO,
): Promise<LicenciaEstatutariaResponseDTO> => {
	const { data } = await http.put<LicenciaEstatutariaResponseDTO>(
		`/licencias-estatutarias/${id}`,
		null,
		{
			params: payload,
		},
	);

	return data;
};

const deleteLicenciaEstatutaria = async (id: number): Promise<void> => {
	await http.delete(`/licencias-estatutarias/${id}`);
};

/* =========================================================
   SERVICE
========================================================= */

export const licenciaEstatutariaService = {
	// Queries
	listLicenciasEstatutarias,
	getLicenciaEstatutaria,

	// Mutations
	createLicenciaEstatutaria,
	updateLicenciaEstatutaria,
	deleteLicenciaEstatutaria,
};
