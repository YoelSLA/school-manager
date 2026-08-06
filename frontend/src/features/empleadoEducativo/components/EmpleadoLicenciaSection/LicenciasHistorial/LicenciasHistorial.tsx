import type { LicenciaEmpleadoEducativoRowDTO } from "@/features/licencia/types";
import EmpleadoEducativoLicenciaRow from "../../EmpleadoEducativoLicenciaRow";
import styles from "./LicenciasHistorial.module.scss";

type Props = {
  licencias: LicenciaEmpleadoEducativoRowDTO[];
};

export default function LicenciasHistorial({ licencias }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h4 className={styles.title}>Historial</h4>

        <span className={styles.count}>{licencias.length}</span>
      </div>

      <div className={styles.content}>
        {licencias.length === 0 ? (
          <div className={styles.empty}>No registra licencias finalizadas</div>
        ) : (
          licencias.map((licencia) => (
            <div key={licencia.id} className={styles.item}>
              <EmpleadoEducativoLicenciaRow licencia={licencia} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
