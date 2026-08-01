import TableHeader from "@/components/Table/TableHeader";
import styles from "./CursosHeader.module.scss";

export default function CursosHeader() {
  return (
    <TableHeader className={styles.header}>
      <div>Año</div>
      <div>Grado</div>
      <div>División</div>
      <div>Turno</div>
      <div>Acciones</div>
    </TableHeader>
  );
}