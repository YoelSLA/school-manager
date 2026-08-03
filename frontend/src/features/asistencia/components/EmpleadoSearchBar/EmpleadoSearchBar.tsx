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
	placeholder = "Buscar Empleado",
}: Props) {
	const inputId = "empleado-search-input";

	return (
		<div className={styles.search}>
			<label htmlFor={inputId} className={styles.search__label}>
				🔍 {placeholder}
			</label>

			<input
				id={inputId}
				type="text"
				className={styles.search__input}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Apellido, nombre o CUIL"
			/>
		</div>
	);
}
