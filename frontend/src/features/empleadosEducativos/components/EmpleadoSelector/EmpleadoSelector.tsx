import { useState } from "react";
import type { EmpleadoEducativoMinimoDTO } from "../../types/empleadosEducativos.types";
import EmpleadoAutocompleteBase from "./EmpleadoAutocompleteBase";
import EmpleadoSelectedCard from "./EmpleadoSelectedCard";
import styles from "./EmpleadoSelectorSection.module.scss";

type Props = {
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	onSelect: (empleado: EmpleadoEducativoMinimoDTO) => void;
};

export default function EmpleadoSelector({
	label = "Empleado",
	placeholder = "Buscar por apellido o nombre",
	disabled,
	onSelect,
}: Props) {
	const [search, setSearch] = useState("");
	const [empleadoSeleccionado, setEmpleadoSeleccionado] =
		useState<EmpleadoEducativoMinimoDTO | null>(null);

	return (
		<section className={styles["empleado-section"]}>
			<EmpleadoAutocompleteBase
				value={search}
				onChange={setSearch}
				onSelect={(e) => {
					setEmpleadoSeleccionado(e);
					setSearch(""); // limpia el input
					onSelect(e);
				}}
				label={label}
				placeholder={placeholder}
				disabled={disabled || !!empleadoSeleccionado}
			/>

			{empleadoSeleccionado && (
				<EmpleadoSelectedCard
					empleado={empleadoSeleccionado}
					onRemove={() => {
						setEmpleadoSeleccionado(null);
						setSearch("");
					}}
				/>
			)}
		</section>
	);
}
