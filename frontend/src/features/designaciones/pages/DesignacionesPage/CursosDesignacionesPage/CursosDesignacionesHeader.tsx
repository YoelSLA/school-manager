import TableHeader from "@/components/Table/TableHeader";
import styles from "../DesignacionesHeader.module.scss";

export default function CursosDesignacionesHeader() {
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