import { TableHeader } from "@/shared/components/Table";
import styles from "./EmpleadoEducativoTableHeader.module.scss";

export default function EmpleadoEducativoTableHeader() {
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