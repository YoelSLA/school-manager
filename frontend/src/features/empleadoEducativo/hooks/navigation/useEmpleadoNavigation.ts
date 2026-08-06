import { useNavigate } from "react-router-dom";
import { empleadoEducativoPaths } from "../../constants";
import type { EmpleadoEducativoDetalleDTO } from "../../types";

export const useEmpleadoNavigation = () => {
	const navigate = useNavigate();

	const buildState = (empleado: EmpleadoEducativoDetalleDTO) => ({
		dynamicLabels: {
			[String(empleado.id)]: `${empleado.apellido}, ${empleado.nombre}`,
		},
	});

	return {
		listar: () => navigate(empleadoEducativoPaths.base),

		verDetalle: (empleado: EmpleadoEducativoDetalleDTO) =>
			navigate(empleadoEducativoPaths.detail(empleado.id), {
				state: buildState(empleado),
			}),

		editar: (empleado: EmpleadoEducativoDetalleDTO) =>
			navigate(empleadoEducativoPaths.edit(empleado.id), {
				state: buildState(empleado),
			}),

		crear: () => navigate(empleadoEducativoPaths.create),

		// ✅ NUEVOS
		crearCargo: (empleado: EmpleadoEducativoDetalleDTO) =>
			navigate(empleadoEducativoPaths.crearCargo(empleado.id), {
				state: buildState(empleado),
			}),

		crearLicencia: (empleado: EmpleadoEducativoDetalleDTO) =>
			navigate(empleadoEducativoPaths.crearLicencia(empleado.id), {
				state: buildState(empleado),
			}),
	};
};
