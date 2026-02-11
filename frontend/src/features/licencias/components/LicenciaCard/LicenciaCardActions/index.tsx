import "./LicenciaCardActions.css";

type Props = {
	onVerDetalle: () => void;
};

export function LicenciaCardActions({ onVerDetalle }: Props) {
	return (
		<footer className="licencia-card__actions">
			<button type="button" className="btn-ver-detalle" onClick={onVerDetalle}>
				Ver detalle
			</button>
		</footer>
	);
}
