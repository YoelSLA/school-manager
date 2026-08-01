import TableHeader from "@/components/Table/TableHeader";
import styles from "./MateriasHeader.module.scss";

export default function MateriasHeader() {
  return (
    <TableHeader className={styles.header}>
      <div>Materia</div>
      <div>Abreviatura</div>
      <div>Módulos</div>
      <div>Acciones</div>
    </TableHeader>
  );
}