import styles from "./AdministrativasDesignacionesHeader.module.scss";

export default function AdministrativasDesignacionesHeader() {
  return (
    <div className={styles.header}>
      <span>Rol Educativo</span>
      <span>Situación de Revista</span>
      <span>Empleado</span>
      <span>Estado</span>
      <span>Franjas</span>
      <span>CUPOF</span>
      <span>Acciones</span>
    </div>
  );
}