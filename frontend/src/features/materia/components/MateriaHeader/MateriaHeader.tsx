import { TableHeader } from "@/shared/components/Table";
import styles from "./MateriaHeader.module.scss";

export default function MateriaHeader() {
  return (
    <TableHeader className={styles.header}>
      <div>Materia</div>
      <div>Abreviatura</div>
      <div>Módulos</div>
      <div>Acciones</div>
    </TableHeader>
  );
}