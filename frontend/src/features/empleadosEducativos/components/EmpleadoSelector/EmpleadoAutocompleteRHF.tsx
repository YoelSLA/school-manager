import { type ReactNode, useState } from "react";
import type {
	FieldValues,
	Path,
	PathValue,
	UseFormSetValue,
} from "react-hook-form";
import type { EmpleadoEducativoMinimoDTO } from "../../types/empleadosEducativos.types";
import EmpleadoAutocompleteBase from "./EmpleadoAutocompleteBase";

type UIError = {
	message?: string;
};

type Props<T extends FieldValues> = {
	name: Path<T>;
	label: ReactNode;
	placeholder?: string;
	setValue: UseFormSetValue<T>;
	error?: UIError;
	onSelect?: (empleado: EmpleadoEducativoMinimoDTO) => void;
	disabled?: boolean;
};

export default function EmpleadoAutocompleteRHF<T extends FieldValues>({
	name,
	setValue,
	error,
	label,
	placeholder,
	onSelect,
	disabled,
}: Props<T>) {
	const [search, setSearch] = useState("");

	const handleSelect = (e: EmpleadoEducativoMinimoDTO) => {
		setValue(name, e.id as PathValue<T, Path<T>>, {
			shouldValidate: true,
		});
		setSearch("");
		onSelect?.(e);
	};

	return (
		<EmpleadoAutocompleteBase
			value={search}
			onChange={setSearch}
			onSelect={handleSelect}
			label={label}
			placeholder={placeholder}
			error={error}
			disabled={disabled}
		/>
	);
}
