import type { UseFormRegister } from "react-hook-form";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import type { DesignacionCursoFormValues } from "@/features/designaciones/form/designacion.form.types";
import { ORIENTACIONES } from "@/features/designaciones/utils/designacion.utils";

type Props = {
	register: UseFormRegister<DesignacionCursoFormValues>;
	error?: string;
};

export default function OrientacionSelectField({ register, error }: Props) {
	return (
		<FormSelectField
			label="Orientación"
			name="orientacion"
			register={register}
			error={error}
		>
			{ORIENTACIONES.map((o) => (
				<option key={o.value} value={o.value}>
					{o.label}
				</option>
			))}
		</FormSelectField>
	);
}
