import ListState from "@/components/ListState";
import type { CursoResponseDTO } from "@/cursos/types/cursos.types";
import ScrollableGridListLayout from "@/layout/ScrollableGridListLayout/ScrollableGridListLayout";
import CursoCard from "../../components/CursoCard/CursoCard";

type Props = {
	cursos: CursoResponseDTO[];
	isLoading: boolean;
	onVerDetalle: (curso: CursoResponseDTO) => void;
};

export default function CursosList({ cursos, isLoading, onVerDetalle }: Props) {
	if (isLoading) {
		return <ListState>Cargando cursos…</ListState>;
	}

	if (cursos.length === 0) {
		return <ListState>No hay cursos para el filtro seleccionado.</ListState>;
	}

	return (
		<ScrollableGridListLayout>
			{cursos.map((curso) => (
				<CursoCard key={curso.id} curso={curso} onVerDetalle={onVerDetalle} />
			))}
		</ScrollableGridListLayout>
	);
}
