import TableHeader from "@/components/Table/TableHeader";
import styles from "./EmpleadosEducativosHeader.module.scss";

export default function EmpleadosEducativosHeader() {
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