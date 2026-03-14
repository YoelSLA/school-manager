import SelectField from "@/components/SelectField";
import { useCursosNombres } from "@/features/cursos/hooks/useCursosNombres";
import { useMateriasSelect } from "@/features/materias/hooks/useMateriasSelect";
import type { CursoFiltersState } from "../../types/designacion.types";

type Props = {
	escuelaId?: number;
	filters: CursoFiltersState;
	onChange: (filters: CursoFiltersState) => void;
};

export default function CursoFilters({ escuelaId, filters, onChange }: Props) {
	const { cursos } = useCursosNombres(escuelaId);
	const { materias } = useMateriasSelect(escuelaId);

	const updateFilter = (key: keyof CursoFiltersState, value?: string) => {
		const newFilters = {
			...filters,
			[key]: value,
		};

		onChange(newFilters);
	};

	return (
		<>
			<SelectField
				label="Materia"
				value={filters.materiaId}
				onChange={(value) => updateFilter("materiaId", value || undefined)}
			>
				<option value="">Todas</option>

				{materias.map((m) => (
					<option key={m.id} value={m.id}>
						{m.nombre}
					</option>
				))}
			</SelectField>

			<SelectField
				label="Curso"
				value={filters.cursoId}
				onChange={(value) => updateFilter("cursoId", value || undefined)}
			>
				<option value="">Todos</option>

				{cursos.map((c) => (
					<option key={c.id} value={c.id}>
						{c.division}
					</option>
				))}
			</SelectField>

			<SelectField
				label="Estado"
				value={filters.estado}
				onChange={(value) => updateFilter("estado", value || undefined)}
			>
				<option value="">Todos</option>
				<option value="CUBIERTA">Cubierta</option>
				<option value="VACANTE">Vacante</option>
			</SelectField>
		</>
	);
}
