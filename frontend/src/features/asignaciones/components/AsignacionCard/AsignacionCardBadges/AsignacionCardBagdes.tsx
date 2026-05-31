import BadgeSituacionRevista from "@/shared/components/BadgeSituacionRevista/BadgeSituacionRevista";
import BadgeEstadoAsignacion from "@/shared/components/BagdeEstadoAsignacion";
import type {
	EstadoAsignacion,
	SituacionDeRevista,
} from "@/shared/utils/types/enums";
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
