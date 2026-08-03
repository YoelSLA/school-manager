import { Route } from "react-router-dom";
import MateriaPage from "@/features/materia/pages";

export function MateriaRoutes() {
  return <Route path="materias" element={<MateriaPage />} />;
}