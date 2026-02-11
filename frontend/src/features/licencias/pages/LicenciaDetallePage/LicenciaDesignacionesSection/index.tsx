import type { LicenciaDesignacionDTO } from "@/features/licencias/types/licencia.types";
import { LicenciaDesignacionesActions } from "./LicenciaDesignacionesActions";
import "./LicenciaDesignacionesSection.css";
import { LicenciaDesignacionSelectableCard } from "./LicenciaDesignacionSelectableCard";

type Props = {
	designaciones: LicenciaDesignacionDTO[];
	selectedIds: number[];
	onToggle: (id: number) => void;
	onClearSelection: () => void;
	onCubrirSeleccionadas: () => void;
};

export function LicenciaDesignacionesSection({
	designaciones,
	selectedIds,
	onToggle,
	onClearSelection,
	onCubrirSeleccionadas,
}: Props) {
	return (
		<section className="licencia-designaciones">
			<h3>Designaciones afectadas ({designaciones.length})</h3>

			{designaciones.map((d) => (
				<LicenciaDesignacionSelectableCard
					key={d.designacionId}
					designacion={d}
					checked={selectedIds.includes(d.designacionId)}
					onToggle={() => onToggle(d.designacionId)}
				/>
			))}

			<LicenciaDesignacionesActions
				selectedCount={selectedIds.length}
				onClear={onClearSelection}
				onCubrir={onCubrirSeleccionadas}
			/>
		</section>
	);
}
