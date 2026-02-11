import { Navigate, Route, Routes } from "react-router-dom";
import AsistenciaDetallePage from "@/features/asistencias/pages/AsistenciaEmpleadoPage";
import AsistenciasPage from "@/features/asistencias/pages/AsistenciaPage";
import CursoDetallePage from "@/features/cursos/pages/CursoDetallePage";
import CursosPage from "@/features/cursos/pages/CursosPage";
import { DesignacionesPage } from "@/features/designaciones/pages";
import DesignacionCreatePage from "@/features/designaciones/pages/DesignacionCreatePage/DesignacionCreatePage";
import DesignacionDetallePage from "@/features/designaciones/pages/DesignacionDetallePage/DesignacionDetallePage";
import EquipoEducativoCreatePage from "@/features/empleadosEducativos/pages/EmpleadoEducativoCreatePage";
import EmpleadoEducativoDetallePage from "@/features/empleadosEducativos/pages/EmpleadoEducativoDetallePage/EmpleadoEducativoDetallePage";
import EmpleadosEducativosPage from "@/features/empleadosEducativos/pages/EmpleadosEducativosPage";
import SeleccionarEscuelaPage from "@/features/escuelas/pages";
import LicenciaCreatePage from "@/features/licencias/pages/LicenciaCreatePage";
import LicenciaDetallePage from "@/features/licencias/pages/LicenciaDetallePage";
import LicenciasPage from "@/features/licencias/pages/LicenciasPage";
import MateriasPage from "@/features/materias/pages/MateriasPage";
import AppLayout from "@/layout/AppLayout";
import RutaProtegida from "./RutaProtegida";

export default function AppRouter() {
	return (
		<Routes>
			{/* PÚBLICO */}
			<Route path="/seleccionar-escuela" element={<SeleccionarEscuelaPage />} />

			{/* APP */}
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
				<Route
					path="empleadosEducativos"
					element={<EmpleadosEducativosPage />}
				/>
				<Route
					path="empleadosEducativos/crear"
					element={<EquipoEducativoCreatePage />}
				/>
				<Route
					path="empleadosEducativos/:empleadoId"
					element={<EmpleadoEducativoDetallePage />}
				/>

				<Route path="asistencias" element={<AsistenciasPage />} />
				<Route
					path="asistencias/:empleadoId"
					element={<AsistenciaDetallePage />}
				/>

				<Route path="cursos" element={<CursosPage />} />
				<Route path="/cursos/:cursoId" element={<CursoDetallePage />} />
				<Route path="materias" element={<MateriasPage />} />
				<Route path="designaciones" element={<DesignacionesPage />} />
				<Route path="designaciones/crear" element={<DesignacionCreatePage />} />

				<Route
					path="designaciones/:designacionId"
					element={<DesignacionDetallePage />}
				/>
				<Route path="licencias" element={<LicenciasPage />} />
				<Route path="licencias/crear" element={<LicenciaCreatePage />} />
				<Route path="licencias/:licenciaId" element={<LicenciaDetallePage />} />
			</Route>
		</Routes>
	);
}
