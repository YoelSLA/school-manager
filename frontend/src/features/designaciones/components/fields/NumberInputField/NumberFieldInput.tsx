import FormInputField from "@/components/FormInputField/FormInputField";
import { Hash } from "lucide-react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
	register: UseFormRegister<T>;
	name: Path<T>;
	label: string;
	error?: string;
	min?: number;
};

export default function NumberField<T extends FieldValues>({
	register,
	name,
	label,
	error,
	min,
}: Props<T>) {
	return (
		<FormInputField<T>
			label={
				<>
					<Hash size={14} />
					{label}
				</>
			}
			name={name}
			type="number"
			register={register}
			registerOptions={{
				valueAsNumber: true,
				...(min !== undefined ? { min } : {}),
			}}
			inputProps={{
				min,
			}}
			error={error}
		/>
	);
}
