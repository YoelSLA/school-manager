import { useNavigate } from "react-router-dom";
import { asistenciasPaths } from "@/router/paths";

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
		verDetalle: (empleado: EmpleadoAsistencia) =>
			navigate(asistenciasPaths.detail(empleado.id), {
				state: buildState(empleado),
			}),
	};
};
