import { Route } from "react-router-dom";
import {
  AdministracionPage
} from "@/features/administracion/pages";
import { LicenciaEstatutariaPage } from "@/features/licenciaEstatutaria/pages";

export function AdministracionRoutes() {
  return (
    <>
      <Route
        path="administracion"
        element={<AdministracionPage />}
      />

      <Route
        path="administracion/licencias-estatutarias"
        element={<LicenciaEstatutariaPage />}
      />
    </>
  );
}