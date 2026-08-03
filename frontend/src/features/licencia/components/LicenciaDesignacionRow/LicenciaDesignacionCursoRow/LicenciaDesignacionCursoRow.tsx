import {
  BookOpen,
  GraduationCap,
} from "lucide-react";
import type { AsignacionLicenciaCursoDTO } from "@/features/asignacion/types";
import BadgeRolEducativo from "@/shared/components/badges/BadgeRolEducativo";
import { TURNO_LABELS } from "@/shared/utils/enumLabels";
import LicenciaDesignacionRow from "../LicenciaDesignacionRow";
import styles from "./LicenciaDesignacionCursoRow.module.scss";

type Props = {
  asignacion: AsignacionLicenciaCursoDTO;
  checked: boolean;
  onToggle: (id: number) => void;
};

export default function LicenciaDesignacionCursoRow({
  asignacion,
  checked,
  onToggle,
}: Props) {
  return (
    <LicenciaDesignacionRow
      checked={checked}
      onToggle={() => onToggle(asignacion.id)}
      cupof={asignacion.cupof}
      situacion={asignacion.situacionDeRevista}
      periodo={asignacion.periodo}
      headerContent={
        <>
          <div className={styles.info}>
            <div className={styles.materia}>
              <BookOpen size={14} />
              <span>{asignacion.materia.nombre}</span>
            </div>

            <div className={styles.curso}>
              <GraduationCap size={14} />
              <span>
                {asignacion.curso.division} —{" "}
                {TURNO_LABELS[asignacion.curso.turno]}
              </span>
            </div>
          </div>

          <BadgeRolEducativo
            rolEducativo={asignacion.rolEducativo}
          />
        </>
      }
    />
  );
}