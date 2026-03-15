import type { UseFormRegister } from "react-hook-form";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import { ORIENTACIONES } from "@/features/designaciones/utils/designacion.utils";
import { DesignacionCursoCreateDTO } from "@/utils/types";

type Props = {
	register: UseFormRegister<DesignacionCursoCreateDTO>;
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
