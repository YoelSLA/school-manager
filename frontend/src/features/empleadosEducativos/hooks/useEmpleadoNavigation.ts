import { useNavigate } from "react-router-dom";
import { empleadosEducativosPaths } from "@/router/paths";
import type { EmpleadoEducativoDetalleDTO } from "../types/empleadosEducativos.types";

export const useEmpleadoNavigation = () => {
	const navigate = useNavigate();

	const buildState = (empleado: EmpleadoEducativoDetalleDTO) => ({
		dynamicLabels: {
			[String(empleado.id)]: `${empleado.apellido}, ${empleado.nombre}`,
		},
	});

	return {
		listar: () => navigate(empleadosEducativosPaths.base),

		verDetalle: (empleado: EmpleadoEducativoDetalleDTO) =>
			navigate(empleadosEducativosPaths.detail(empleado.id), {
				state: buildState(empleado),
			}),

		editar: (empleado: EmpleadoEducativoDetalleDTO) =>
			navigate(empleadosEducativosPaths.edit(empleado.id), {
				state: buildState(empleado),
			}),

		crear: () => navigate(empleadosEducativosPaths.create),
	};
};
