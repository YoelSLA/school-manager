import AsistenciaHub from "@/features/asistencias/AsistenciasHub";
import CursosHub from "@/features/cursos/CursosHub";
import DesignacionAdministrativaCreatePage from "@/features/designaciones/administrativa/DesignacionAdministrativaCreatePage";
import DesginacionesAdministrativasListPage from "@/features/designaciones/administrativa/DesignacionesAdministrativasListPage";
import DesignacionesAdministrativoHub from "@/features/designaciones/administrativa/DesignacionesAdministrativoHub";
import DesignacionCursosCreatePage from "@/features/designaciones/cursos/CrearAsignacionCursoPage";
import CursosListarPage from "@/features/designaciones/cursos/CursosListarPage";
import DesignacionesCursosHub from "@/features/designaciones/cursos/DesignacionesCursosHub";
import DesignacionesHub from "@/features/designaciones/DesignacionesHub";
import EquipoCrear from "@/features/empleadosEducativos/EmpleadoEducativoForm";
import EmpleadosHub from "@/features/empleadosEducativos/EmpleadoEducativoHub";
import EmpleadosEducativosListPage from "@/features/empleadosEducativos/EmpleadosEducativosListPage";
import LicenciasHub from "@/features/licencias/LicenciasHub";
import LicenciasListadoPage from "@/features/licencias/LicenciasListPage";
import MateriasHub from "@/features/materias/MateriaHub";
import AppLayout from "@/layout/AppLayout";
import SeleccionarEscuelaPage from "@/pages/SeleccionarEscuelaPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { SolicitarLicenciaPage } from "../features/licencias/SolicitarLicenciaPage";
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
        <Route path="empleados" element={<EmpleadosHub />} />
        <Route path="empleados/crear" element={<EquipoCrear />} />
        <Route
          path="empleados/listar"
          element={<EmpleadosEducativosListPage />}
        />
        <Route path="cursos" element={<CursosHub />} />
        <Route path="materias" element={<MateriasHub />} />
        <Route path="designaciones" element={<DesignacionesHub />} />
        <Route
          path="designaciones/administrativas"
          element={<DesignacionesAdministrativoHub />}
        />
        <Route
          path="designaciones/administrativas/crear"
          element={<DesignacionAdministrativaCreatePage />}
        />

        <Route
          path="designaciones/administrativas/listar"
          element={<DesginacionesAdministrativasListPage />}
        />
        <Route
          path="designaciones/cursos"
          element={<DesignacionesCursosHub />}
        />
        <Route
          path="designaciones/cursos/crear"
          element={<DesignacionCursosCreatePage />}
        />
        <Route
          path="designaciones/cursos/listar"
          element={<CursosListarPage />}
        />
        <Route path="/licencias" element={<LicenciasHub />} />
        <Route
          path="/licencias/solicitar"
          element={<SolicitarLicenciaPage />}
        />
        <Route path="/licencias/listar" element={<LicenciasListadoPage />} />
        <Route path="asistencias" element={<AsistenciaHub />} />
      </Route>
    </Routes>
  );
}
