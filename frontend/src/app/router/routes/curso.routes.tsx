import { Route } from "react-router-dom";
import CursoDetallePage from "@/features/cursos/pages/CursoDetallePage";
import CursosPage from "@/features/cursos/pages/CursosPage";

export function CursoRoutes() {
  return (
    <>
      <Route path="cursos" element={<CursosPage />} />
      <Route path="cursos/:cursoId" element={<CursoDetallePage />} />
    </>
  );
}