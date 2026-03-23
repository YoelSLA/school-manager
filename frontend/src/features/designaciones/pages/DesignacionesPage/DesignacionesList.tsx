import GridListState from "@/layout/GridListState";
import type {
	DesignacionAdministrativaResumenDTO,
	DesignacionCursoResumenDTO,
} from "@/utils/types";
import DesignacionAdministrativaCard from "../../components/DesignacionAdministrativaCard";
import DesignacionCursoCard from "../../components/DesignacionCursoCard";

type Props =
	| {
		designaciones: DesignacionAdministrativaResumenDTO[];
		filtro: "ADMIN";
		isLoading: boolean;
		isError: boolean;
		onVerDetalle: (d: DesignacionAdministrativaResumenDTO) => void;
	}
	| {
		designaciones: DesignacionCursoResumenDTO[];
		filtro: "CURSO";
		isLoading: boolean;
		isError: boolean;
		onVerDetalle: (d: DesignacionCursoResumenDTO) => void;
	};

export default function DesignacionesList(props: Props) {
	if (props.filtro === "ADMIN") {
		return (
			<GridListState
				isLoading={props.isLoading}
				isError={props.isError}
				items={props.designaciones}
				loadingMessage="Cargando designaciones…"
				emptyMessage="No hay designaciones para el filtro seleccionado."
				errorMessage="No se pudieron cargar las designaciones"
				getKey={(d) => d.id}
				renderItem={(d) => (
					<DesignacionAdministrativaCard
						designacion={d}
						onVerDetalle={props.onVerDetalle}
					/>
				)}
			/>
		);
	}

	return (
		<GridListState
			isLoading={props.isLoading}
			isError={props.isError}
			items={props.designaciones}
			loadingMessage="Cargando designaciones…"
			emptyMessage="No hay designaciones para el filtro seleccionado."
			errorMessage="No se pudieron cargar las designaciones"
			getKey={(d) => d.id}
			renderItem={(d) => (
				<DesignacionCursoCard
					designacion={d}
					onVerDetalle={props.onVerDetalle}
				/>
			)}
		/>
	);
}