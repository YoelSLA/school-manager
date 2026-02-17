import { Route } from "react-router-dom";

import EmpleadosEducativosPage
  from "@/features/empleadosEducativos/pages/EmpleadosEducativosPage";
import EquipoEducativoCreatePage
  from "@/features/empleadosEducativos/pages/EmpleadoEducativoCreatePage";
import EmpleadoEducativoDetallePage
  from "@/features/empleadosEducativos/pages/EmpleadoEducativoDetallePage/EmpleadoEducativoDetallePage";
import EmpleadoEducativoEditPage from "@/features/empleadosEducativos/pages/EmpeladoEducativoEditPage/EmpeladoEducativoEditPage";


export function EmpleadosEducativosRoutes() {
  return (
    <>
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
      <Route
        path="empleadosEducativos/:empleadoId/editar"
        element={<EmpleadoEducativoEditPage />}
      />
    </>
  );
}
