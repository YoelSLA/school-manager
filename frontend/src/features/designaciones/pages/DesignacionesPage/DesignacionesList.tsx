import ListState from "@/components/ListState";
import ScrollableGridListLayout from "@/layout/ScrollableGridListLayout/ScrollableGridListLayout";
import DesignacionAdministrativaCard from "../../components/DesignacionAdministrativaCard";
import DesignacionCursoCard from "../../components/DesignacionCursoCard";
import type { DesignacionAdministrativaResumenDTO, DesignacionCursoResumenDTO } from "@/utils/types";

/* ===============================
	 PROPS (DISCRIMINATED UNION)
================================ */

type Props =
	| {
		designaciones: DesignacionAdministrativaResumenDTO[];
		filtro: "ADMIN";
		isLoading: boolean;
		isError: boolean;
		onVerDetalle: (designacion: DesignacionAdministrativaResumenDTO) => void;
	}
	| {
		designaciones: DesignacionCursoResumenDTO[];
		filtro: "CURSO";
		isLoading: boolean;
		isError: boolean;
		onVerDetalle: (designacion: DesignacionCursoResumenDTO) => void;
	};
/* ===============================
	 COMPONENT
================================ */

export default function DesignacionesList(props: Props) {
	if (props.isLoading) {
		return <ListState>Cargando designaciones…</ListState>;
	}

	if (props.isError) {
		return <ListState>No se pudieron cargar las designaciones</ListState>;
	}

	if (props.designaciones.length === 0) {
		return (
			<ListState>
				No hay designaciones para el filtro seleccionado.
			</ListState>
		);
	}

	return (
		<ScrollableGridListLayout>
			{props.filtro === "ADMIN"
				? props.designaciones.map((d) => (
					<DesignacionAdministrativaCard
						key={d.id}
						designacion={d}
						onVerDetalle={props.onVerDetalle}
					/>
				))
				: props.designaciones.map((d) => (
					<DesignacionCursoCard
						key={d.id}
						designacion={d}
						onVerDetalle={props.onVerDetalle}
					/>
				))}
		</ScrollableGridListLayout>
	);
}

