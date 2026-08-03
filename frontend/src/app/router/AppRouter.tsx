import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/app/layouts/application/AppLayout/AppLayout";
import { AsistenciaRoutes } from "@/app/router/routes/asistencia.routes";
import { CursoRoutes } from "@/app/router/routes/curso.routes";
import { DesignacionRoutes } from "@/app/router/routes/designacion.routes";
import { EmpleadoEducativoRoutes } from "@/app/router/routes/empleadoEducativo.routes";
import { LicenciaRoutes } from "@/app/router/routes/licencia.routes";
import { MateriaRoutes } from "@/app/router/routes/materia.routes";
import EscuelaPage from "@/features/escuela/pages";
import UpdateBanner from "@/infrastructure/UpdateBanner";
import { useUpdater } from "@/infrastructure/useUpdater";
import RutaProtegida from "./RutaProtegida";



export default function AppRouter() {
  const { updateAvailable } = useUpdater();

  return (
    <>
      {updateAvailable && <UpdateBanner />}

      <Routes>
        <Route
          path="/seleccionar-escuela"
          element={<EscuelaPage />}
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

          {EmpleadoEducativoRoutes()}
          {AsistenciaRoutes()}
          {MateriaRoutes()}
          {CursoRoutes()}
          {DesignacionRoutes()}
          {LicenciaRoutes()}
        </Route>
      </Routes>
    </>
  );
}
