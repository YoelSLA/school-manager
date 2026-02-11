import type { DesignacionAdministrativaResumenDTO } from "../../types/designacion.types";
import DesignacionCard from "../DesignacionCard";
import DesignacionCardHorarios from "../DesignacionCard/DesignacionCardHorarios";
import styles from "./DesignacionAdministrativaCard.module.scss";

type Props = {
	designacion: DesignacionAdministrativaResumenDTO;
	onVerDetalle: (designacionId: number) => void;
};

export default function DesignacionAdministrativaCard({
	designacion,
	onVerDetalle,
}: Props) {
	return (
		<DesignacionCard
			cupof={designacion.cupof}
			estadoDesignacion={designacion.estadoDesignacion}
			rolEducativo={designacion.rolEducativo}
			viewTransitionName={`designacion-${designacion.cupof}`}
			onVerDetalle={() => onVerDetalle(designacion.id)}
		>
			<div className={styles.centerRow}>
				<DesignacionCardHorarios
					franjasCount={designacion.franjasHorarias.length}
				/>
			</div>
		</DesignacionCard>
	);
}
