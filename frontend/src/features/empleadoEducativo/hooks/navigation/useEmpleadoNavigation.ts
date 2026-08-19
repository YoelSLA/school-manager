import { useNavigate } from "react-router-dom";
import { empleadoEducativoPaths } from "../../constants";
import type { EmpleadoEducativoDetalleDTO } from "../../types";

export const useEmpleadoNavigation = () => {
	const navigate = useNavigate();

	/* =================================
	   STATE BASE DEL EMPLEADO
	================================= */

	const buildState = (empleado: EmpleadoEducativoDetalleDTO) => ({
		breadcrumbs: [
			{
				label: "Empleados educativos",
				to: empleadoEducativoPaths.base,
			},
			{
				label: `${empleado.apellido}, ${empleado.nombre}`,
			},
		],
		empleado,
	});

	return {
		/* =================================
		   LISTADO
		================================= */

		listar: () => navigate(empleadoEducativoPaths.base),

		/* =================================
		   DETALLE
		================================= */

		verDetalle: (empleado: EmpleadoEducativoDetalleDTO) =>
			navigate(empleadoEducativoPaths.detail(empleado.id), {
				state: buildState(empleado),
			}),

		/* =================================
		   EDITAR
		================================= */

		editar: (empleado: EmpleadoEducativoDetalleDTO) =>
			navigate(empleadoEducativoPaths.edit(empleado.id), {
				state: buildState(empleado),
			}),

		/* =================================
		   CREAR
		================================= */

		crear: () => navigate(empleadoEducativoPaths.create),

		/* =================================
		   CREAR CARGO
		================================= */

		crearCargo: (empleado: EmpleadoEducativoDetalleDTO) =>
			navigate(empleadoEducativoPaths.crearCargo(empleado.id), {
				state: {
					...buildState(empleado),
					breadcrumbs: [
						{
							label: "Empleados educativos",
							to: empleadoEducativoPaths.base,
						},
						{
							label: `${empleado.apellido}, ${empleado.nombre}`,
							to: empleadoEducativoPaths.detail(empleado.id),
						},
						{
							label: "Crear cargo",
						},
					],
				},
			}),

		/* =================================
		   CREAR LICENCIA
		================================= */

		crearLicencia: (empleado: EmpleadoEducativoDetalleDTO) =>
			navigate(empleadoEducativoPaths.crearLicencia(empleado.id), {
				state: {
					...buildState(empleado),
					breadcrumbs: [
						{
							label: "Empleados educativos",
							to: empleadoEducativoPaths.base,
						},
						{
							label: `${empleado.apellido}, ${empleado.nombre}`,
							to: empleadoEducativoPaths.detail(empleado.id),
						},
						{
							label: "Crear licencia",
						},
					],
				},
			}),
	};
};
