import { BookOpen, CheckCircle, GraduationCap } from "lucide-react";
import SelectField from "@/components/SelectField";
import { useCursosNombres } from "@/features/cursos/hooks/useCursosNombres";
import { useMateriasSelect } from "@/features/materias/hooks/useMateriasSelect";
import type { CursoFiltersState } from "@/utils/types";
import styles from "./CursoFilters.module.scss";

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
		<div className={styles.filtersRow}>
			<SelectField
				icon={<BookOpen size={14} color="#2563EB" />}
				value={filters.materiaId}
				onChange={(v) => updateFilter("materiaId", v || undefined)}
				onClear={() => updateFilter("materiaId", undefined)}
			>
				<option value="">Materia: Todas</option>

				{materias.map((m) => (
					<option key={m.id} value={m.id}>
						Materia: {m.nombre}
					</option>
				))}
			</SelectField>

			<SelectField
				icon={<GraduationCap size={14} color="#7C3AED" />}
				value={filters.cursoId}
				onChange={(v) => updateFilter("cursoId", v || undefined)}
				onClear={() => updateFilter("cursoId", undefined)}
			>
				<option value="">Curso: Todos</option>

				{cursos.map((c) => (
					<option key={c.id} value={c.id}>
						Curso: {c.division}
					</option>
				))}
			</SelectField>

			<SelectField
				icon={<CheckCircle size={14} color="#16A34A" />}
				value={filters.estado}
				onChange={(v) => updateFilter("estado", v || undefined)}
				onClear={() => updateFilter("estado", undefined)}
			>
				<option value="">Estado: Todos</option>

				<option value="CUBIERTA">Estado: Cubierta</option>
				<option value="VACANTE">Estado: Vacante</option>
			</SelectField>
		</div>
	);
}
