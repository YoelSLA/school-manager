import ListState from "@/components/ListState";
import ScrollableGridListLayout from "@/layout/ScrollableGridListLayout";



import type {
	DesignacionAdministrativaResumenDTO,
	DesignacionCursoResumenDTO,
} from "../../types/designacion.types";
import DesignacionAdministrativaCard from "../../components/DesignacionAdministrativaCard";
import DesignacionCursoCard from "../../components/DesignacionCursoCard";

/* ===============================
	 PROPS (DISCRIMINATED UNION)
================================ */

type Props =
	| {
		designaciones: DesignacionAdministrativaResumenDTO[];
		filtro: "ADMIN";
		isLoading: boolean;
		isError: boolean;
		onVerDetalle: (id: number) => void;
	}
	| {
		designaciones: DesignacionCursoResumenDTO[];
		filtro: "CURSO";
		isLoading: boolean;
		isError: boolean;
		onVerDetalle: (id: number) => void;
	};

/* ===============================
	 COMPONENT
================================ */

export default function DesignacionesList(props: Props) {
	const { designaciones, filtro, isLoading, isError, onVerDetalle } = props;

	if (isLoading) {
		return <ListState>Cargando designaciones…</ListState>;
	}

	if (isError) {
		return (
			<ListState>
				No se pudieron cargar las designaciones
			</ListState>
		);
	}

	if (designaciones.length === 0) {
		return (
			<ListState>
				No hay designaciones para el filtro seleccionado.
			</ListState>
		);
	}

	return (
		<ScrollableGridListLayout>
			{filtro === "ADMIN"
				? designaciones.map((d) => (
					<DesignacionAdministrativaCard
						key={d.id}
						designacion={d}
						onVerDetalle={onVerDetalle}
					/>
				))
				: designaciones.map((d) => (
					<DesignacionCursoCard
						key={d.id}
						designacion={d}
						onVerDetalle={onVerDetalle}
					/>
				))}
		</ScrollableGridListLayout>
	);
}
