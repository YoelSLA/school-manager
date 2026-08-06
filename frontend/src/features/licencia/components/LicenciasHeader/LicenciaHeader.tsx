import TableHeader from "@/shared/components/Table/TableHeader";
import styles from "./LicenciaHeader.module.scss";

export default function LicenciaHeader() {
  return (
    <TableHeader className={styles.header}>
      <div>Empleado</div>
      <div>Licencia</div>
      <div>Período</div>
      <div>Duración</div>
      <div>Estado</div>
      <div>Acciones</div>
    </TableHeader>
  );
}