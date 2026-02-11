import type { LicenciaDesignacionDTO } from "@/features/licencias/types/licencia.types";
import "./DesignacionItem.css";

type Props = {
	designacion: LicenciaDesignacionDTO;
	checked: boolean;
	onToggle: (id: number) => void;
};

export default function DesignacionItem({
	designacion,
	checked,
	onToggle,
}: Props) {
	const estaCubierta = designacion.estado === "CUBIERTA";

	return (
		<label
			className={`designacion-item ${estaCubierta ? "designacion-item--disabled" : ""
				}`}
		>
			<div className="designacion-left">
				<input
					type="checkbox"
					checked={checked}
					disabled={estaCubierta}
					onChange={() => onToggle(designacion.designacionId)}
				/>

				<div className="designacion-info">
					<div className="designacion-rol">{designacion.rolEducativo}</div>
					<div className="designacion-cupof">#{designacion.cupof}</div>
				</div>
			</div>

			<span
				className={`designacion-estado estado-${designacion.estado.toLowerCase()}`}
			>
				{designacion.estado}
			</span>
		</label>
	);
}
