import { useNavigate } from "react-router-dom";
import { asistenciaPaths } from "../../constants";
import type { AsistenciaEmpleadoResumenDTO } from "../../types";

export function useAsistenciasNavigation() {
	const navigate = useNavigate();

	const buildState = (empleado: AsistenciaEmpleadoResumenDTO) => {
		const _empleadoId = empleado.empleadoBasico.id;

		const empleadoNombre = `${empleado.empleadoBasico.apellido}, ${empleado.empleadoBasico.nombre}`;

		const breadcrumbs = [
			{
				label: "Asistencias",
				to: "/asistencias",
			},
			{
				label: empleadoNombre,
			},
		];

		return {
			breadcrumbs,

			empleado: {
				nombre: empleado.empleadoBasico.nombre,
				apellido: empleado.empleadoBasico.apellido,
				cuil: empleado.empleadoBasico.cuil,
				roles: empleado.roles,
			},
		};
	};

	return {
		/* =================================
		   DETALLE
		================================= */

		verDetalle: (empleado: AsistenciaEmpleadoResumenDTO) => {
			const today = new Date();

			const anio = today.getFullYear();
			const mes = today.getMonth() + 1;

			const state = buildState(empleado);

			navigate(asistenciaPaths.detail(empleado.empleadoBasico.id, anio, mes), {
				state,
			});
		},

		/* =================================
		   LISTADO
		================================= */

		volverAlListado: () => {
			navigate(asistenciaPaths.list);
		},
	};
}
