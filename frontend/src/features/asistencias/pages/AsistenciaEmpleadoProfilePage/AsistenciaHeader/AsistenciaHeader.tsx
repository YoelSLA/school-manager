import styles from "./AsistenciaHeader.module.scss";

export default function AsistenciaHeader() {
  return (
    <div className={styles.header}>
      <div>
        <h2>Gómez, Mariana</h2>
        <span>CUIL: 27-31894562-3</span>
      </div>

      <button type="button" className={styles.button}>
        Ver mes actual
      </button>
    </div>
  );
}
