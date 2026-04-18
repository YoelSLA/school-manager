import { EmpleadoEducativoMinimoDTO, LicenciaDetalleDTO } from "@/utils/types";
import { useNavigate } from "react-router-dom";

export function useLicenciasNavigation() {
	const navigate = useNavigate();

	return {
		verDetalle: (licenciaId: number) => navigate(`/licencias/${licenciaId}`),

		crear: () => navigate("/licencias/crear"),

		editar: (licenciaId: number) => navigate(`/licencias/${licenciaId}/editar`),

		verDesignaciones: (
			licenciaId: number,
			empleado: EmpleadoEducativoMinimoDTO,
			licencia: LicenciaDetalleDTO
		) =>
			navigate(`/licencias/${licenciaId}/designaciones`, {
				state: {
					empleado,
					licencia,
				},
			}),
	};
}
