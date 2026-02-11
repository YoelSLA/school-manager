import Button from "@/components/Button";
import "./LicenciaDesignacionesActions.css";

type Props = {
	selectedCount: number;
	onClear: () => void;
	onCubrir: () => void;
};

export function LicenciaDesignacionesActions({
	selectedCount,
	onCubrir,
	onClear,
}: Props) {
	if (selectedCount === 0) return null;

	return (
		<footer className="licencia-designaciones-actions">
			<span>{selectedCount} seleccionadas</span>

			<div className="actions">
				<Button variant="secondary" size="sm" onClick={onClear}>
					Limpiar
				</Button>

				<Button
					variant="primary"
					size="sm"
					disabled={selectedCount === 0}
					onClick={onCubrir}
				>
					Cubrir seleccionadas
				</Button>
			</div>
		</footer>
	);
}
