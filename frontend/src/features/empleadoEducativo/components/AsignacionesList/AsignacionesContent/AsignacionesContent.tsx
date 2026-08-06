import type { AsignacionEmpleadoEducativoRowDTO } from "@/features/asignacion/types";
import type { DesignacionTab } from "@/features/designacion/types";
import EmpleadoEducativoAsignacionRow from "../../EmpleadoEducativoAsignacionRow";
import styles from "./AsignacionesContent.module.scss";

type Props = {
  tab: DesignacionTab;
  asignaciones: AsignacionEmpleadoEducativoRowDTO[];
};

export default function AsignacionesContent({ tab, asignaciones }: Props) {
  if (asignaciones.length === 0) {
    return (
      <div className={styles.empty}>
        <p>
          {tab === "DOCENTE"
            ? "No registra cargos docentes"
            : "No registra cargos administrativos"}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      {asignaciones.map((asignacion) => (
        <div key={asignacion.id} className={styles.item}>
          <EmpleadoEducativoAsignacionRow asignacion={asignacion} />
        </div>
      ))}
    </div>
  );
}
