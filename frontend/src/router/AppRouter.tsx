import { Navigate, Route, Routes } from "react-router-dom";
import RutaProtegida from "./RutaProtegida";
import AppLayout from "@/layout/AppLayout/AppLayout";
import SeleccionarEscuelaPage from "@/features/escuelas/pages";

import { EmpleadosEducativosRoutes } from "./empleadosEducativos.routes";
import { AsistenciasRoutes } from "./asistencias.routes";
import { AcademicoRoutes } from "./academico.routes";
import { DesignacionesRoutes } from "./designaciones.routes";
import { LicenciasRoutes } from "./licencias.routes";
import { useUpdater } from "@/hooks/useAdapter";
import UpdateModal from "@/components/UpdateModal/UpdateModal";


export default function AppRouter() {
	const {
		updateAvailable,
		progress,
		downloaded,
		restartApp,
	} = useUpdater();

	return (
		<>
			{/* 🔥 MODAL GLOBAL */}
			{updateAvailable && (
				<UpdateModal
					progress={progress}
					downloaded={downloaded}
					onRestart={restartApp}
				/>
			)}

			{/* 🌍 ROUTES */}
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
