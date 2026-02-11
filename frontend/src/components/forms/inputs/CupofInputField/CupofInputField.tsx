import FormInputField from "@/components/forms/FormInputField";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";


type Props<T extends FieldValues> = {
	register: UseFormRegister<T>;
	name: Path<T>;
	error?: string;
	label?: string;
};

export default function CupofInputField<T extends FieldValues>({
	register,
	name,
	error,
}: Props<T>) {
	return (
		<FormInputField<T>
			label="CUPOF"
			name={name}
			type="number"
			register={register}
			error={error}
			inputProps={{ min: 1 }}
		/>

	);
}
