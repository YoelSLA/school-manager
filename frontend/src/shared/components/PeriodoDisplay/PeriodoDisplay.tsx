import { CalendarDays, Clock3 } from "lucide-react";
import type { PeriodoDTO } from "@/shared/types";
import { formatDate } from "@/shared/utils/date";
import styles from "./PeriodoDisplay.module.scss";

type Props = {
  periodo: PeriodoDTO;

  showDuration?: boolean;

  showCurrent?: boolean;
};

export default function PeriodoDisplay({
  periodo,
  showDuration = true,
  showCurrent = true,
}: Props) {
  const isClosed = "fechaHasta" in periodo;

  return (
    <div className={styles.periodo}>
      <div className={styles.group}>
        <CalendarDays size={14} />

        <span>{formatDate(periodo.fechaDesde)}</span>

        {isClosed ? (
          <>
            <span className={styles.separator}>→</span>

            <span>{formatDate(periodo.fechaHasta)}</span>
          </>
        ) : (
          showCurrent && (
            <>
              <span className={styles.separator}>→</span>

              <span className={styles.actual}>Actual</span>
            </>
          )
        )}
      </div>

      {showDuration && isClosed && periodo.dias > 0 && (
        <div className={styles.duration}>
          <Clock3 size={14} />

          <span>{periodo.dias} días</span>
        </div>
      )}
    </div>
  );
}
