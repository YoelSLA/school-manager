import FormSection from "@/components/FormSection";
import FormInputField from "@/components/forms/FormInputField/FormInputField";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import type { CrearCursoFormValues } from "../../form/crearCurso.schema";
import { useCrearCursoForm } from "../../form/useCrearCursoForm";
import { TURNO_OPTIONS } from "../../utils/cursos.utils";

type Props = {
	onSubmit: (data: CrearCursoFormValues) => void;
	onSubmitRef: (submit: () => void) => void;
};

export default function CrearCursoForm({ onSubmit, onSubmitRef }: Props) {
	const { form } = useCrearCursoForm();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	onSubmitRef(handleSubmit(onSubmit));

	return (
		<form>
			<FormSection title="Datos del curso" layout="column">
				<FormSelectField<CrearCursoFormValues>
					label="Turno"
					name="turno"
					register={register}
					error={errors.turno?.message}
				>
					{TURNO_OPTIONS.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</FormSelectField>

				<FormInputField
					label="Año"
					name="anio"
					type="number"
					register={register}
					error={errors.anio?.message}
					inputProps={{ min: 1 }}
				/>

				<FormInputField
					label="Grado"
					name="grado"
					type="number"
					register={register}
					error={errors.grado?.message}
					inputProps={{ min: 1 }}
				/>
			</FormSection>
		</form>
	);
}
