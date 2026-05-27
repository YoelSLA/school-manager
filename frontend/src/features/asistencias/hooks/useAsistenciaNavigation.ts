import { useNavigate } from "react-router-dom";
import { asistenciasPaths } from "@/app/router/paths";

type EmpleadoAsistencia = {
	id: string | number;
	nombre: string;
	apellido: string;
	cuil: string;
	roles: string[];
};

export const useAsistenciaNavigation = () => {
	const navigate = useNavigate();

	const buildState = (empleado: EmpleadoAsistencia) => ({
		dynamicLabels: {
			[empleado.id]: `${empleado.apellido}, ${empleado.nombre}`,
		},
		empleado: {
			nombre: empleado.nombre,
			apellido: empleado.apellido,
			cuil: empleado.cuil,
			roles: empleado.roles,
		},
	});

	return {
		verDetalle: (empleado: EmpleadoAsistencia) => {
			const today = new Date();

			const anio = today.getFullYear();
			const mes = today.getMonth() + 1;

			navigate(asistenciasPaths.detail(empleado.id, anio, mes), {
				state: buildState(empleado),
			});
		},
	};
};
