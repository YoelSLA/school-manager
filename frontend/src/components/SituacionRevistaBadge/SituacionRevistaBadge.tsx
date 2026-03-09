
import type { SituacionDeRevista } from "../../features/asignaciones/types/asignacion.types";
import { SITUACION_REVISTA_CONFIG } from "../../features/asignaciones/utils/asignacion.badges";
import styles from "./SituacionRevistaBadge.module.scss";

type Props = {
  value: SituacionDeRevista;
};

export default function SituacionRevistaBadge({ value }: Props) {
  const config = SITUACION_REVISTA_CONFIG[value.toUpperCase() as SituacionDeRevista];

  const { label, className, Icon } = config;

  return (
    <span className={`${styles.badge} ${styles[className]}`}>
      <Icon size={12} className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </span>
  );
}

