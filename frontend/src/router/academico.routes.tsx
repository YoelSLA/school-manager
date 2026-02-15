import { Route } from "react-router-dom";
import CursoDetallePage from "@/features/cursos/pages/CursoDetallePage";
import CursosPage from "@/features/cursos/pages/CursosPage";
import MateriasPage from "@/features/materias/pages/MateriasPage";

export function AcademicoRoutes() {
	return (
		<>
			<Route path="cursos" element={<CursosPage />} />
			<Route
				path="cursos/:cursoId"
				element={<CursoDetallePage />}
			/>
			<Route path="materias" element={<MateriasPage />} />
		</>
	);
}
