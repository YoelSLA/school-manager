import type { ReactNode } from "react";
import styles from "../forms/FormSelectField/FormSelectField.module.scss";

type Props = {
	label: ReactNode;
	value?: string | number;
	onChange?: (value: string) => void;
	error?: string;
	id?: string;
	children: ReactNode;
	disabled?: boolean;
};

export default function SelectField({
	label,
	value,
	onChange,
	error,
	id,
	children,
	disabled = false,
}: Props) {
	const fieldId = id ?? String(label);

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
					value={value ?? ""}
					onChange={(e) => onChange?.(e.target.value)}
				>
					{children}
				</select>

				<span className={styles["form-select__chevron"]} aria-hidden>
					▾
				</span>

				{error && (
					<span className={styles["form-select__error-icon"]} aria-hidden>
						⚠
					</span>
				)}
			</div>

			{error && (
				<div className={styles["form-select__error-tooltip"]} role="alert">
					{error}
				</div>
			)}
		</div>
	);
}
