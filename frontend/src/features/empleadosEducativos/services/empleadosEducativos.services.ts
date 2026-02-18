import type { LicenciaCreateDTO } from "@/features/licencias/types/licencia.types";
import { http } from "@/services/axios";
import type {
	EmpleadoEducativoDetalleDTO,
	EmpleadoEducativoFiltro,
	EmpleadoEducativoMinimoDTO,
} from "../types/empleadosEducativos.types";
import type {
	EmpleadoEducativoCreateDTO,
	EmpleadoEducativoUpdateDTO,
} from "../form/empleadoEducativo.form.types";
import type { PageResponse, SortState } from "@/utils/types";
import { buildSortQuery } from "../utils/empleadosEducativos.utils";
import qs from "qs";

export const crearEmpleadoEducativo = async (
	escuelaId: number,
	payload: EmpleadoEducativoCreateDTO,
): Promise<void> => {
	await http.post(`/escuelas/${escuelaId}/empleadosEducativos`, payload);
};

export const editarEmpleadoEducativo = async (
	escuelaId: number,
	empleadoId: number,
	payload: EmpleadoEducativoUpdateDTO,
): Promise<void> => {
	await http.put(
		`/escuelas/${escuelaId}/empleadosEducativos/${empleadoId}`,
		payload,
	);
};

export const crearLicencia = async (
	empleadoId: number,
	payload: LicenciaCreateDTO,
): Promise<void> => {
	await http.post(`/empleadosEducativos/${empleadoId}/licencias`, payload);
};

export const getEmpleadosPorEscuela = async (
	escuelaId: number,
	estado: EmpleadoEducativoFiltro = "TODOS",
	page: number = 0,
	size: number = 10,
	sort: SortState = { apellido: "asc" },
): Promise<PageResponse<EmpleadoEducativoDetalleDTO>> => {
	const sortParams = buildSortQuery(sort);

	const params = {
		...(estado !== "TODOS" && { estado }),
		page,
		size,
		...(sortParams.length > 0 && { sort: sortParams }),
	};

	const { data } = await http.get<PageResponse<EmpleadoEducativoDetalleDTO>>(
		`/escuelas/${escuelaId}/empleadosEducativos`,
		{
			params,
			paramsSerializer: (params) =>
				qs.stringify(params, { arrayFormat: "repeat" }),
		},
	);

	return data;
};

export const buscarEmpleadosPorEscuela = async (
	escuelaId: number,
	search: string,
): Promise<EmpleadoEducativoMinimoDTO[]> => {
	const { data } = await http.get<EmpleadoEducativoDetalleDTO[]>(
		`/escuelas/${escuelaId}/empleadosEducativos`,
		{
			params: { search },
		},
	);

	return data;
};

export const getEmpleadoEducativoById = async (
	empleadoId: number,
): Promise<EmpleadoEducativoDetalleDTO> => {
	const { data } = await http.get<EmpleadoEducativoDetalleDTO>(
		`/empleadosEducativos/${empleadoId}`,
	);

	return data;
};

export const darDeBajaDefinitiva = async (
	empleadoId: number,
	payload: {
		fechaBaja: string;
		causa: string;
	},
): Promise<void> => {
	await http.post(
		`/empleadosEducativos/${empleadoId}/baja-definitiva`,
		payload,
	);
};

export const reactivarEmpleado = async (empleadoId: number): Promise<void> => {
	await http.post(`/empleadosEducativos/${empleadoId}/reactivar`);
};
