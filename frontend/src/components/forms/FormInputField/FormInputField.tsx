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
	type?: string;
	register: UseFormRegister<T>;
	error?: string;
	registerOptions?: RegisterOptions<T>;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function FormInputField<T extends FieldValues>({
	label,
	name,
	type = "text",
	register,
	error,
	registerOptions,
	inputProps,
}: Props<T>) {
	const fieldId = String(name);
	const isReadOnly = inputProps?.readOnly;

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
				type={type}
				className={styles["form-field__input"]}
				{...register(name, registerOptions)}
				{...inputProps}
			/>

			{error && (
				<>
					<span
						className={styles["form-field__error-icon"]}
						aria-hidden
					>
						⚠
					</span>

					<div
						className={styles["form-field__error-tooltip"]}
						role="alert"
					>
						{error}
					</div>
				</>
			)}
		</div>
	);
}
