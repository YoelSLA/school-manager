import { useLocation, useNavigate } from "react-router-dom";
import type { DesignacionRowDTO } from "../../types";

const capitalize = (value: string) =>
	value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

export function useDesignacionNavigation() {
	const navigate = useNavigate();
	const location = useLocation();

	return {
		/* =================================
		   DETALLE
		================================= */

		verDetalle: (designacion: DesignacionRowDTO) => {
			const rolEducativo = capitalize(designacion.rolEducativo);

			const designacionNombre = `${designacion.cupof} - ${rolEducativo}`;

			const breadcrumbs = [
				{
					label: "Designaciones",
					to: "/designaciones",
				},
				{
					label: designacionNombre,
				},
			];

			navigate(`/designaciones/${designacion.id}${location.search}`, {
				state: {
					breadcrumbs,
				},
			});
		},

		/* =================================
		   CREAR
		================================= */

		crear: () => {
			navigate("/designaciones/crear");
		},

		/* =================================
		   EDITAR
		================================= */

		editar: (designacionId: number) => {
			navigate(`/designaciones/${designacionId}/editar`);
		},
	};
}
