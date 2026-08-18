import type { UseFormRegister } from "react-hook-form";
import { FormInput } from "@/shared/components/Form";
import type { DesignacionAdministrativaFormValues } from "../../types";

type Props = {
	register: UseFormRegister<DesignacionAdministrativaFormValues>;
	error?: string;
};

export default function FieldInputCupoAdministrativa({
	register,
	error,
}: Props) {
	return (
		<FormInput<DesignacionAdministrativaFormValues>
			label="CUPOF"
			name="cupof"
			type="number"
			register={register}
			error={error}
			inputProps={{ min: 1 }}
		/>
	);
}
