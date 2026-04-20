import { Clock, Trash2 } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";
import Button from "@/components/Button";
import { DIAS_SEMANA } from "@/utils";
import type { DesignacionCursoFormValues } from "@/utils/types";
import styles from "../FranjaHorariaRow.module.scss";

type Props = {
  index: number;
  register: UseFormRegister<DesignacionCursoFormValues>;
  onRemove: () => void;
};

export default function FranjaHorariaRowCurso({
  index,
  register,
  onRemove,
}: Props) {
  return (
    <div className={styles.row}>
      <select
        className={styles.field}
        {...register(`franjasHorarias.${index}.dia`)}
      >
        {DIAS_SEMANA.map((dia) => (
          <option key={dia} value={dia}>
            {dia}
          </option>
        ))}
      </select>

      <div className={styles.timeField}>
        <Clock size={14} />
        <input
          type="time"
          {...register(`franjasHorarias.${index}.horaDesde`)}
        />
      </div>

      <div className={styles.timeField}>
        <Clock size={14} />
        <input
          type="time"
          {...register(`franjasHorarias.${index}.horaHasta`)}
        />
      </div>

      <Button
        type="button"
        variant="danger"
        size="sm"
        className={styles.remove}
        onClick={onRemove}
        aria-label="Eliminar franja horaria"
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}