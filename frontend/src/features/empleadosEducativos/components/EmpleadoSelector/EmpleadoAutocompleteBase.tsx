import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import useEmpleadoSearch from "../../hooks/useEmpleadoSearch";
import styles from "./EmpleadoAutocompleteBase.module.scss";
import { EmpleadoEducativoMinimoDTO } from "@/utils/types";

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
	const inputId = useId();
	const containerRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState(false);
	const [highlightIndex, setHighlightIndex] = useState(-1);

	const debouncedSearch = useDebounce(value, 300);

	const shouldSearch = !disabled && debouncedSearch.trim().length > 0;

	const { empleados, loading } = useEmpleadoSearch(
		shouldSearch ? debouncedSearch : "",
	);

	// cerrar al click afuera
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSelect = (empleado: EmpleadoEducativoMinimoDTO) => {
		onSelect(empleado);
		setIsOpen(false);
		setHighlightIndex(-1);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!empleados.length) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setHighlightIndex((prev) =>
					prev < empleados.length - 1 ? prev + 1 : 0,
				);
				break;

			case "ArrowUp":
				e.preventDefault();
				setHighlightIndex((prev) =>
					prev > 0 ? prev - 1 : empleados.length - 1,
				);
				break;

			case "Enter":
				if (highlightIndex >= 0) {
					e.preventDefault();
					handleSelect(empleados[highlightIndex]);
				}
				break;

			case "Escape":
				setIsOpen(false);
				break;
		}
	};

	return (
		<div ref={containerRef} className={styles.autocomplete}>
			{label && (
				<label htmlFor={inputId} className={styles.label}>
					{label}
				</label>
			)}

			<input
				id={inputId}
				type="text"
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				onChange={(e) => {
					onChange(e.target.value);
					setIsOpen(true);
				}}
				onFocus={() => setIsOpen(true)}
				onKeyDown={handleKeyDown}
				aria-invalid={!!error}
				className={`${styles.input} ${error ? styles.inputError : ""}`}
			/>

			{shouldSearch && isOpen && loading && (
				<div className={styles.loading}>Buscando…</div>
			)}

			{shouldSearch && isOpen && empleados.length > 0 && (
				<ul className={styles.list}>
					{empleados.map((e, index) => (
						<li key={e.id} className={styles.item}>
							<button
								type="button"
								className={`${styles.button} ${index === highlightIndex ? styles.active : ""
									}`}
								onMouseDown={(ev) => {
									ev.preventDefault();
									handleSelect(e);
								}}
							>
								{e.apellido}, {e.nombre}
							</button>
						</li>
					))}
				</ul>
			)}

			{error && <span className={styles.error}>{error.message}</span>}
		</div>
	);
}
