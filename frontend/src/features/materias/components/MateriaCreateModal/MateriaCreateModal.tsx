
import Modal from "@/components/Modal/Modal";
import type { CrearMateriaFormValues } from "../../form/materias.form.types";
import { useMateriaForm } from "../../form/hooks/useCreateMateriaForm";
import FormSection from "@/components/FormSection";
import FormInputField from "@/components/forms/FormInputField";

type Props = {
	onClose: () => void;
	isSubmitting: boolean;
	onSubmit: (data: CrearMateriaFormValues) => void;
};

export default function MateriaCreateModal({
	onClose,
	isSubmitting,
	onSubmit,
}: Props) {

	const { form } = useMateriaForm();

	const { register, handleSubmit, formState: { errors } } = form

	return (
		<Modal
			title="Crear nueva materia"
			onCancel={onClose}
			onConfirm={handleSubmit(onSubmit)}
			confirmLabel="Crear"
			isSubmitting={isSubmitting}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormSection layout="column">
					<FormInputField
						label="Nombre"
						name="nombre"
						register={register}
						error={errors.nombre?.message}
					/>

					<FormInputField
						label="Abreviatura"
						name="abreviatura"
						register={register}
						error={errors.abreviatura?.message}
					/>

					<FormInputField
						label="Módulos"
						name="cantidadModulos"
						type="number"
						register={register}
						error={errors.cantidadModulos?.message}
						inputProps={{ min: 1 }}
					/>


				</FormSection>
			</form>
		</Modal>
	);
}
