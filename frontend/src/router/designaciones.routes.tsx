import { Route } from "react-router-dom";
import { DesignacionesPage }
  from "@/features/designaciones/pages";
import DesignacionCreatePage
  from "@/features/designaciones/pages/DesignacionCreatePage/DesignacionCreatePage";
import DesignacionDetallePage
  from "@/features/designaciones/pages/DesignacionDetallePage/DesignacionDetallePage";

export function DesignacionesRoutes() {
  return (
    <>
      <Route path="designaciones" element={<DesignacionesPage />} />
      <Route
        path="designaciones/crear"
        element={<DesignacionCreatePage />}
      />
      <Route
        path="designaciones/:designacionId"
        element={<DesignacionDetallePage />}
      />
    </>
  );
}
