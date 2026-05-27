import Button from "@/components/Button";
import type { CursoFiltersState } from "@/shared/utils/types";
import CursoFilters from "../../components/CursoFilters";
import styles from "./DesignacionesPage.module.scss";

type Props = {
	isAdmin: boolean;
	escuelaId?: number;
	filters: CursoFiltersState;
	updateParams: (params: Record<string, string | undefined>) => void;
};

export default function DesignacionesFilters({
	isAdmin,
	escuelaId,
	filters,
	updateParams,
}: Props) {
	if (isAdmin) return null;

	return (
		<div className={styles.filtersContainer}>
			<CursoFilters
				escuelaId={escuelaId}
				filters={filters}
				onChange={(newFilters) =>
					updateParams({
						...newFilters,
						page: "0",
					})
				}
			/>

			<Button
				variant="ghost"
				onClick={() =>
					updateParams({
						cursoId: undefined,
						materiaId: undefined,
						orientacion: undefined,
						estado: undefined,
						page: "0",
					})
				}
			>
				Limpiar
			</Button>
		</div>
	);
}
