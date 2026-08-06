import { Route } from "react-router-dom";
import { CursoDetallePage, CursoPage } from "@/features/curso";

export function CursoRoutes() {
  return (
    <>
      <Route path="cursos" element={<CursoPage />} />
      <Route path="cursos/:cursoId" element={<CursoDetallePage />} />
    </>
  );
}