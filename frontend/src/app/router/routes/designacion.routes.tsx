import { Route } from "react-router-dom";
import { DesignacionCreatePage, DesignacionDetallePage, DesignacionPage, DesignacionUpdatePage } from "@/features/designacion";


export function DesignacionRoutes() {
  return (
    <>
      <Route path="designaciones" element={<DesignacionPage />} />

      <Route path="designaciones/crear" element={<DesignacionCreatePage />} />

      <Route
        path="designaciones/:designacionId"
        element={<DesignacionDetallePage />}
      />

      <Route
        path="designaciones/:designacionId/editar"
        element={<DesignacionUpdatePage />}
      />
    </>
  );
}
