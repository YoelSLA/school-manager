import { Route } from "react-router-dom";
import DesignacionCreatePage from "@/features/designaciones/pages/DesignacionCreatePage/DesignacionCreatePage";
import DesignacionDetallePage from "@/features/designaciones/pages/DesignacionDetallePage/DesignacionDetallePage";
import DesignacionesPage from "@/features/designaciones/pages/DesignacionesPage";
import DesignacionUpdatePage from "@/features/designaciones/pages/DesignacionUpdatePage/DesignacionUpdatePage";

export function DesignacionRoutes() {
  return (
    <>
      <Route path="designaciones" element={<DesignacionesPage />} />

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
