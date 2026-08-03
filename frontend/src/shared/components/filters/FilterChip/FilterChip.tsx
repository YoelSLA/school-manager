import { X } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./FilterChip.module.scss";

type Props = {
  icon?: ReactNode;
  label: string;
  onRemove: () => void;
};

export default function FilterChip({
  icon,
  label,
  onRemove,
}: Props) {
  return (
    <div className={styles.chip}>
      {icon && (
        <span className={styles.icon}>
          {icon}
        </span>
      )}

      <span className={styles.label}>
        {label}
      </span>

      <button
        type="button"
        className={styles.remove}
        onClick={onRemove}
        aria-label={`Quitar filtro ${label}`}
      >
        <X size={14} />
      </button>
    </div>
  );
}