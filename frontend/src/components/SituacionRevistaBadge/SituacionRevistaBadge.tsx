import { SituacionDeRevista } from "@/utils/types/enums";
import { SITUACION_REVISTA_CONFIG } from "../../features/asignaciones/utils/asignacion.badges";
import styles from "./SituacionRevistaBadge.module.scss";

type Props = {
	value: SituacionDeRevista;
};

export default function SituacionRevistaBadge({ value }: Props) {

	const { label, className, Icon } = SITUACION_REVISTA_CONFIG[value];

	return (
		<span className={`${styles.badge} ${styles[className]}`}>
			<Icon size={12} className={styles.icon} />
			<span className={styles.label}>{label}</span>
		</span>
	);
}
