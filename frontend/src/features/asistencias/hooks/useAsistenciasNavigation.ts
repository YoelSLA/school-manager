import { useNavigate } from "react-router-dom";

type EmpleadoResumen = {
	id: number | string;
	nombre: string;
	apellido: string;
	cuil: string;
};

export function useAsistenciasNavigation() {
	const navigate = useNavigate();

	return {
		verAsistenciasEmpleado: (empleado: EmpleadoResumen) => {
			navigate(`/asistencias/${empleado.id}`, {
				state: {
					empleado: {
						nombre: empleado.nombre,
						apellido: empleado.apellido,
						cuil: empleado.cuil,
					},
				},
			});
		},

		volverAlListado: () => {
			navigate("/asistencias");
		},
	};
}
