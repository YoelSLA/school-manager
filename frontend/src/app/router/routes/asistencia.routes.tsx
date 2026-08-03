import { Route } from "react-router-dom";
import { AsistenciaDetallePage, AsistenciaPage } from "@/features/asistencia/pages";

export function AsistenciaRoutes() {
  return (
    <>
      {/* Lista general */}
      <Route path="asistencias" element={<AsistenciaPage />} />

      {/* Perfil de asistencia (resumen anual) */}
      {/* <Route
				path="asistencias/:empleadoId"
				element={<EmpleadoAsistenciasProfilePage />}
			/> */}

      {/* Detalle mensual (pantalla que ya tenés) */}
      <Route
        path="asistencias/:empleadoId/:anio/:mes"
        element={<AsistenciaDetallePage />}
      />
    </>
  );
}
