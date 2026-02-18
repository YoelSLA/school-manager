import type { RolEducativo } from "@/features/designaciones/types/designacion.types";
import { ROL_EDUCATIVO_LABELS } from "@/utils";
import styles from "./RolEducativoBadge.module.scss";

type Props = {
  value: RolEducativo;
};

export default function RolEducativoBadge({ value }: Props) {
  console.log(value, ROL_EDUCATIVO_LABELS[value]);
  const label = ROL_EDUCATIVO_LABELS[value];

  return (
    <span className={styles.chip}>
      {label}
    </span>
  );
}
