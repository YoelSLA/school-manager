import { useState } from "react";
import type { EmpleadoEducativoMinimoDTO } from "../../types/empleadosEducativos.types";
import EmpleadoAutocompleteBase from "./EmpleadoAutocompleteBase";
import EmpleadoSelectedCard from "./EmpleadoSelectedCard";
import styles from "./EmpleadoSelector.module.scss";

type Props = {
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	defaultEmpleado?: EmpleadoEducativoMinimoDTO | null;
	onChange?: (empleado: EmpleadoEducativoMinimoDTO | null) => void;
};

export default function EmpleadoSelector({
	label = "EMPLEADO",
	placeholder = "Buscar por apellido o nombre, cuil",
	disabled,
	defaultEmpleado = null,
	onChange,
}: Props) {
	const [search, setSearch] = useState("");
	const [empleadoSeleccionado, setEmpleadoSeleccionado] =
		useState<EmpleadoEducativoMinimoDTO | null>(defaultEmpleado);

	const handleSelect = (e: EmpleadoEducativoMinimoDTO) => {
		setEmpleadoSeleccionado(e);
		setSearch("");
		onChange?.(e);
	};

	const handleRemove = () => {
		setEmpleadoSeleccionado(null);
		setSearch("");
		onChange?.(null);
	};

	return (
		<section className={styles.empleadoSection}>
			<h3 className={styles.title}>{label}</h3>

			<EmpleadoAutocompleteBase
				value={search}
				onChange={setSearch}
				onSelect={handleSelect}
				placeholder={placeholder}
				disabled={disabled}
			/>

			<div className={styles.selectedContainer}>
				{empleadoSeleccionado && (
					<EmpleadoSelectedCard
						empleado={empleadoSeleccionado}
						onRemove={handleRemove}
					/>
				)}
			</div>
		</section>
	);
}
