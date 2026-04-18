import { http } from "@/axiosTemplate";
import type {
	CubrirDesignacionesConSuplente,
	LicenciaDesignacion,
	LicenciaDesignacionDTO,
	LicenciaDetalle,
	LicenciaDetalleDTO,
	LicenciaResumen,
	LicenciaResumenDTO,
	LicenciaTimelineItem,
	LicenciaTimelineItemDTO,
	PageResponse,
	RenovarLicenciaDTO,
} from "@/utils/types";
import { CambiarCoberturaDTO } from "../form/cambiarCobertura.schema";

export const cubrirDesignacionesConSuplente = async (
	licenciaId: number,
	body: CubrirDesignacionesConSuplente,
): Promise<void> => {
	await http.post(`/licencias/${licenciaId}/coberturas`, body);
};

export const cambiarCobertura = async (
	licenciaId: number,
	designacionId: number,
	body: CambiarCoberturaDTO,
): Promise<void> => {
	await http.put(
		`/licencias/${licenciaId}/coberturas/${designacionId}`,
		body,
	);
};

export const renovarLicencia = async (
	licenciaId: number,
	body: RenovarLicenciaDTO,
): Promise<void> => {
	await http.post(`/licencias/${licenciaId}/renovaciones`, body);
};

export const getLicenciaDetalle = async (
	licenciaId: number,
): Promise<LicenciaDetalle> => {
	const { data } = await http.get<LicenciaDetalleDTO>(`/licencias/${licenciaId}`);
	return data;
};

export const getLicenciasPorEscuela = async (
	escuelaId: number,
	page: number = 0,
	size: number = 10,
): Promise<PageResponse<LicenciaResumen>> => {
	const { data } = await http.get<PageResponse<LicenciaResumenDTO>>(
		`/escuelas/${escuelaId}/licencias`,
		{
			params: { page, size },
		},
	);

	return data;
};

export const getDesignacionesAfectadas = async (
	licenciaId: number,
): Promise<LicenciaDesignacion[]> => {
	const { data } = await http.get<LicenciaDesignacionDTO[]>(
		`/licencias/${licenciaId}/designaciones-afectadas`,
	);

	return data;
};

export const getLicenciaTimeline = async (
	licenciaId: number,
): Promise<LicenciaTimelineItem[]> => {
	const { data } = await http.get<LicenciaTimelineItemDTO[]>(
		`/licencias/${licenciaId}/timeline`,
	);

	return data;
};

export const deleteLicencia = async (licenciaId: number): Promise<void> => {
	await http.delete(`/licencias/${licenciaId}`);
};