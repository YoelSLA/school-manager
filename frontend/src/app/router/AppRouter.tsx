import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/app/layouts/application/AppLayout";
import UpdateBanner from "@/infrastructure/updater/components/UpdateBanner";
import { useUpdater } from "@/infrastructure/updater/hooks/useUpdater";
import RutaProtegida from "./RutaProtegida";
import {
  AdministracionRoutes,
  AsistenciaRoutes,
  CursoRoutes,
  DesignacionRoutes,
  EmpleadoEducativoRoutes,
  EscuelaRoutes,
  LicenciaRoutes,
  MateriaRoutes,
} from "./routes";

export default function AppRouter() {
  const { updateAvailable } = useUpdater();

  return (
    <>
      {updateAvailable && <UpdateBanner />}

      <Routes>
        {EscuelaRoutes()}

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
          {AdministracionRoutes()}
        </Route>
      </Routes>
    </>
  );
}