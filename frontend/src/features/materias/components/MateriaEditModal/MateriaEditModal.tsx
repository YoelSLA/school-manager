import FormSection from "@/components/FormSection";
import FormInputField from "@/components/forms/FormInputField";
import Modal from "@/components/Modal/Modal";
import { useEditMateriaForm } from "../../form/hooks/useEditMateriaForm";
import { MateriaUpdateDTO } from "@/utils/types";

type Props = {
	materia: MateriaUpdateDTO;
	onClose: () => void;
	isSubmitting: boolean;
	onSubmit: (data: MateriaUpdateDTO) => void;
};

export default function MateriaEditModal({
	materia,
	onClose,
	isSubmitting,
	onSubmit,
}: Props) {
	const { form } = useEditMateriaForm({ materia });

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				title="Editar materia"
				onCancel={onClose}
				confirmLabel="Guardar cambios"
				isSubmitting={isSubmitting}
			>
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
			</Modal>
		</form>
	);
}
