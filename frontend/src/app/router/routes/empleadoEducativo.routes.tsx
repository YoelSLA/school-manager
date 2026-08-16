import { Route } from "react-router-dom";
import { EmpleadoEducativoCreatePage, EmpleadoEducativoDetailPage, EmpleadoEducativoPageUpdate, EmpleadosEducativosPage } from "@/features/empleadoEducativo/pages";

export function EmpleadoEducativoRoutes() {
  return (
    <>
      <Route path="empleadosEducativos" element={<EmpleadosEducativosPage />} />
      <Route
        path="empleadosEducativos/crear"
        element={<EmpleadoEducativoCreatePage />}
      />
      <Route
        path="empleadosEducativos/:empleadoId"
        element={<EmpleadoEducativoDetailPage />}
      />
      <Route
        path="empleadosEducativos/:empleadoId/editar"
        element={<EmpleadoEducativoPageUpdate />}
      />
    </>
  );
}
