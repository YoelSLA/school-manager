import FormInputField from "@/components/FormInputField";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
	register: UseFormRegister<T>;
	error?: string;
};

export default function CupofInputField<T extends FieldValues>({
	register,
	error,
}: Props<T>) {
	return (
		<FormInputField<T>
			label="CUPOF"
			name={"cupof" as Path<T>}
			type="number"
			register={register}
			error={error}
			inputProps={{ min: 1 }}
		/>
	);
}
