import { X } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./SelectField.module.scss";

type Props = {
	label?: ReactNode;
	value?: string | number;
	onChange?: (value: string) => void;
	onClear?: () => void;
	id?: string;
	children: ReactNode;
	disabled?: boolean;
	icon?: ReactNode;
};

export default function SelectField({
	label,
	value,
	onChange,
	onClear,
	id,
	children,
	disabled = false,
	icon,
}: Props) {
	const fieldId = id ?? String(label);
	const hasValue = value && value !== "";

	return (
		<div className={styles.selectField}>
			<div className={styles.control}>
				{icon && <span className={styles.icon}>{icon}</span>}

				<select
					id={fieldId}
					className={styles.select}
					disabled={disabled}
					value={value ?? ""}
					onChange={(e) => onChange?.(e.target.value)}
				>
					{children}
				</select>

				{hasValue && onClear && (
					<button
						type="button"
						className={styles.clear}
						onClick={(e) => {
							e.stopPropagation();
							onClear();
						}}
					>
						<X size={14} />
					</button>
				)}

				<span className={styles.chevron}>▾</span>
			</div>
		</div>
	);
}
