import { Navigate, Route, Routes } from "react-router-dom";
import SeleccionarEscuelaPage from "@/features/escuelas/pages";
import AppLayout from "@/layout/AppLayout/AppLayout";
import { AcademicoRoutes } from "./academico.routes";
import { AsistenciasRoutes } from "./asistencias.routes";
import { DesignacionesRoutes } from "./designaciones.routes";
import { EmpleadosEducativosRoutes } from "./empleadosEducativos.routes";
import { LicenciasRoutes } from "./licencias.routes";
import RutaProtegida from "./RutaProtegida";

import UpdateBanner from "@/rerender/UpdateBanner";
import { useUpdater } from "@/rerender/useUpdater";

export default function AppRouter() {
	const { updateAvailable } = useUpdater();

	return (
		<>
			{/* 🔥 UI GLOBAL */}
			{updateAvailable && <UpdateBanner />}

			<Routes>
				<Route
					path="/seleccionar-escuela"
					element={<SeleccionarEscuelaPage />}
				/>

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

					{EmpleadosEducativosRoutes()}
					{AsistenciasRoutes()}
					{AcademicoRoutes()}
					{DesignacionesRoutes()}
					{LicenciasRoutes()}
				</Route>
			</Routes>
		</>
	);
}