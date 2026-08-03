import { Route } from "react-router-dom";
import { EmpleadoEducativoCreatePage, EmpleadoEducativoDetallePage, EmpleadoEducativoPage } from "@/features/empleadoEducativo/pages";
import EmpleadoEducativoUpdatePage from "@/features/empleadoEducativo/pages/EmpeladoEducativoUpdatePage";


export function EmpleadoEducativoRoutes() {
  return (
    <>
      <Route path="empleadosEducativos" element={<EmpleadoEducativoPage />} />
      <Route
        path="empleadosEducativos/crear"
        element={<EmpleadoEducativoCreatePage />}
      />
      <Route
        path="empleadosEducativos/:empleadoId"
        element={<EmpleadoEducativoDetallePage />}
      />
      <Route
        path="empleadosEducativos/:empleadoId/editar"
        element={<EmpleadoEducativoUpdatePage />}
      />
    </>
  );
}
