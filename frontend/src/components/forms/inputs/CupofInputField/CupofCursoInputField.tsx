import type { UseFormRegister } from "react-hook-form";
import FormInputField from "@/components/forms/FormInputField";
import { DesignacionCursoFormValues } from "@/features/designaciones/types/designacion.types";


type Props = {
	register: UseFormRegister<DesignacionCursoFormValues>;
	error?: string;
};

export default function CupofCursoInputField({
	register,
	error,
}: Props) {
	return (
		<FormInputField<DesignacionCursoFormValues>
			label="CUPOF"
			name="cupof"
			type="number"
			register={register}
			error={error}
			inputProps={{ min: 1 }}
		/>
	);
}