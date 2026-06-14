import {
  BookOpen,
  GraduationCap,
  Hash,
  User,
} from "lucide-react";
import BadgeSituacionRevista from "@/shared/components/BadgeSituacionRevista";
import PeriodoDisplay from "@/shared/components/PeriodoDisplay";
import type { AsignacionLicenciaCursoDTO } from "@/shared/types";
import { TURNO_LABELS } from "@/shared/utils/enumLabels";
import styles from "./DesignacionCursoRow.module.scss";

type Props = {
  asignacion: AsignacionLicenciaCursoDTO;
  checked: boolean;
  onToggle: (id: number) => void;
};

export default function DesignacionCursoRow({
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

        <div className={styles.bottom}>
          <span className={styles.materia}>
            <BookOpen size={15} />
            {asignacion.materia.nombre}
          </span>

          <span className={styles.curso}>
            <GraduationCap size={15} />
            {asignacion.curso.division} —{" "}
            {TURNO_LABELS[asignacion.curso.turno]}
          </span>
        </div>

        <div className={styles.meta}>
          <BadgeSituacionRevista
            value={asignacion.situacionDeRevista}
          />

          <span className={styles.dot}>•</span>

          <div className={styles.fecha}>
            <PeriodoDisplay
              periodo={asignacion.periodo}
              showDuration={false}
            />
          </div>
        </div>
      </div>
    </label>
  );
}