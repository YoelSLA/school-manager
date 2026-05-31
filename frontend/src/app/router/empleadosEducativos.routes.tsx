import { Route } from "react-router-dom";
import EmpleadoEducativoUpdatePage from "@/features/empleadosEducativos/pages/EmpeladoEducativoUpdatePage";
import EquipoEducativoCreatePage from "@/features/empleadosEducativos/pages/EmpleadoEducativoCreatePage";
import EmpleadoEducativoDetallePage from "@/features/empleadosEducativos/pages/EmpleadoEducativoDetallePage/EmpleadoEducativoDetallePage";
import EmpleadosEducativosPage from "@/features/empleadosEducativos/pages/EmpleadosEducativosPage";

export function EmpleadosEducativosRoutes() {
	return (
		<>
			<Route path="empleadosEducativos" element={<EmpleadosEducativosPage />} />
			<Route
				path="empleadosEducativos/crear"
				element={<EquipoEducativoCreatePage />}
			/>
			<Route
				path="empleadosEducativos/:empleadoId"
				element={<EmpleadoEducativoDetallePage />}
			/>
			<Route
				path="empleadosEducativos/:empleadoId/editar"
				element={<EmpleadoEducativoUpdatePage />}
			/>
		</>
	);
}
