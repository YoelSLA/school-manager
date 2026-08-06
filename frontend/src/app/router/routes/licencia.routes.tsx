import { Route } from "react-router-dom";
import { LicenciaCreatePage, LicenciaDesignacionesPage, LicenciaDetallePage, LicenciaPage } from "@/features/licencia/pages";


export function LicenciaRoutes() {
  return (
    <>
      <Route path="licencias" element={<LicenciaPage />} />

      <Route path="licencias/crear" element={<LicenciaCreatePage />} />

      <Route path="licencias/:licenciaId" element={<LicenciaDetallePage />} />

      {/* 👇 NUEVA RUTA */}
      <Route
        path="licencias/:licenciaId/designaciones"
        element={<LicenciaDesignacionesPage />}
      />
    </>
  );
}
