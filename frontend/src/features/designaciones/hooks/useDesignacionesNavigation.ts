import { useNavigate } from "react-router-dom";
import type { DesignacionResumenDTO } from "../types/designacion.types";

export function useDesignacionesNavigation() {
	const navigate = useNavigate();

	return {
		verDetalle: (designacion: DesignacionResumenDTO) =>
			navigate(`/designaciones/${designacion.id}`, {
				state: {
					dynamicLabels: {
						[designacion.id]: `#${designacion.cupof} - ${designacion.rolEducativo}`,
					},
				},
			}),

		crear: () => navigate("/designaciones/crear"),

		editar: (designacionId: number) =>
			navigate(`/designaciones/${designacionId}/editar`),
	};
}
