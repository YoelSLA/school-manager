import { useNavigate } from "react-router-dom";
import type {
	EmpleadoEducativoBasicoDTO,
	LicenciaDetalleDTO,
} from "@/shared/utils/types";

export function useLicenciasNavigation() {
	const navigate = useNavigate();

	return {
		/* =================================
		   LISTADO
		================================= */

		listado: () => navigate("/licencias"),

		/* =================================
		   DETALLE
		================================= */

		verDetalle: (licenciaId: number) => navigate(`/licencias/${licenciaId}`),

		/* =================================
		   CREAR
		================================= */

		crear: () => navigate("/licencias/crear"),

		/* =================================
		   EDITAR
		================================= */

		editar: (licenciaId: number) => navigate(`/licencias/${licenciaId}/editar`),

		/* =================================
		   DESIGNACIONES
		================================= */

		verDesignaciones: (
			licenciaId: number,
			empleado: EmpleadoEducativoBasicoDTO,
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
