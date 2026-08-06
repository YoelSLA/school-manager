import { useNavigate } from "react-router-dom";
import { asistenciaPaths } from "../../constants";
import type { AsistenciaEmpleadoResumenDTO } from "../../types";

export function useAsistenciasNavigation() {
	const navigate = useNavigate();

	const buildState = (empleado: AsistenciaEmpleadoResumenDTO) => ({
		dynamicLabels: {
			[String(empleado.empleadoBasico.id)]:
				`${empleado.empleadoBasico.apellido}, ${empleado.empleadoBasico.nombre}`,
		},

		empleado: {
			nombre: empleado.empleadoBasico.nombre,
			apellido: empleado.empleadoBasico.apellido,
			cuil: empleado.empleadoBasico.cuil,
			roles: empleado.roles,
		},
	});

	return {
		verDetalle: (empleado: AsistenciaEmpleadoResumenDTO) => {
			const today = new Date();

			const anio = today.getFullYear();
			const mes = today.getMonth() + 1;

			navigate(asistenciaPaths.detail(empleado.empleadoBasico.id, anio, mes), {
				state: buildState(empleado),
			});
		},

		volverAlListado: () => {
			navigate(asistenciaPaths.list);
		},
	};
}
