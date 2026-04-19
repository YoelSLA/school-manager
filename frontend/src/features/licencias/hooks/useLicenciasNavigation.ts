import { useNavigate } from "react-router-dom";
import type {
	EmpleadoEducativoMinimoDTO,
	LicenciaDetalleDTO,
} from "@/utils/types";

export function useLicenciasNavigation() {
	const navigate = useNavigate();

	return {
		verDetalle: (licenciaId: number) => navigate(`/licencias/${licenciaId}`),

		crear: () => navigate("/licencias/crear"),

		editar: (licenciaId: number) => navigate(`/licencias/${licenciaId}/editar`),

		verDesignaciones: (
			licenciaId: number,
			empleado: EmpleadoEducativoMinimoDTO,
			licencia: LicenciaDetalleDTO,
		) =>
			navigate(`/licencias/${licenciaId}/designaciones`, {
				state: {
					empleado,
					licencia,
				},
			}),
	};
}
