import type { SortDirection } from "@/utils/types";
import styles from "./EmpleadoSortField.module.scss";

type Props = {
  title: string;
  value?: SortDirection;
  onChange: (dir: SortDirection) => void;
  ascLabel: string;
  descLabel: string;
};

export default function EmpleadoSortField({
  title,
  value,
  onChange,
  ascLabel,
  descLabel,
}: Props) {
  return (
    <div className={styles.field}>
      <span className={styles.field__title}>{title}</span>

      <label className={styles.field__option}>
        <input
          type="radio"
          checked={value === "asc"}
          onChange={() => onChange("asc")}
        />
        {ascLabel}
      </label>

      <label className={styles.field__option}>
        <input
          type="radio"
          checked={value === "desc"}
          onChange={() => onChange("desc")}
        />
        {descLabel}
      </label>
    </div>
  );
}
