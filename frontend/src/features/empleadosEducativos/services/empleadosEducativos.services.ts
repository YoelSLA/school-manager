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
): Promise<EmpleadoEducativoDetalleDTO[]> => {
	const { data } = await http.get<EmpleadoEducativoDetalleDTO[]>(
		`/escuelas/${escuelaId}/empleadosEducativos`,
		{
			params: estado !== "TODOS" ? { estado } : {},
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
