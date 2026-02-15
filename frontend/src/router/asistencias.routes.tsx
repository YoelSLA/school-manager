import { Route } from "react-router-dom";
import AsistenciaDetallePage
  from "@/features/asistencias/pages/AsistenciaEmpleadoPage";
import AsistenciasPage
  from "@/features/asistencias/pages/AsistenciaPage";


export function AsistenciasRoutes() {
  return (
    <>
      <Route path="asistencias" element={<AsistenciasPage />} />
      <Route
        path="asistencias/:empleadoId"
        element={<AsistenciaDetallePage />}
      />
    </>
  );
}
