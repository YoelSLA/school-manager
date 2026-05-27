import { empleadosEducativosPaths } from "@/app/router/paths";
import type { EmpleadoEducativoDetalleDTO } from "@/shared/utils/types";
import { useNavigate } from "react-router-dom";

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

		// ✅ NUEVOS
		crearCargo: (empleado: EmpleadoEducativoDetalleDTO) =>
			navigate(empleadosEducativosPaths.crearCargo(empleado.id), {
				state: buildState(empleado),
			}),

		crearLicencia: (empleado: EmpleadoEducativoDetalleDTO) =>
			navigate(empleadosEducativosPaths.crearLicencia(empleado.id), {
				state: buildState(empleado),
			}),
	};
};
