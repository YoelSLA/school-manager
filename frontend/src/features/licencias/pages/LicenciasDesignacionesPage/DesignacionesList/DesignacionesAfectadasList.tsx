import type { LicenciaDesignacionDTO } from "@/features/licencias/types/licencia.types";
import DesignacionItem from "./DesignacionItem/DesignacionItem";
import styles from "./DesignacionesAfectadasList.module.scss";

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
		return (
			<p className={styles.designacionesList__empty}>
				No hay designaciones afectadas
			</p>
		);
	}

	return (
		<div className={styles.designacionesList}>
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