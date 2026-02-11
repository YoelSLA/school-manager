import { useState } from "react";
import type {
	FieldValues,
	Path,
	PathValue,
	UseFormSetValue,
} from "react-hook-form";

import EmpleadoAutocompleteRHF from "@/features/empleadosEducativos/components/EmpleadoSelector/EmpleadoAutocompleteRHF";
import type { EmpleadoEducativoMinimoDTO } from "../../types/empleadosEducativos.types";
import EmpleadoSelectedCard from "./EmpleadoSelectedCard";
import styles from "./EmpleadoSelectorSection.module.scss";

type Props<TForm extends FieldValues, TName extends Path<TForm>> = {
	name: TName;
	label?: string;
	placeholder?: string;
	setValue: UseFormSetValue<TForm>;
	clearValue: PathValue<TForm, TName>;
	error?: { message?: string };
	disabled?: boolean;
};

export default function EmpleadoSelector<
	TForm extends FieldValues,
	TName extends Path<TForm>,
>({
	name,
	label = "Empleado",
	placeholder = "Buscar por apellido o nombre",
	setValue,
	clearValue,
	error,
	disabled,
}: Props<TForm, TName>) {
	const [empleadoSeleccionado, setEmpleadoSeleccionado] =
		useState<EmpleadoEducativoMinimoDTO | null>(null);

	return (
		<section className={styles["empleado-section"]}>
			<EmpleadoAutocompleteRHF<TForm>
				name={name}
				label={label}
				placeholder={placeholder}
				setValue={setValue}
				error={error}
				onSelect={setEmpleadoSeleccionado}
				disabled={disabled || !!empleadoSeleccionado}
			/>

			{empleadoSeleccionado && (
				<EmpleadoSelectedCard
					empleado={empleadoSeleccionado}
					onRemove={() => {
						setEmpleadoSeleccionado(null);
						setValue(name, clearValue, {
							shouldValidate: true,
						});
					}}
				/>
			)}
		</section>
	);
}
