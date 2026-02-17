import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilteredSidebar from "@/components/FilteredSidebar/FilteredSidebar";

import SidebarPageLayout from "@/layout/SidebarPageLayout/SidebarPageLayout";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import { useCursos } from "../../hooks/useCursos";
import type { CursoFiltro, CursoResponseDTO } from "../../types/cursos.types";
import { FILTROS_CURSOS } from "../../utils/cursos.utils";
import CursosList from "./CursosList";

export default function CursosPage() {
	const navigate = useNavigate();
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const [filtro, setFiltro] = useState<CursoFiltro>("TODOS");

	const { data: cursos = [], isLoading } = useCursos(escuelaActiva?.id, filtro);

	const handleCrearCurso = () => {
		navigate("/cursos/crear");
	};

	const handleVerDetalle = (curso: CursoResponseDTO) => {
		navigate(`/cursos/${curso.id}`, {
			state: {
				currentLabel: `${curso.division} – Turno ${curso.turno}`,
			},
		});
	};

	return (
		<SidebarPageLayout
			sidebar={
				<FilteredSidebar
					title="Cursos"
					subtitle="Listado de cursos de la escuela"
					filtros={FILTROS_CURSOS}
					value={filtro}
					onChange={setFiltro}
					actionLabel="+ Nuevo curso"
					onAction={handleCrearCurso}
				/>
			}
		>
			<CursosList
				cursos={cursos}
				isLoading={isLoading}
				onVerDetalle={handleVerDetalle}
			/>
		</SidebarPageLayout>
	);
}
