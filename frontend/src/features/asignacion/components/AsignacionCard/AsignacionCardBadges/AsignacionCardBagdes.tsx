import { BadgeEstadoAsignacion, BadgeSituacionRevista } from "@/shared/components/badges";
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
