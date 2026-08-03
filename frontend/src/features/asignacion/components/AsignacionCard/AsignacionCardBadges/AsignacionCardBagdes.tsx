import BadgeSituacionRevista from "@/shared/components/badges/BadgeSituacionRevista/BadgeSituacionRevista";
import BadgeEstadoAsignacion from "@/shared/components/badges/BagdeEstadoAsignacion";
import type {
	EstadoAsignacion,
	SituacionDeRevista,
} from "@/shared/types/enums";
import styles from "./AsignacionCardBadges.module.scss";

type Props = {
	situacionDeRevista: SituacionDeRevista;
	estadoAsignacion: EstadoAsignacion;
};

export default function AsignacionCardBadges({
	situacionDeRevista,
	estadoAsignacion,
}: Props) {
	return (
		<div className={styles.badges}>
			<BadgeSituacionRevista value={situacionDeRevista} />

			<BadgeEstadoAsignacion value={estadoAsignacion} />
		</div>
	);
}
