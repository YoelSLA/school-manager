import { Navigate, Route, Routes } from "react-router-dom";
import RutaProtegida from "./RutaProtegida";
import AppLayout from "@/layout/AppLayout";
import SeleccionarEscuelaPage from "@/features/escuelas/pages";

import { EmpleadosEducativosRoutes } from "./empleadosEducativos.routes";
import { AsistenciasRoutes } from "./asistencias.routes";
import { AcademicoRoutes } from "./academico.routes";
import { DesignacionesRoutes } from "./designaciones.routes";
import { LicenciasRoutes } from "./licencias.routes";

export default function AppRouter() {
	return (
		<Routes>

			{/* Público */}
			<Route
				path="/seleccionar-escuela"
				element={<SeleccionarEscuelaPage />}
			/>

			{/* App protegida */}
			<Route
				path="/"
				element={
					<RutaProtegida>
						<AppLayout />
					</RutaProtegida>
				}
			>

				<Route index element={<Navigate to="dashboard" replace />} />
				<Route path="dashboard" element={<div>Dashboard</div>} />

				{/* Feature routes */}
				{EmpleadosEducativosRoutes()}
				{AsistenciasRoutes()}
				{AcademicoRoutes()}
				{DesignacionesRoutes()}
				{LicenciasRoutes()}

			</Route>
		</Routes>
	);
}
