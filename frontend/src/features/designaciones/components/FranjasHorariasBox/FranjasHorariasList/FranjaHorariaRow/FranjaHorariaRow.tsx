import type { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";
import type { FormWithFranjas } from "@/features/designaciones/types/designacion.types";
import { Trash2, Clock } from "lucide-react";
import Button from "@/components/Button";

import styles from "./FranjaHorariaRow.module.scss";
import { DIAS_SEMANA } from "@/features/designaciones/utils/designacion.utils";

type Props<T extends FieldValues & FormWithFranjas> = {
  index: number;
  register: UseFormRegister<T>;
  onRemove: () => void;
};

export default function FranjaHorariaRow<T extends FormWithFranjas>({
  index,
  register,
  onRemove,
}: Props<T>) {
  const diaPath = `franjasHorarias.${index}.dia` as FieldPath<T>;
  const desdePath = `franjasHorarias.${index}.horaDesde` as FieldPath<T>;
  const hastaPath = `franjasHorarias.${index}.horaHasta` as FieldPath<T>;

  return (
    <div className={styles.row}>
      <select className={styles.field} {...register(diaPath)}>
        {DIAS_SEMANA.map((dia) => (
          <option key={dia} value={dia}>
            {dia}
          </option>
        ))}
      </select>

      <div className={styles.timeField}>
        <Clock size={14} />
        <input type="time" {...register(desdePath)} />
      </div>

      <div className={styles.timeField}>
        <Clock size={14} />
        <input type="time" {...register(hastaPath)} />
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
