import styles from "./AsistenciaQuickSummary.module.scss";

type Props = {
  empleadoId: string;
};

export default function AsistenciaQuickSummary({
  empleadoId,
}: Props) {
  // TODO: reemplazar por hook real usando empleadoId
  console.log(empleadoId);

  return (
    <section className={styles.card}>
      <h3 className={styles.card__title}>Resumen rápido</h3>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.stat__label}>Justificadas</span>
          <span className={styles.stat__value}>10</span>
        </div>

        <div className={styles.stat}>
          <span className={styles.stat__label}>Injustificadas</span>
          <span className={styles.stat__value}>8</span>
        </div>
      </div>

      <div className={styles.highlight}>
        <span className={styles.highlight__label}>
          Mes con más faltas
        </span>

        <strong className={styles.highlight__value}>
          Febrero (5)
        </strong>
      </div>

      <button type="button" className={styles.button}>
        Ver historial completo
      </button>
    </section>
  );
}