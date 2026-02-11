import type { LicenciaDesignacionDTO } from "@/features/licencias/types/licencia.types";
import DesignacionItem from "./DesignacionItem";
import "./DesignacionesList.css";

type Props = {
	designaciones: LicenciaDesignacionDTO[];
	seleccionadas: number[];
	onToggle: (id: number) => void;
};

export default function DesignacionesList({
	designaciones,
	seleccionadas,
	onToggle,
}: Props) {
	if (designaciones.length === 0) {
		return <p className="empty">No hay designaciones afectadas</p>;
	}

	return (
		<div className="designaciones-licencia-list">
			{designaciones.map((d) => (
				<DesignacionItem
					key={d.designacionId}
					designacion={d}
					checked={seleccionadas.includes(d.designacionId)}
					onToggle={onToggle}
				/>
			))}
		</div>
	);
}
