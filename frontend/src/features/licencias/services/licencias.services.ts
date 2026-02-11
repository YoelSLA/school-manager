import { http } from "@/services/axios";
import type {
	CubrirDesignacionesRequest,
	LicenciaDetalleDTO,
	LicenciaResumenDTO,
	RenovarLicenciaDTO,
} from "../types/licencia.types";

export const getLicenciasPorEscuela = async (
	escuelaId: number,
): Promise<LicenciaResumenDTO[]> => {
	const { data } = await http.get<LicenciaResumenDTO[]>(
		`/escuelas/${escuelaId}/licencias`,
	);
	return data;
};

export const getLicenciaDetalle = async (
	licenciaId: number,
): Promise<LicenciaDetalleDTO> => {
	const { data } = await http.get(`/licencias/${licenciaId}`);
	return data;
};

export const cubrirDesignacionesConSuplente = async (
	licenciaId: number,
	body: CubrirDesignacionesRequest,
): Promise<void> => {
	await http.post(`/licencias/${licenciaId}/coberturas`, body);
};

export const renovarLicencia = async (
	licenciaId: number,
	body: RenovarLicenciaDTO,
): Promise<void> => {
	await http.post(`/licencias/${licenciaId}/renovaciones`, body);
};
