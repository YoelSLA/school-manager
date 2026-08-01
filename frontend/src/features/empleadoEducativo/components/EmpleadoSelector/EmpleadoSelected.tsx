import {
  IdCard,
  Trash2,
  UserRound,
} from "lucide-react";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadosEducativos/types/empleadoEducativo.types";
import styles from "./EmpleadoSelected.module.scss";

type Props = {
  empleado: EmpleadoEducativoBasicoDTO;
  onRemove: () => void;
};

export default function EmpleadoSelected({
  empleado,
  onRemove,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.person}>
        <UserRound size={18} className={styles.icon} />

        <span className={styles.name}>
          {empleado.apellido}, {empleado.nombre}
        </span>
      </div>

      <div className={styles.cuil}>
        <IdCard size={14} className={styles.icon} />

        <span>{empleado.cuil}</span>
      </div>

      <button
        type="button"
        className={styles.remove}
        onClick={onRemove}
        aria-label="Quitar empleado"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}