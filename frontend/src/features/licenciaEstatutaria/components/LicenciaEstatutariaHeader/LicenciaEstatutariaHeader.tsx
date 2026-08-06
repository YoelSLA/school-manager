import { TableHeader } from "@/shared/components/Table";
import styles from "./LicenciaEstatutariaHeader.module.scss";

export default function LicenciaEstatutariaHeader() {
  return (
    <TableHeader className={styles.header}>
      <div>Artículo</div>
      <div>Código</div>
      <div>Nombre</div>
      <div>Estado</div>
      <div>Acciones</div>
    </TableHeader>
  );
}