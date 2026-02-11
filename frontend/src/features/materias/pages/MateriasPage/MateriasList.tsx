import ListState from "@/components/ListState";
import ScrollableGridListLayout from "@/layout/ScrollableGridListLayout";
import MateriaCard from "../../components/MateriaCard";
import type { MateriaResponseDTO } from "../../types/materias.types";

type Props = {
	materias: MateriaResponseDTO[];
	isLoading: boolean;
};

export default function MateriasList({ materias, isLoading }: Props) {
	if (isLoading) {
		return <ListState>Cargando materias…</ListState>;
	}

	if (materias.length === 0) {
		return <ListState>No hay materias cargadas.</ListState>;
	}

	return (
		<ScrollableGridListLayout>
			{materias.map((materia) => (
				<MateriaCard key={materia.id} materia={materia} />
			))}
		</ScrollableGridListLayout>
	);
}
