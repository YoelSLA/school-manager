import { Route } from "react-router-dom";
import LicenciaCreatePage from "@/features/licencias/pages/LicenciaCreatePage";
import LicenciaDetallePage from "@/features/licencias/pages/LicenciaDetallePage";
import LicenciasPage from "@/features/licencias/pages/LicenciasPage";
import LicenciasDesignacionesPage from "@/features/licencias/pages/LicenciasDesignacionesPage";

export function LicenciasRoutes() {
  return (
    <>
      <Route path="licencias" element={<LicenciasPage />} />

      <Route
        path="licencias/crear"
        element={<LicenciaCreatePage />}
      />

      <Route
        path="licencias/:licenciaId"
        element={<LicenciaDetallePage />}
      />

      {/* 👇 NUEVA RUTA */}
      <Route
        path="licencias/:licenciaId/designaciones"
        element={<LicenciasDesignacionesPage />}
      />
    </>
  );
}
