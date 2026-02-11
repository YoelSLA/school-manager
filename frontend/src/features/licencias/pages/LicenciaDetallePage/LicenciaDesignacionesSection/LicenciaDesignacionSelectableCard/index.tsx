import type { LicenciaDesignacionDTO } from "@/features/licencias/types/licencia.types";
import "./LicenciaDesignacionSelectableCard.css";

type Props = {
	designacion: LicenciaDesignacionDTO;
	checked: boolean;
	onToggle: () => void;
};

export function LicenciaDesignacionSelectableCard({
	designacion,
	checked,
	onToggle,
}: Props) {
	const seleccionable =
		designacion.estado === "VACANTE" || designacion.estado === "LICENCIA";

	const checkboxId = `designacion-${designacion.cupof}`;

	return (
		<article
			className={`licencia-designacion-card ${seleccionable ? "seleccionable" : "no-seleccionable"
				}`}
		>
			<div className="licencia-designacion-content">
				{seleccionable && (
					<input
						id={checkboxId}
						type="checkbox"
						checked={checked}
						onChange={onToggle}
					/>
				)}

				<div className="licencia-designacion-info">
					<label htmlFor={checkboxId}>
						<strong>
							#{designacion.cupof} · {designacion.rolEducativo}
						</strong>
					</label>

					<span className={`estado ${designacion.estado.toLowerCase()}`}>
						{designacion.estado.replaceAll("_", " ")}
					</span>
				</div>
			</div>
		</article>
	);
}
