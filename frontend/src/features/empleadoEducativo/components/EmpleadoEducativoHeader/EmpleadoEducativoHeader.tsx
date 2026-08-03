import TableHeader from "@/shared/components/Table/TableHeader";
import styles from "./EmpleadoEducativoHeader.module.scss";

export default function EmpleadoEducativoHeader() {
  return (
    <TableHeader className={styles.header}>
      <span>Empleado</span>
      <span>CUIL</span>
      <span>Ingreso</span>
      <span>Roles</span>
      <span>Estado</span>
      <span>Acciones</span>
    </TableHeader>
  );
}