import type { ReactNode } from "react";
import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import Select from "@/shared/components/Select";

import styles from "./FormSelect.module.scss";

type Props<T extends FieldValues> = {
  label: ReactNode;
  name: Path<T>;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  error?: string;
  children: ReactNode;
  disabled?: boolean;
};

export default function FormSelect<T extends FieldValues>({
  label,
  name,
  register,
  registerOptions,
  error,
  children,
  disabled = false,
}: Props<T>) {
  return (
    <div className={styles.formSelect}>
      <Select
        label={label}
        disabled={disabled}
        invalid={!!error}
        {...register(name, registerOptions)}
      >
        {children}
      </Select>

      {error && (
        <div
          className={styles.formSelect__errorTooltip}
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
}