import styles from "./CursosDesignacionesHeader.module.scss";

export default function CursosDesignacionesHeader() {
  return (
    <div className={styles.header}>
      <span>Materia</span>
      <span>Cargo</span>
      <span>Docente</span>
      <span>Estado</span>
      <span>Franjas</span>
      <span>CUPOF</span>
      <span>Acciones</span>
    </div>
  );
}