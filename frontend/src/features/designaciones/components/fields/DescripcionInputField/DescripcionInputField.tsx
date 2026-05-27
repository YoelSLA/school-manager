import FormInputField from "@/components/FormInputField/FormInputField";
import { AlignLeft } from "lucide-react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
	register: UseFormRegister<T>;
	name: Path<T>;
	error?: string;
};

export default function DescripcionField<T extends FieldValues>({
	register,
	name,
	error,
}: Props<T>) {
	return (
		<FormInputField<T>
			label={
				<>
					<AlignLeft size={14} />
					Descripción
				</>
			}
			name={name}
			register={register}
			error={error}
		/>
	);
}
