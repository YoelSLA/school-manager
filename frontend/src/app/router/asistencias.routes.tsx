import { Route } from "react-router-dom";
import AsistenciaDetallePage from "@/features/asistencias/pages/AsistenciaDetallePage";
import AsistenciasPage from "@/features/asistencias/pages/AsistenciaPage";

export function AsistenciasRoutes() {
	return (
		<>
			{/* Lista general */}
			<Route path="asistencias" element={<AsistenciasPage />} />

			{/* Perfil de asistencia (resumen anual) */}
			{/* <Route
				path="asistencias/:empleadoId"
				element={<EmpleadoAsistenciasProfilePage />}
			/> */}

			{/* Detalle mensual (pantalla que ya tenés) */}
			<Route
				path="asistencias/:empleadoId/:anio/:mes"
				element={<AsistenciaDetallePage />}
			/>
		</>
	);
}
