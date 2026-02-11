import type { ReactNode } from "react";
import type {
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister,
} from "react-hook-form";
import styles from "./FormSelectField.module.scss";

type Props<T extends FieldValues> = {
	label: ReactNode;
	name: Path<T>;
	register: UseFormRegister<T>;
	registerOptions?: RegisterOptions<T, Path<T>>;
	error?: string;
	id?: string;
	children: ReactNode;
	disabled?: boolean;
};

export default function FormSelectField<T extends FieldValues>({
	label,
	name,
	register,
	registerOptions,
	error,
	id,
	children,
	disabled = false,
}: Props<T>) {
	const fieldId = id ?? name;

	return (
		<div
			className={[
				styles["form-select"],
				error && styles["form-select--error"],
				disabled && styles["form-select--disabled"],
			]
				.filter(Boolean)
				.join(" ")}
		>
			<label htmlFor={fieldId} className={styles["form-select__label"]}>
				{label}
			</label>

			<div className={styles["form-select__control"]}>
				<select
					id={fieldId}
					className={styles["form-select__select"]}
					disabled={disabled}
					{...register(name, registerOptions)}
				>
					{disabled && <option value="">No aplica</option>}
					{children}
				</select>

				<span className={styles["form-select__chevron"]} aria-hidden>
					▾
				</span>

				{error && (
					<span
						className={styles["form-select__error-icon"]}
						aria-hidden
					>
						⚠
					</span>
				)}
			</div>

			{error && (
				<div
					className={styles["form-select__error-tooltip"]}
					role="alert"
				>
					{error}
				</div>
			)}
		</div>
	);
}
