import { DesignacionResumenDTO } from "@/utils/types";
import { useLocation, useNavigate } from "react-router-dom";

export function useDesignacionesNavigation() {
	const navigate = useNavigate();
	const location = useLocation();

	return {
		verDetalle: (designacion: DesignacionResumenDTO) =>
			navigate(`/designaciones/${designacion.id}${location.search}`, {
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
