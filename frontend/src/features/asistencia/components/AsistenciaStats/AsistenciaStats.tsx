
import Button from "@/shared/components/Button";
import type { AsistenciaDiaDTO } from "../../types";
import { useAsistenciaStats } from "../../utils";
import AsistenciaProgress from "./AsistenciaProgress";
import styles from "./AsistenciaStats.module.scss";
import AusenciasDetalle from "./AusenciasDetalle";

type Props = {
  asistencias: AsistenciaDiaDTO[];
};

export default function AsistenciaStats({ asistencias }: Props) {
  const {
    diasEsperados,
    cantidadPresentes,
    cantidadAusentes,
    porcentajePresentes,
    ausentesPorCodigo,
  } = useAsistenciaStats(asistencias);

  return (
    <aside className={styles.stats}>
      <section className={styles.bloque}>
        {/* =============================================
				 * HEADER
				 * ===========================================*/}
        <div className={styles.headerResumen}>
          <span className={styles.mesSubtitulo}>
            {diasEsperados} días laborales
          </span>
        </div>

        {/* =============================================
				 * CONTENT
				 * ===========================================*/}
        <div className={styles.content}>
          <AsistenciaProgress
            porcentaje={porcentajePresentes}
            presentes={cantidadPresentes}
            ausentes={cantidadAusentes}
          />

          {cantidadAusentes > 0 && (
            <AusenciasDetalle ausentesPorCodigo={ausentesPorCodigo} />
          )}
        </div>

        {/* =============================================
				 * ACTION
				 * ===========================================*/}
        <div className={styles.actionWrapper}>
          <Button size="sm">Ver detalle del mes</Button>
        </div>
      </section>
    </aside>
  );
}
