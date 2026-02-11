import "./LicenciaCardSkeleton.css";

export function LicenciaCardSkeleton() {
	return (
		<div className="licencia-card skeleton">
			<div className="sk-row sk-top">
				<div className="sk-pill sk-small" />
				<div className="sk-pill sk-small" />
			</div>

			<div className="sk-row">
				<div className="sk-pill sk-medium" />
				<div className="sk-line sk-long" />
			</div>

			<div className="sk-divider" />

			<div className="sk-line sk-medium" />
			<div className="sk-line sk-small" />

			<div className="sk-divider" />

			<div className="sk-row sk-footer">
				<div className="sk-pill sk-medium" />
				<div className="sk-button" />
			</div>
		</div>
	);
}
