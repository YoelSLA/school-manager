import TableHeader from "@/shared/components/Table/TableHeader";
import styles from "../DesignacionHeader.module.scss";

export default function DesignacionAdministrativaHeader() {
  return (
    <TableHeader className={styles.header}>
      <span>Rol Educativo</span>
      <span>Situación de Revista</span>
      <span>Empleado</span>
      <span>Estado</span>
      <span>Franjas</span>
      <span>CUPOF</span>
      <span>Acciones</span>
    </TableHeader>
  );
}