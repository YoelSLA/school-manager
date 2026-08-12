import { TableHeader } from "@/shared/components/Table";
import styles from "./CursoTableHeader.module.scss";

export default function CursoTableHeader() {
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
