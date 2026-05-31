import { Lock } from "lucide-react";
import type {
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister,
} from "react-hook-form";

import styles from "./FormInputField.module.scss";

type Props<T extends FieldValues> = {
	label: React.ReactNode;
	name: Path<T>;
	register: UseFormRegister<T>;

	type?: string;
	registerOptions?: RegisterOptions<T>;

	error?: string;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function FormInputFieldRHF<T extends FieldValues>({
	label,
	name,
	register,
	type = "text",
	registerOptions,
	error,
	inputProps,
}: Props<T>) {
	const fieldId = String(name);
	const isReadOnly = inputProps?.readOnly;

	const {
		onChange,
		onBlur,
		ref,
		name: fieldName,
	} = register(name, registerOptions);

	return (
		<div
			className={`${styles["form-field"]}
        ${error ? styles["form-field--error"] : ""}
        ${isReadOnly ? styles["form-field--readonly"] : ""}
      `}
		>
			<label htmlFor={fieldId} className={styles["form-field__label"]}>
				{label}
				{isReadOnly && (
					<Lock size={14} className={styles["form-field__lock"]} />
				)}
			</label>

			<input
				id={fieldId}
				name={fieldName}
				type={type}
				ref={ref}
				className={styles["form-field__input"]}
				aria-invalid={!!error}
				aria-describedby={error ? `${fieldId}-error` : undefined}
				onChange={(e) => {
					onChange(e);
				}}
				onBlur={(e) => {
					onBlur(e);
				}}
				{...inputProps}
			/>

			{error && (
				<>
					<span className={styles["form-field__error-icon"]} aria-hidden>
						⚠
					</span>

					<div
						id={`${fieldId}-error`}
						className={styles["form-field__error-tooltip"]}
						role="alert"
					>
						<span className={styles["form-field__tooltip-icon"]}>⚠</span>
						<span>{error}</span>
					</div>
				</>
			)}
		</div>
	);
}
