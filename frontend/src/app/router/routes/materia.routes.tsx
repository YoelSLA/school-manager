import { Route } from "react-router-dom";
import { MateriasPage } from "@/features/materias";

export function MateriaRoutes() {
  return <Route path="materias" element={<MateriasPage />} />;
}