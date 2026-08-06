import { Route } from "react-router-dom";
import EscuelaPage from "@/features/escuela/pages";

export function EscuelaRoutes() {
  return (
    <Route
      path="/seleccionar-escuela"
      element={<EscuelaPage />}
    />
  );
}