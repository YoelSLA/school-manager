import styles from "./EmpleadoSearchBar.module.scss";

type Props = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	autoFocus?: boolean;
};

export default function EmpleadoSearchBar({
	value,
	onChange,
	placeholder = "Apellido, nombre o CUIL",
}: Props) {
	return (
		<div className={styles.search}>
			<span className={styles.icon}>🔍</span>

			<input
				type="text"
				className={styles.input}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
			/>
		</div>
	);
}
