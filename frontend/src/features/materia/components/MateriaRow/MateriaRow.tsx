import { Edit, Trash2 } from "lucide-react";
import Row from "@/shared/components/Table/TableRow";
import type { MateriaRowDTO } from "../../types";
import styles from "./MateriaRow.module.scss";

type Props = {
  materia: MateriaRowDTO;
  onEdit: () => void;
  onDelete: () => void;
};

export default function MateriaRow({
  materia,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Row className={styles.row}>
      <div className={styles.nombre}>
        {materia.nombre}
      </div>

      <div className={styles.abreviatura}>
        {materia.abreviatura}
      </div>

      <div className={styles.modulos}>
        {materia.cantidadModulos} módulos
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
    </Row>
  );
}