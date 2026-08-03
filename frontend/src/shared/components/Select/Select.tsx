import type { ReactNode, SelectHTMLAttributes } from "react";

import styles from "./Select.module.scss";

type Props = {
  label: ReactNode;
  invalid?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  label,
  invalid = false,
  id,
  name,
  children,
  className,
  disabled,
  ...props
}: Props) {
  const fieldId = id ?? name;

  return (
    <div
      className={[
        styles.select,
        invalid && styles["select--invalid"],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={fieldId} className={styles.select__label}>
        {label}
      </label>

      <div className={styles.select__control}>
        <select
          id={fieldId}
          name={name}
          className={styles.select__select}
          disabled={disabled}
          aria-invalid={invalid}
          {...props}
        >
          {children}
        </select>

        <span className={styles.select__chevron} aria-hidden>
          ▾
        </span>
      </div>
    </div>
  );
}