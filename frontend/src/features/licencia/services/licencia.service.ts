import { http } from "@/shared/http/http";
import type { PageResponse } from "@/shared/types";
import type {
	CambiarCoberturaDTO,
	CubrirDesignacionesConSuplente,
	LicenciaCreateDTO,
	LicenciaDesignacion,
	LicenciaDesignacionDTO,
	LicenciaDetalle,
	LicenciaDetalleDTO,
	LicenciaResumen,
	LicenciaResumenDTO,
	LicenciaTimelineItem,
	LicenciaTimelineItemDTO,
	RenovarLicenciaDTO,
} from "../types";

/* =========================================================
   QUERIES
========================================================= */

const getLicenciasPorEscuela = async (
	escuelaId: number,
	page = 0,
	size = 10,
): Promise<PageResponse<LicenciaResumen>> => {
	const { data } = await http.get<PageResponse<LicenciaResumenDTO>>(
		`/escuelas/${escuelaId}/licencias`,
		{
			params: { page, size },
		},
	);

	return data;
};

const getLicenciaDetalle = async (
	licenciaId: number,
): Promise<LicenciaDetalle> => {
	const { data } = await http.get<LicenciaDetalleDTO>(
		`/licencias/${licenciaId}`,
	);

	return data;
};

const getDesignacionesAfectadas = async (
	licenciaId: number,
): Promise<LicenciaDesignacion[]> => {
	const { data } = await http.get<LicenciaDesignacionDTO[]>(
		`/licencias/${licenciaId}/designaciones-afectadas`,
	);

	return data;
};

const getLicenciaTimeline = async (
	licenciaId: number,
): Promise<LicenciaTimelineItem[]> => {
	const { data } = await http.get<LicenciaTimelineItemDTO[]>(
		`/licencias/${licenciaId}/timeline`,
	);

	return data;
};

/* =========================================================
   MUTATIONS
========================================================= */

const crearLicencia = async (
	empleadoId: number,
	body: LicenciaCreateDTO,
): Promise<LicenciaDetalle> => {
	const { data } = await http.post<LicenciaDetalleDTO>(
		`/empleados/${empleadoId}`,
		body,
	);

	return data;
};

const cubrirDesignacionesConSuplente = async (
	licenciaId: number,
	body: CubrirDesignacionesConSuplente,
): Promise<void> => {
	await http.post(`/licencias/${licenciaId}/coberturas`, body);
};

const cambiarCobertura = async (
	licenciaId: number,
	designacionId: number,
	body: CambiarCoberturaDTO,
): Promise<void> => {
	await http.put(`/licencias/${licenciaId}/coberturas/${designacionId}`, body);
};

const renovarLicencia = async (
	licenciaId: number,
	body: RenovarLicenciaDTO,
): Promise<void> => {
	await http.post(`/licencias/${licenciaId}/renovaciones`, body);
};

const deleteLicencia = async (licenciaId: number): Promise<void> => {
	await http.delete(`/licencias/${licenciaId}`);
};

/* =========================================================
   SERVICE
========================================================= */

export const licenciaService = {
	// Queries
	getLicenciasPorEscuela,
	getLicenciaDetalle,
	getDesignacionesAfectadas,
	getLicenciaTimeline,

	// Mutations}
	crearLicencia,
	cubrirDesignacionesConSuplente,
	cambiarCobertura,
	renovarLicencia,
	deleteLicencia,
};
