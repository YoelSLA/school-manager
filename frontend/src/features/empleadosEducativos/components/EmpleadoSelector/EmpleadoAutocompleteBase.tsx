import { type ReactNode, useId } from "react";
import useEmpleadoSearch from "../../hooks/useEmpleadoSearch";
import type { EmpleadoEducativoMinimoDTO } from "../../types/empleadosEducativos.types";
import styles from "./EmpleadoAutocompleteBase.module.scss";

type AutocompleteProps = {
	value: string;
	onChange: (v: string) => void;
	onSelect: (e: EmpleadoEducativoMinimoDTO) => void;
	label?: ReactNode;
	placeholder?: string;
	error?: { message?: string };
	disabled?: boolean;
};

export default function EmpleadoAutocompleteBase({
	value,
	onChange,
	onSelect,
	label,
	placeholder,
	error,
	disabled,
}: AutocompleteProps) {
	const shouldSearch = !disabled && value.trim().length > 0;
	const { empleados, loading } = useEmpleadoSearch(shouldSearch ? value : "");
	const inputId = useId();

	return (
		<div className={styles["empleado-autocomplete"]}>
			{label && (
				<label
					htmlFor={inputId}
					className={styles["empleado-autocomplete__label"]}
				>
					{label}
				</label>
			)}

			<input
				id={inputId}
				type="text"
				value={value}
				placeholder={placeholder}
				onChange={(e) => onChange(e.target.value)}
				aria-invalid={!!error}
				className={[
					styles["empleado-autocomplete__input"],
					error && styles["empleado-autocomplete__input--error"],
				]
					.filter(Boolean)
					.join(" ")}
			/>

			{shouldSearch && loading && (
				<div className={styles["empleado-autocomplete__loading"]}>
					Buscando…
				</div>
			)}

			{shouldSearch && empleados.length > 0 && (
				<ul className={styles["empleado-autocomplete__list"]}>
					{empleados.map((e) => (
						<li key={e.id} className={styles["empleado-autocomplete__item"]}>
							<button
								type="button"
								className={styles["empleado-autocomplete__button"]}
								onMouseDown={(ev) => {
									ev.preventDefault(); // 🔥 evita blur
									onSelect(e);
								}}
							>
								{e.apellido}, {e.nombre}
							</button>
						</li>
					))}
				</ul>
			)}

			{error && (
				<span className={styles["empleado-autocomplete__error"]}>
					{error.message}
				</span>
			)}
		</div>
	);
}
