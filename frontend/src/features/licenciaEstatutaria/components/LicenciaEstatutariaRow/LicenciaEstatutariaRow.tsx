import { Edit, Trash2 } from "lucide-react";
import { TableRow } from "@/shared/components/Table";
import type { LicenciaEstatutariaRowDTO } from "../../types";
import styles from "./LicenciaEstatutariaRow.module.scss";

type Props = {
  licenciaEstatutaria: LicenciaEstatutariaRowDTO;
  onEdit: () => void;
  onDelete: () => void;
};

export default function LicenciaEstatutariaRow({
  licenciaEstatutaria,
  onEdit,
  onDelete,
}: Props) {
  return (
    <TableRow className={styles.row}>
      <div className={styles.articulo}>
        {licenciaEstatutaria.articulo}
      </div>

      <div className={styles.codigo}>
        {licenciaEstatutaria.codigo}
      </div>

      <div className={styles.nombre}>
        <div className={styles.nombrePrincipal}>
          {licenciaEstatutaria.nombre}
        </div>

        {licenciaEstatutaria.descripcion && (
          <div className={styles.descripcion}>
            {licenciaEstatutaria.descripcion}
          </div>
        )}
      </div>

      <div className={styles.estado}>
        <span
          className={`${styles.badge} ${licenciaEstatutaria.activa
            ? styles.activa
            : styles.inactiva
            }`}
        >
          {licenciaEstatutaria.activa ? "Activa" : "Inactiva"}
        </span>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={onEdit}
        >
          <Edit size={18} />
        </button>

        <button
          type="button"
          className={styles.iconButton}
          onClick={onDelete}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </TableRow>
  );
}