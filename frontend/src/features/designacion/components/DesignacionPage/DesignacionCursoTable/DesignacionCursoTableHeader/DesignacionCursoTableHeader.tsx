import { TableHeader } from "@/shared/components/Table";
import styles from "../../DesignacionTableHeader.module.scss";

export default function DesignacionCursoTableHeader() {
  return (
    <TableHeader className={styles.header}>
      <span>Materia</span>
      <span>Situación de Revista</span>
      <span>Docente</span>
      <span>Estado</span>
      <span>Franjas</span>
      <span>CUPOF</span>
      <span>Acciones</span>
    </TableHeader>
  );
}