import AsistenciaHub from "@/hubs/AsistenciasHub";
import CursosHub from "@/hubs/CursosHub";
import DesignacionesAdministrativasHub from "@/hubs/DesignacionesAdministrativaHub";
import DesignacionesCursosHub from "@/hubs/DesignacionesCursosHub";
import DesignacionesHub from "@/hubs/DesignacionesHub";
import EmpleadosHub from "@/hubs/EmpleadosEducativosHub";
import LicenciasHub from "@/hubs/LicenciasHub";
import MateriasHub from "@/hubs/MateriasHub";
import AppLayout from "@/layout/AppLayout";
import DesignacionAdministrativaCreatePage from "@/pages/designaciones/administrativas/DesignacionAdministrativaCreatePage";
import DesignacionesAdministrativasListPage from "@/pages/designaciones/administrativas/DesignacionesAdministrativasListPage";
import DesignacionCursosCreatePage from "@/pages/designaciones/cursos/DesignacionCursoCreatePage";
import DesignacionesCursosListPage from "@/pages/designaciones/cursos/DesignacionesCursosListPage";
import EquipoEducativoCreatePage from "@/pages/empleadosEducativos/EmpleadoEducativoCreatePage";
import EmpleadosEducativosListPage from "@/pages/empleadosEducativos/EmpleadosEducativosListPage";
import SeleccionarEscuelaPage from "@/pages/escuelas/SeleccionarEscuelaPage";
import CrearLicenciaPage from "@/pages/licencias/CrearLicenciaPage";
import LicenciasListPage from "@/pages/licencias/LicenciasListPage";
import { Navigate, Route, Routes } from "react-router-dom";
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
        <Route path="empleados/crear" element={<EquipoEducativoCreatePage />} />
        <Route
          path="empleados/listar"
          element={<EmpleadosEducativosListPage />}
        />
        <Route path="cursos" element={<CursosHub />} />
        <Route path="materias" element={<MateriasHub />} />
        <Route path="designaciones" element={<DesignacionesHub />} />
        <Route
          path="designaciones/administrativas"
          element={<DesignacionesAdministrativasHub />}
        />
        <Route
          path="designaciones/administrativas/crear"
          element={<DesignacionAdministrativaCreatePage />}
        />

        <Route
          path="designaciones/administrativas/listar"
          element={<DesignacionesAdministrativasListPage />}
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
          element={<DesignacionesCursosListPage />}
        />
        <Route path="/licencias" element={<LicenciasHub />} />

        <Route path="/licencias/crear" element={<CrearLicenciaPage />} />
        <Route path="/licencias/listar" element={<LicenciasListPage />} />
        <Route path="asistencias" element={<AsistenciaHub />} />
      </Route>
    </Routes>
  );
}
