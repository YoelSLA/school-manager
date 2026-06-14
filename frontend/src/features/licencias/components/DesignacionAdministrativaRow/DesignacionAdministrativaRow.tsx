import { Hash, User } from "lucide-react";
import BadgeSituacionRevista from "@/shared/components/BadgeSituacionRevista";
import PeriodoDisplay from "@/shared/components/PeriodoDisplay";
import type { AsignacionLicenciaAdministrativaDTO } from "@/shared/types";
import styles from "./DesignacionAdministrativaRow.module.scss";

type Props = {
  asignacion: AsignacionLicenciaAdministrativaDTO;
  checked: boolean;
  onToggle: (id: number) => void;
};

export default function DesignacionAdministrativaRow({
  asignacion,
  checked,
  onToggle,
}: Props) {
  return (
    <label className={styles.item}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(asignacion.id)}
      />

      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.cupof}>
            <Hash size={15} />
            {asignacion.cupof}
          </span>

          <span className={styles.rol}>
            <User size={15} />
            {asignacion.rolEducativo}
          </span>
        </div>

        <div className={styles.meta}>
          <span className={styles.tipo}>
            <BadgeSituacionRevista
              value={asignacion.situacionDeRevista}
            />
          </span>

          <span className={styles.dot}>•</span>

          <span className={styles.fecha}>
            <PeriodoDisplay
              periodo={asignacion.periodo}
              showDuration={false}
            />
          </span>
        </div>
      </div>
    </label>
  );
}