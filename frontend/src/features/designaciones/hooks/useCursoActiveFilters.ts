import {
	BookOpen,
	CheckCircle,
	GraduationCap,
	type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";
import { useListarCursosSelect } from "@/features/cursos/hooks/useListarCursosSelect";
import { useListMateriasSelect } from "@/features/materias/hooks/useListMateriasSelect";
import type { CursoFiltersState } from "@/shared/types";

export type CursoActiveFilter = {
	key: string;
	icon: LucideIcon;
	label: string;
	onRemove: () => void;
};

type Props = {
	escuelaId?: number;
	filters: CursoFiltersState;
	updateParams: (params: Record<string, string | undefined>) => void;
};

export function useCursoActiveFilters({
	escuelaId,
	filters,
	updateParams,
}: Props): CursoActiveFilter[] {
	const { data: cursos = [] } = useListarCursosSelect(escuelaId);
	const { data: materias = [] } = useListMateriasSelect(escuelaId);

	return useMemo(() => {
		const activeFilters: CursoActiveFilter[] = [];

		if (filters.materiaId) {
			const materia = materias.find((m) => String(m.id) === filters.materiaId);

			activeFilters.push({
				key: "materia",
				icon: BookOpen,
				label: materia?.nombre ?? filters.materiaId,
				onRemove: () =>
					updateParams({
						materiaId: undefined,
						page: "0",
					}),
			});
		}

		if (filters.cursoId) {
			const curso = cursos.find((c) => String(c.id) === filters.cursoId);

			activeFilters.push({
				key: "curso",
				icon: GraduationCap,
				label: curso?.nombre ?? filters.cursoId,
				onRemove: () =>
					updateParams({
						cursoId: undefined,
						page: "0",
					}),
			});
		}

		if (filters.estado) {
			activeFilters.push({
				key: "estado",
				icon: CheckCircle,
				label: filters.estado === "VACANTE" ? "Vacante" : "Cubierta",
				onRemove: () =>
					updateParams({
						estado: undefined,
						page: "0",
					}),
			});
		}

		return activeFilters;
	}, [cursos, materias, filters, updateParams]);
}
