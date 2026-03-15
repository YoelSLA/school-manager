import FormSection from "@/components/FormSection";
import FormInputField from "@/components/forms/FormInputField";
import Modal from "@/components/Modal/Modal";
import { useMateriaForm } from "../../form/hooks/useCreateMateriaForm";
import { MateriaCreateDTO } from "@/utils/types";

type Props = {
	onClose: () => void;
	isSubmitting: boolean;
	onSubmit: (data: MateriaCreateDTO) => void;
};

export default function MateriaCreateModal({
	onClose,
	isSubmitting,
	onSubmit,
}: Props) {
	const { form } = useMateriaForm();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	return (
		<Modal
			title="Crear nueva materia"
			onCancel={onClose}
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
