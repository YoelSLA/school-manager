import { GraduationCap } from "lucide-react";
import { useMemo } from "react";

import type { RolEducativo } from "@/shared/types/enums";

import type { RolItem } from "../types";

export type AsistenciaActiveFilter = {
	key: string;
	icon: typeof GraduationCap;
	label: string;
	onRemove: () => void;
};

type Props = {
	roles: RolItem[];
	onToggle: (rolId: RolEducativo) => void;
};

export function useAsistenciaActiveFilters({
	roles,
	onToggle,
}: Props): AsistenciaActiveFilter[] {
	return useMemo(() => {
		const activeFilters: AsistenciaActiveFilter[] = [];

		roles
			.filter((rol) => rol.checked)
			.forEach((rol) => {
				activeFilters.push({
					key: rol.id,
					icon: GraduationCap,
					label: rol.label,
					onRemove: () => onToggle(rol.id),
				});
			});

		return activeFilters;
	}, [roles, onToggle]);
}
