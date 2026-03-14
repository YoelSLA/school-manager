import { Navigate, Route, Routes } from "react-router-dom";
import UpdateModal from "@/components/UpdateModal/UpdateModal";
import SeleccionarEscuelaPage from "@/features/escuelas/pages";
import { useUpdater } from "@/hooks/useAdapter";
import AppLayout from "@/layout/AppLayout/AppLayout";
import { AcademicoRoutes } from "./academico.routes";
import { AsistenciasRoutes } from "./asistencias.routes";
import { DesignacionesRoutes } from "./designaciones.routes";
import { EmpleadosEducativosRoutes } from "./empleadosEducativos.routes";
import { LicenciasRoutes } from "./licencias.routes";
import RutaProtegida from "./RutaProtegida";

export default function AppRouter() {
	const { updateAvailable, progress, downloaded, restartApp } = useUpdater();

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
