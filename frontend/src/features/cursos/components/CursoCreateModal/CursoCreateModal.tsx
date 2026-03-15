import Modal from "@/components/Modal/Modal";
import FormSection from "@/components/FormSection";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import { useCrearCursoForm } from "../../form/useCrearCursoForm";
import { TURNO_OPTIONS } from "../../utils/cursos.utils";
import FormInputField from "@/components/forms/FormInputField";
import { CursoCreateDTO } from "@/utils/types";

type Props = {
	onClose: () => void;
	isSubmitting: boolean;
	onSubmit: (data: CursoCreateDTO) => void;
};

export default function CursoCreateModal({
	onClose,
	isSubmitting,
	onSubmit,
}: Props) {

	const {
		form: {
			register,
			handleSubmit,
			formState: { errors },
		}
	} = useCrearCursoForm();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				title="Nuevo curso"
				onCancel={onClose}
				confirmLabel="Crear"
				isSubmitting={isSubmitting}
			>
				<FormSection title="Datos del curso" layout="column">
					<FormSelectField<CursoCreateDTO>
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

					<FormInputField<CursoCreateDTO>
						label="Año"
						name="anio"
						type="number"
						register={register}
						error={errors.anio?.message}
						inputProps={{ min: 1 }}
					/>

					<FormInputField<CursoCreateDTO>
						label="Grado"
						name="grado"
						type="number"
						register={register}
						error={errors.grado?.message}
						inputProps={{ min: 1 }}
					/>
				</FormSection>
			</Modal>
		</form>
	);
}